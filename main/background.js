import { app, globalShortcut } from "electron";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import serve from "electron-serve";
import createWindow from "./helpers/create-window";

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", app.getPath("userData") + " (development)");
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 1024,
    minWidth: 1024,
    height: 600,
    minHeight: 600,
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    installExtension(REACT_DEVELOPER_TOOLS);

    const port = process.argv[2];
    await mainWindow.loadURL("http://localhost:" + port + "/home");

    globalShortcut.register("CommandOrControl+R", () => {
      mainWindow.reload();
    });
    globalShortcut.register("CommandOrControl+Shift+I", () => {
      mainWindow.webContents.openDevTools();
    });

    mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});
