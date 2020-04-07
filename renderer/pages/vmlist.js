import React, { useEffect, useState } from 'react'
import { ipcRenderer } from 'electron'
import { CMS_VM_LIST_SEND } from '../../main/constants'

const VmList = () => {
  const [output, setOutput] = useState(null)

  const handleOnClick = async () => {
    if (ipcRenderer) {
      setOutput(await ipcRenderer.invoke(CMS_VM_LIST_SEND))
    }
  }

  return (
    <main>
      <button onClick={handleOnClick}>List VMs</button>
      <div>
        <h1>Output</h1>
        <pre>{output && JSON.stringify(output)}</pre>
      </div>
    </main>
  )
}

export default VmList
