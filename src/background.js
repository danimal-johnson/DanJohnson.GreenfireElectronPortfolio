'use strict'

import { app, protocol, BrowserWindow, Menu, ipcMain, /* shell */ } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer';
// const os = require('os');
// const fs = require('fs');
// const path = require('path');

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
    label: 'File',
    submenu: [
      {
        label: 'Save to PDF',
        accelerator: 'CmdOrCtrl+S',
        click: () => { console.log('save to pdf'); }, // TODO: save to pdf
      },
      {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click: () => app.quit(),
      },
    ],
  },
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
  // const pdfPath = `${os.homedir()}/electron-portfolio/port.pdf`;
  // const pdfPath = path.join(os.homedir(), 'electron-portfolio', 'port.pdf');
  // console.log('PDF Path is: ' + pdfPath);

  console.log('In the print to pdf function.');

  // const printToPDF = require('electron-print-to-pdf');
  // const win = BrowserWindow.fromWebContents(event.sender);

  // win.webContents.printToPDF({}, (err, data) => {
  //   if (err) {
  //     console.error(err.message);
  //     return;
  //   }
  //   console.log('Printing...');
  //   fs.writeFile(pdfPath, data, (err) => {
  //     if (err) {
  //       console.error(err.message);
  //       return;
  //     }
  //     shell.openExternal('file://' + pdfPath);
  //     event.sender.send('wrote-pdf', pdfPath);
  //     console.log('Printed successfully to ' + pdfPath);
  //   });
  // });

  // e.sender.printToPDF({
  //   marginsType: 0,
  //   printBackground: true,
  //   printSelectionOnly: false,
  //   pageSize: 'A4',
  //   pageOrientation: 'portrait',
  //   printBackground: true,
  //   landscape: false,
  //   scaleFactor: 1,
  //   headerTemplate: '',
  //   footerTemplate: '',
  //   printBackground: true,
  //   printSelectionOnly: false,
  // }

  
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
