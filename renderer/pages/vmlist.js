import React, { useEffect, useState } from 'react'
import VmCardView from '../components/VmCardView'
import VmTableView from '../components/VmTableView'
import { ipcRenderer } from 'electron'
import { CMS_VM_LIST_SEND } from '../../main/constants'

const VmList = () => {
  const [mode, setMode] = useState('card')
  const [vmListResp, setVmListResp] = useState(null)

  const handleOnModeClick = (e) => setMode(e.target.value)

  const refreshVmList = async () => {
    if (ipcRenderer) {
      setVmListResp(await ipcRenderer.invoke(CMS_VM_LIST_SEND, ['--refresh']))
    }
  }

  useEffect(() => {
    const initialFetch = async () => {
      if (ipcRenderer) {
        setVmListResp(await ipcRenderer.invoke(CMS_VM_LIST_SEND))
      }
    }
    initialFetch()
  }, [])

  const viewProps = {
    vmData: vmListResp,
    onRefresh: refreshVmList,
  }

  return (
    <main>
      <form>
        <label>
          <input
            onClick={handleOnModeClick}
            type="radio"
            name="mode"
            value="card"
            defaultChecked="checked"
          />
          Card
        </label>
        <label>
          <input
            onClick={handleOnModeClick}
            type="radio"
            name="mode"
            value="table"
          />
          Table
        </label>
      </form>
      {mode === 'card' && <VmCardView {...viewProps} />}
      {mode === 'table' && <VmTableView {...viewProps} />}
    </main>
  )
}

export default VmList
