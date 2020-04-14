import React, { useEffect, useState } from 'react'
import CardView from '../../components/vm/CardView'
import TableView from '../../components/vm/TableView'
import { ipcRenderer } from 'electron'
import { CMS_COMMAND_SEND } from '../../../main/constants'
// import { makeCancelable } from '../../main/utils'

const vmListCmd = ['vm', 'list', '--output=json']
// TODO - Need to handle situations where the vm list command has fired
//        and the user clicks away, unmounting the component.
//        This results in setVmListResp getting called on an unmounted component
const VmList = () => {
  const [mode, setMode] = useState('card')
  const [vmListResp, setVmListResp] = useState(null)

  const handleOnModeClick = (e) => setMode(e.target.value)

  const refreshVmList = async () => {
    if (ipcRenderer) {
      setVmListResp(
        await ipcRenderer.invoke(CMS_COMMAND_SEND, [...vmListCmd, '--refresh'])
      )
    }
  }

  useEffect(() => {
    const initialFetch = async () => {
      if (ipcRenderer) {
        setVmListResp(await ipcRenderer.invoke(CMS_COMMAND_SEND, vmListCmd))
      }
    }
    initialFetch()
    // Called on unmount
    return () => {
      // Cancel all calls to setVmListResp here.
    }
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
      {mode === 'card' && <CardView {...viewProps} />}
      {mode === 'table' && <TableView {...viewProps} />}
    </main>
  )
}

export default VmList
