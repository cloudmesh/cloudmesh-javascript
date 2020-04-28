import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
import * as Store from 'electron-store'
import path from 'path'
import fs from 'fs'
import { runCmsSync, runCms } from './cloudmesh/CmsWrapper'

import { createWindow } from './helpers'

import {
  CMS_BIN_STORE_KEY,
  CMS_COMMAND_SEND,
  CMS_COMMAND_SEND_SYNC,
  SET_CMS_PATH,
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
let CMS_BIN = null

if (VIRTUAL_ENV) {
  CMS_BIN = path.join(VIRTUAL_ENV, 'bin', 'cms')
}

const cmsBin = store.get(CMS_BIN_STORE_KEY, CMS_BIN)

;(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
  })

  const landingPage = cmsBin ? './' : './settings/cms'

  if (isProd) {
    await mainWindow.loadURL(`app://${landingPage}`)
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/${landingPage}`)
    mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  store.set(CMS_BIN_STORE_KEY, cmsBin)
  app.quit()
})

// Main
ipcMain.handle(SET_CMS_PATH, (event, cmsPath) => {
  if (!fs.existsSync(cmsPath)) throw new Error(`${cmsPath} is invalid`)
  store.set(CMS_BIN_STORE_KEY, cmsPath)
  // Restart app after changing python environment.
  app.relaunch()
  app.exit(0)
})

/**
 * Synchronously send commands to the CMS command line.
 * In other words, send a command and wait for stdout/stderr.
 *
 * Returns an object with 'stdout' and 'stderr' keys.
 * {
 *   stdout: <Parsed JSON object>,
 *   stderr: <Error string if any>
 * }
 */
ipcMain.handle(CMS_COMMAND_SEND_SYNC, (event, args = []) => {
  return runCmsSync({ cmsBin, args })
})

/**
 * Asynchronously send commands to the CMS command line.
 * In other words, fire and forget.
 *
 * Returns a promise that resolves when the command has closed.
 */
ipcMain.handle(CMS_COMMAND_SEND, (event, args = []) => {
  return runCms({ cmsBin, args })
})
