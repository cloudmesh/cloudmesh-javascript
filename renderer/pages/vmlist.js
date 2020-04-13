import React, { useEffect, useState } from 'react'
import VmCardView from '../components/VmCardView'
import VmTableView from '../components/VmTableView'
import { ipcRenderer } from 'electron'
import { CMS_VM_LIST_SEND } from '../../main/constants'
// import { makeCancelable } from '../../main/utils'

// TODO - Need to handle situations where the vm list command has fired
//        and the user clicks away, unmounting the component.
//        This results in setVmListResp getting called on an unmounted component
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
    // const cancelablePromise = makeCancelable(
    //   new Promise(r => component.setState({...}))
    // );
    //
    // cancelablePromise
    //   .promise
    //   .then(() => console.log('resolved'))
    //   .catch((reason) => console.log('isCanceled', reason.isCanceled));
    //
    // cancelablePromise.cancel(); // Cancel the promise
    // const cancelationToken = {}
    const initialFetch = async () => {
      if (ipcRenderer) {
        setVmListResp(await ipcRenderer.invoke(CMS_VM_LIST_SEND))
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
      {mode === 'card' && <VmCardView {...viewProps} />}
      {mode === 'table' && <VmTableView {...viewProps} />}
    </main>
  )
}

export default VmList
