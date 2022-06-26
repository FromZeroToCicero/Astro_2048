const { app, BrowserWindow, Menu } = require("electron");

const { createMenuTemplate } = require("./Menu");

// Set env
process.env.NODE_ENV = "development";

const isDev = process.env.NODE_ENV !== "production" ? true : false;
const isMac = process.platform === "darwin" ? true : false;

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: "Astro 2048",
    width: isDev ? 800 : 500,
    height: 600,
    icon: `${__dirname}/assets/icons/icon.png`,
    resizable: isDev ? true : false,
    backgroundColor: "#fff",
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadURL(`file://${__dirname}/app/index.html`);
}

function createAboutWindow() {
  aboutWindow = new BrowserWindow({
    title: "About Astro 2048",
    width: 500,
    height: 500,
    icon: `${__dirname}/assets/icons/icon.png`,
    resizable: isDev,
    backgroundColor: "#fff",
  });

  aboutWindow.loadURL(`file://${__dirname}/app/about.html`);
  aboutWindow.setMenuBarVisibility(false);
}

app.on("ready", () => {
  createMainWindow();

  const mainMenu = Menu.buildFromTemplate(
    createMenuTemplate(isMac, isDev, app, createAboutWindow, mainWindow)
  );
  Menu.setApplicationMenu(mainMenu);

  mainWindow.on("closed", () => (mainWindow = null));
});

app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
