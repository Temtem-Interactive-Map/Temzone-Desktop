import { BrowserWindow, screen } from "electron";
import Store from "electron-store";

export function createWindow(options) {
  const store = new Store();
  const defaultSize = {
    width: options.width,
    height: options.height,
  };

  function restore() {
    store.get("window-state", defaultSize);
  }

  function getCurrentPosition() {
    const position = win.getPosition();
    const size = win.getSize();

    return {
      x: position[0],
      y: position[1],
      width: size[0],
      height: size[1],
    };
  }

  function windowWithinBounds(windowState, bounds) {
    return (
      windowState.x >= bounds.x &&
      windowState.y >= bounds.y &&
      windowState.x + windowState.width <= bounds.x + bounds.width &&
      windowState.y + windowState.height <= bounds.y + bounds.height
    );
  }

  function resetToDefaults() {
    const bounds = screen.getPrimaryDisplay().bounds;

    return Object.assign({}, defaultSize, {
      x: (bounds.width - defaultSize.width) / 2,
      y: (bounds.height - defaultSize.height) / 2,
    });
  }

  function ensureVisibleOnSomeDisplay(windowState) {
    const visible = screen.getAllDisplays().some((display) => {
      return windowWithinBounds(windowState, display.bounds);
    });

    if (!visible) {
      return resetToDefaults();
    }

    return windowState;
  }

  function saveState() {
    if (!win.isMinimized() && !win.isMaximized()) {
      Object.assign(state, getCurrentPosition());
    }

    store.set("window-state", state);
  }

  const state = ensureVisibleOnSomeDisplay(restore());
  const win = new BrowserWindow({
    ...options,
    ...state,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      ...options.webPreferences,
    },
  });

  win.removeMenu();
  win.on("close", saveState);
  win.once("ready-to-show", () => {
    win.show();
  });

  return win;
}
