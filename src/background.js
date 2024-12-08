'use strict'

import { app, protocol, BrowserWindow, Menu, clipboard, screen } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
// import { paste } from '@xitanggg/node-insert-text'
const robotJS = require("@hurdlegroup/robotjs");
import './backend'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

const isTest = !process.env.IS_TEST

const template = [
  {
    label: 'Menu',
    submenu: [
      {
        label: 'Sobre a Aplicação...',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://github.com/josueuni28/cursoweb/tree/main/webmoderno2022/Projetos/most-used-words')
        }
      },
      (isTest ? { type: 'separator' } : { type: 'separator' }),
      (isTest ? { label: '(DEV) Inspecionar', role: 'toggleDevTools' } : { type: 'separator' }),
      (isTest ? { type: 'separator' } : { type: 'separator' }),
      {
        label: 'Sair',
        accelerator: process.platform === 'darwin' ? 'Cmd+X' : 'Shift+X',
        click: function() {
            app.quit()
        }
      }
    ]
  }
]
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 500,
    height: 90,
    titleBarStyle: 'hidden',
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    // if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
  const {title, version} = require('../package.json')
  const display = screen.getPrimaryDisplay().workAreaSize
  win.setPosition(display.width-500, display.height-90)
  win.setTitle(`${title} v${version}`)


  win.setAlwaysOnTop(true)

/*   win.on('blur', () => {
    let text = clipboard.readText()

    if(text){

      robotJS.setKeyboardDelay(20)
      console.log(text)
      robotJS.keyTap('v')
      robotJS.keyTap('backspace')
      robotJS.setKeyboardDelay(20)
    }
  }) */

  win.on('focus', () => {
    let text = clipboard.readText()

    if(text){
      clipboard.clear()
    }
  })
}

app.on('browser-window-blur', () => {
  let text = clipboard.readText()

  if(text){
    robotJS.setKeyboardDelay(100)
    // console.log(text)
    // robotJS.keyTap('a')
    robotJS.keyTap('control')
    robotJS.setKeyboardDelay(10)
    robotJS.keyTap('v','control')
  }
})
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
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
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
