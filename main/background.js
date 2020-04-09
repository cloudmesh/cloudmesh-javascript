import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import * as Store from 'electron-store'
import CmsBridge from './cloudmesh/CmsBridge'
import path from 'path'
import fs from 'fs'

import {
  SET_PYTHON_PATH,
  PYTHON_PATH_STORE_KEY,
  CMS_VM_LIST_SEND,
} from './constants'

app.allowRendererProcessReuse = true
const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

const store = new Store()

let VIRTUAL_ENV = process?.env?.VIRTUAL_ENV ?? null
if (VIRTUAL_ENV) {
  VIRTUAL_ENV = path.join(VIRTUAL_ENV, 'bin', 'python3')
}

const streamToPromise = (stream) => {
  return new Promise((resolve, reject) => {
    // resolve with location of saved file
    stream.on('message', (message) => resolve(message))
    stream.on('error', reject)
  })
}

const pythonPath = store.get(PYTHON_PATH_STORE_KEY, VIRTUAL_ENV)

const cmsBridgePath = path.join(app.getAppPath(), 'python', 'main.py')
let cmsBridge
if (pythonPath) {
  cmsBridge = new CmsBridge({
    scriptPath: cmsBridgePath,
    options: {
      pythonPath,
    },
  })
}

;(async () => {
  await app.whenReady()

  const landingPage = pythonPath ? '' : 'python'

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
  })

  if (isProd) {
    await mainWindow.loadURL(`app://${landingPage}`)
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/${landingPage}`)
    mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})

// Main
ipcMain.handle(SET_PYTHON_PATH, async (event, pythonPath) => {
  if (!fs.existsSync(pythonPath)) throw new Error(`${pythonPath} is invalid`)
  store.set(PYTHON_PATH_STORE_KEY, pythonPath)

  // Restart app after changing python environment.
  app.relaunch()
  app.exit(0)
})

ipcMain.handle(CMS_VM_LIST_SEND, async (event, args = []) => {
  return await cmsBridge
    .send({
      command: 'vm',
      operation: 'list',
      args: ['--output=json', ...args],
    })
    .catch((error) => console.error(error))
})
