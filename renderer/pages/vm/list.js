import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import ViewComfyIcon from '@material-ui/icons/ViewComfy'
import ViewModuleIcon from '@material-ui/icons/ViewModule'
import TableChartIcon from '@material-ui/icons/TableChart'
import { useCms } from '../../hooks/cms'
import CardView from '../../components/vm/CardView'
import MiniCardView from '../../components/vm/MiniCardView'
import TableView from '../../components/vm/TableView'
import { CMS_VM_LIST_CMD } from '../../../main/constants'
import CircularProgress from '@material-ui/core/CircularProgress'
import PageHeader from '../../components/PageHeader'
import RefreshIcon from '@material-ui/icons/Refresh'
import { ipcRenderer } from 'electron'
import { CMS_COMMAND_SEND } from '../../../main/constants'
import styles from './list.module.css'
// import { makeCancelable } from '../../main/utils'

const VmList = () => {
  const [mode, setMode] = useState('table') // mode = table / card / minicard
  const [{ output: vms, error, isRunning }, refreshVmList] = useCms({
    command: CMS_VM_LIST_CMD,
  })

  if (isRunning) {
    return (
      <main>
        <CircularProgress size="5rem" />
      </main>
    )
  }

  return (
    <main>
      <PageHeader name="VM List">
        <div>
          <ButtonGroup
            size="small"
            aria-label="Select table or card view for VMs">
            <Button onClick={refreshVmList} title="Refresh">
              <RefreshIcon />
            </Button>
            <Button onClick={() => setMode('table')} title="Table view">
              <TableChartIcon />
            </Button>
            <Button onClick={() => setMode('card')} title="Card view">
              <ViewModuleIcon />
            </Button>
            <Button onClick={() => setMode('minicard')} title="Mini card view">
              <ViewComfyIcon />
            </Button>
          </ButtonGroup>
        </div>
      </PageHeader>
      {mode === 'table' && <TableView vmData={vms} />}
      {mode === 'card' && <CardView vmData={vms} />}
      {mode === 'minicard' && <MiniCardView vmData={vms} />}
    </main>
  )
}

export default VmList
