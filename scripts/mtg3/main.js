const { app, BrowserWindow, ipcMain } = require("electron");
const express = require("express");
const path = require("path");
const http = require("http");

// Set up the Express API server
const apiServer = express();
apiServer.use(express.json());
apiServer.get("/api/getData", (req, res) => {
  res.json({ message: "Hello from the API!" });
});

// Start the Express server
const server = http.createServer(apiServer);
server.listen(3001, () => {
  console.log("API server is running on http://localhost:3001");
});

// Electron setup
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // Optionally use a preload script
    },
  });

  // Load the frontend UI (could be a local file or a web app)
  mainWindow.loadURL("http://localhost:3000"); // Assuming your frontend runs on port 3000

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  // On macOS, recreate window when the app is activated
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit the app when all windows are closed
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
