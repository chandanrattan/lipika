const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  const appURL = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../build/index.html")}`;

  win.loadURL(appURL);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
