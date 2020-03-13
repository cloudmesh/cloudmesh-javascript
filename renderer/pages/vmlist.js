import React, { useEffect, useState } from 'react'
import { ipcRenderer } from 'electron'
import { CMS_VM_LIST_RECEIVE, CMS_VM_LIST_SEND } from '../../main/constants'

const VmList = () => {
  const [output, setOutput] = useState(null)

  useEffect(() => {
    if (ipcRenderer) {
      ipcRenderer.on(CMS_VM_LIST_RECEIVE, (event, data) => {
        console.log('Got vm list data')
        setOutput(data)
      })
    }
    return () => {
      if (ipcRenderer) {
        // unregister it
        ipcRenderer.removeAllListeners(CMS_VM_LIST_RECEIVE)
      }
    }
  }, [])

  return (
    <main>
      <button onClick={() => ipcRenderer.send(CMS_VM_LIST_SEND)}>
        List VMs
      </button>
      <div>
        <h1>Output</h1>
        <div>{output}</div>
      </div>
    </main>
  )
}

export default VmList
