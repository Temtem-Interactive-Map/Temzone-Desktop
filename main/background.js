import dotenv from "dotenv";
import { app, globalShortcut } from "electron";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import serve from "electron-serve";
import createWindow from "./helpers/create-window";

dotenv.config();

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", app.getPath("userData") + " (development)");
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow({
    width: 1280,
    height: 720,
    minWidth: 940,
    minHeight: 500,
  });

  if (isProd) {
    await mainWindow.loadURL("app://./login.html");
  } else {
    installExtension(REACT_DEVELOPER_TOOLS);

    const port = process.argv[2];
    await mainWindow.loadURL("http://localhost:" + port + "/login");

    // Keyboard shortcuts for development
    globalShortcut.register("CommandOrControl+R", () => {
      mainWindow.reload();
    });
    globalShortcut.register("CommandOrControl+Shift+I", () => {
      mainWindow.webContents.openDevTools();
    });
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});
