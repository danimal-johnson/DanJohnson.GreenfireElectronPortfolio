'use strict'

import { app, protocol, BrowserWindow, Menu, ipcMain } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer';
const os = require('os');
const fs = require('fs');
const path = require('path');

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: isDev ? 1100 : 800,
    height: 600,
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

// function createAboutWindow() { // TODO: Create about window
//   console.log('create about window');
// }

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// ----------------- Menu ------------------------
const menu = [
  // Set our own app 'About' menu for Mac
  //...(isMac ? [{ role: 'appMenu'}] : []),
  ...(isMac ? [{
    label: app.name,
    submenu: [
    {
      label: 'About',
      click: () => console.log('about menu clicked'), // TODO
    }
  ]}] : []),
    {
      role: 'fileMenu',
    },
  // {
  //   label: 'File',
  //   submenu: [
  //     {
  //       label: 'Save to PDF',
  //       accelerator: 'CmdOrCtrl+S',
  //       click: () => { console.log('save to pdf'); }, // TODO: save to pdf
  //     },
  //     {
  //       label: 'Quit',
  //       accelerator: 'CmdOrCtrl+Q',
  //       click: () => app.quit(),
  //     },
  ...(!isMac ? [{
    label: 'Help',
    submenu: [{
      label: 'About',
      click: () => console.log('about menu clicked'), // TODO
    }],
  }] : []), // Help/About menu only on non-Mac
  ...(isDev ? [
    {
      label: 'Developer',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { type: 'separator' },
        { role: 'toggledevtools' },
      ],
    }] : [] // Hide menu if not in dev mode
  ),
];

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDev && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);
})

// --------------- IPC Events ------------------------

ipcMain.on('print-to-pdf', event => {
  const now = new Date();
  let month = now.getMonth() + 1;
  let day = now.getDate();
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;
  const filename = `${now.getFullYear()}-${month}-${day}.pdf`;

  const pdfDir = path.join(os.homedir(), 'electron-portfolio');
  const pdfPath = path.join(os.homedir(), 'electron-portfolio', filename);
  
  const pdfOptions = {
    marginsType: 0,
    printBackground: true,
    printSelectionOnly: false,
    pageSize: 'Letter',
    pageOrientation: 'portrait',
    landscape: false,
    scaleFactor: 100,
    headerFooter: {
      title: 'Electron Portfolio for Dan Johnson',
      url: 'A Greenfire Audition',
    },
  };

  const win = BrowserWindow.fromWebContents(event.sender);

  win.webContents.printToPDF(pdfOptions)
    .then(data => {
      fs.mkdirSync(pdfDir, { recursive: true });
      fs.writeFile(pdfPath, data, err => {
        if (err) {
          console.error('writeFile Error:', err);
        } else {
          // shell.showItemInFolder(pdfPath); // No effect
          // shell.openPath(os.homedir()); // No effect
          // shell.openItem(pdfPath); // Runtime error
          console.log('PDF saved to: ' + pdfPath);
        }
      })
    })
    .catch(err => {
      console.error('Error in printToPDF:', err);
    });
  
  // To give feedback to the user, since opening the path doesn't work:
  // event.sender.send('wrote-pdf', pdfPath);
});

// Exit cleanly on request from parent process in development mode.
if (isDev) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
