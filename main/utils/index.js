import { BrowserWindow, screen } from "electron";
import Store from "electron-store";

export function createWindow(options) {
  const store = new Store();
  const defaultSize = {
    width: options.width,
    height: options.height,
  };

  function getCurrentPosition() {
    const position = window.getPosition();
    const size = window.getSize();

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

  function ensureVisibleOnSomeDisplay() {
    const windowState = store.get("window-state", defaultSize);
    const visible = screen
      .getAllDisplays()
      .some((display) => windowWithinBounds(windowState, display.bounds));

    if (!visible) {
      return resetToDefaults();
    }

    return windowState;
  }

  function saveState() {
    if (!window.isMinimized() && !window.isMaximized()) {
      Object.assign(state, getCurrentPosition());
    }

    store.set("window-state", state);
    store.set("window-maximized", window.isMaximized());
  }

  const state = ensureVisibleOnSomeDisplay();
  const isMaximized = store.get("window-maximized", false);
  const window = new BrowserWindow({
    ...options,
    ...state,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      ...options.webPreferences,
    },
  });

  if (isMaximized) {
    window.maximize();
  }

  window.removeMenu();
  window.on("close", saveState);
  window.once("ready-to-show", () => {
    window.show();
  });

  return window;
}
