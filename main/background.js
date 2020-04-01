import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import * as Store from 'electron-store'
import { getCmsBridge } from './cloudmesh/cmsBridge'
import path from 'path'

import {
  SET_PYTHON_PATH,
  GET_PYTHON_PATH,
  PYTHON_PATH_STORE_KEY,
  CMS_VM_LIST_SEND,
  CMS_VM_LIST_RECEIVE,
} from './constants'

app.allowRendererProcessReuse = true
const isProd = process.env.NODE_ENV === 'production'

//let cmsBridgePath = path.join(app.getAppPath(), 'python', 'main.py')

if (isProd) {
  serve({ directory: 'app' })
  //cmsBridgePath = path.join(app.getAppPath(), '..', 'python', 'main.py')
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

// TODO use VIRTUAL_ENV=/Users/jogoodma/ENV3
const store = new Store()

let VIRTUAL_ENV = process?.env?.VIRTUAL_ENV ?? null
if (VIRTUAL_ENV) {
  VIRTUAL_ENV = path.join(VIRTUAL_ENV, 'bin', 'python3')
}

const pythonPath = store.get(PYTHON_PATH_STORE_KEY, VIRTUAL_ENV)

// let cmsBridge
//
// if (pythonPath) {
//   cmsBridge = getCmsBridge({
//     scriptPath: cmsBridgePath,
//     options: {
//       pythonPath,
//     },
//   })
// }

;(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
  })

  if (isProd) {
    await mainWindow.loadURL('app://')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/`)
    mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})

// ipcMain.on(GET_PYTHON_PATH, (event, arg) => {
//   const path = store.get(PYTHON_PATH_STORE_KEY)
//   if (path) {
//     event.returnValue = path
//   }
//   event.returnValue = null
// })
//
// ipcMain.on(SET_PYTHON_PATH, (event, arg) => {
//   store.set(PYTHON_PATH_STORE_KEY, arg)
//   cmsBridge = getCmsBridge({
//     scriptPath: cmsBridgePath,
//     options: {
//       pythonPath: arg,
//     },
//   })
// })
//
// ipcMain.on(CMS_VM_LIST_SEND, (event, arg) => {
//   cmsBridge.on('message', message =>
//     event.sender.send(CMS_VM_LIST_RECEIVE, message)
//   )
//   cmsBridge.send({ command: 'vm', operation: 'list', args: ['--output=json'] })
// })
