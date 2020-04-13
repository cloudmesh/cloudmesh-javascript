import React from 'react'
import PythonPath from '../components/PythonPath'

import { ipcRenderer } from 'electron'
import { SET_PYTHON_PATH } from '../../main/constants'

const handleOnChange = async (path) => {
  await ipcRenderer.invoke(SET_PYTHON_PATH, path)
}

const Python = () => {
  return (
    <main>
      <h1>Python Environment</h1>
      <div>
        <PythonPath onChange={handleOnChange} />
      </div>
    </main>
  )
}

export default Python
