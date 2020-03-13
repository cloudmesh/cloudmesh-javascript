import { useState, useEffect } from 'react'
import { ipcRenderer } from 'electron'
import { GET_PYTHON_PATH, SET_PYTHON_PATH } from '../../main/constants'

const usePythonPath = initialValue => {
  const [pythonPath, setLocalPythonPath] = useState(initialValue)

  const setPythonPath = path => {
    if (ipcRenderer) {
      ipcRenderer.send(SET_PYTHON_PATH, path)
      setLocalPythonPath(path)
    }
  }

  useEffect(() => {
    if (ipcRenderer) {
      const path = ipcRenderer.sendSync(GET_PYTHON_PATH)
      if (path) {
        setPythonPath(path)
      }
    }
    return () => {}
  }, [])

  return [pythonPath, setPythonPath]
}

export default usePythonPath
