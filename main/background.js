import { app, globalShortcut } from "electron";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import serve from "electron-serve";
import { createWindow } from "./utils";

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", app.getPath("userData") + " (development)");
}

const gotTheLock = app.requestSingleInstanceLock();

// Quit if another instance of the app is already running
if (!gotTheLock) {
  app.quit();
} else {
  let mainWindow = null;

  app.on("ready", async () => {
    mainWindow = createWindow({
      width: 1280,
      height: 720,
      minWidth: 940,
      minHeight: 500,
    });

    if (isProd) {
      await mainWindow.loadURL("app://./login.html");
    } else {
      await installExtension(REACT_DEVELOPER_TOOLS);

      const port = process.argv[2];
      await mainWindow.loadURL("http://localhost:" + port + "/login");

      // Define keyboard shortcuts for development
      globalShortcut.register("CommandOrControl+Shift+I", () =>
        mainWindow.webContents.openDevTools()
      );
    }
  });

  app.on("second-instance", () => {
    // If a window is already open, restore and focus it
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }

      mainWindow.focus();
    }
  });

  app.on("window-all-closed", () => {
    app.quit();
  });
}
