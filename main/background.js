import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import * as Store from 'electron-store'
import { getCmsBridge } from './cloudmesh/cmsBridge'
import path from 'path'

const pythonPath = '/Users/jogoodma/ENV3/bin/python'

app.allowRendererProcessReuse = true
const isProd = process.env.NODE_ENV === 'production'

let cmsBridgePath = path.join(app.getAppPath(), 'python', 'main.py')

if (isProd) {
  serve({ directory: 'app' })
  cmsBridgePath = path.join(app.getAppPath(), '..', 'python', 'main.py')
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

const pyOpts = {
  pythonPath,
}
const cmsBridge = getCmsBridge({
  scriptPath: cmsBridgePath,
  options: pyOpts,
  onMessage: m => console.log(m['cms']),
})

;(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
  })

  if (isProd) {
    await mainWindow.loadURL('app://./')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/`)
    mainWindow.webContents.openDevTools()
    cmsBridge.send({
      command: 'vm',
      operation: 'list',
      args: ['--output=json'],
    })
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})
