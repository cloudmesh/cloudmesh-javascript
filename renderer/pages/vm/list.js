import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import ViewComfyIcon from '@material-ui/icons/ViewComfy'
import ViewModuleIcon from '@material-ui/icons/ViewModule'
import TableChartIcon from '@material-ui/icons/TableChart'
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
  const [mode, setMode] = useState('table') // mode = table / card / minicard
  const [vmListResp, setVmListResp] = useState(null)

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
      <ButtonGroup size="small" aria-label="Select table or card view for VMs">
        <Button onClick={() => setMode('table')} title='Table view'>
          <TableChartIcon />
        </Button>
        <Button onClick={() => setMode('card')} title='Card view'>
          <ViewModuleIcon />
        </Button>
        <Button onClick={() => setMode('card')} title='Mini card view'>
          <ViewComfyIcon />
        </Button>
      </ButtonGroup>
      {mode === 'table' && <TableView {...viewProps} />}
      {mode === 'card' && <CardView {...viewProps} />}
      {mode === 'minicard' && <MiniCardView {...viewProps} />}
    </main>
  )
}

export default VmList
