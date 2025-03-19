import { app, BrowserWindow } from "electron";
import serve from "electron-serve";
import path from "path";
import { fileURLToPath } from "url";
const isProd = app.isPackaged;

// throw new Error(
//   `values: isProd: ${isProd}, isPackaged: ${app.isPackaged}`
// );

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log({
  isProd,
  env: process.env.NODE_ENV,
  isPackaged: app.isPackaged,
  __dirname,
});

// const appServe = isProd
//   ? serve({
//       directory: path.join(__dirname, "out"),
//     })
//   : null;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, "magic-cards.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isProd) {
    console.log("running prod version!");
    // appServe(win).then(() => {
    win.loadFile(path.join(__dirname, "out", "index.html"));
    win.webContents.openDevTools();
    win.webContents.on(
      "did-fail-load",
      (event, errorCode, errorDescription) => {
        console.error("Failed to load page:", errorCode, errorDescription);
      }
    );
    // });
  } else {
    console.log("running dev version");
    win.loadURL("http://localhost:3000");
    win.webContents.openDevTools();
    win.webContents.on("did-fail-load", (e, code, desc) => {
      win.webContents.reloadIgnoringCache();
    });
  }
};

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
