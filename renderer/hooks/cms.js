import { useEffect, useState } from 'react'
import { ipcRenderer } from 'electron'
import { CMS_COMMAND_SEND } from '../../main/constants'

/**
 * A custom hook for interfacing with the Cloudmesh cms script.
 * This hook allows any component to easily send commands and
 * fetch output.
 *
 * Usage:
 * import { useCms } from './hooks/cms'
 * const MyComp = () => {
 *   const [ vms, refreshVms ] = useCms({command: ['vm','list','--output=json']})
 *
 *   return (
 *     <>
 *       {vms.map(vm => <div>vm.name</div>)}
 *       <button onClick={() => refresmVms}>Refresh</button>
 *     </>
 *   )
 * }
 *
 * TODO: Add support for sync and async operations.
 *
 * @param command | <Array> - Array of commands to pass to the cms script.
 * @returns {[output, refreshOutput]} | <Array> - First element is output, second is a function that can be used to
 * refresh the output.
 */
export const useCms = ({ command }) => {
  const [output, setOutput] = useState(null)

  const refreshOutput = async () => {
    if (ipcRenderer) {
      setOutput(
        await ipcRenderer.invoke(CMS_COMMAND_SEND, [...command, '--refresh'])
      )
    }
  }

  // Load up data on initial mount.
  useEffect(() => {
    const initialFetch = async () => {
      if (ipcRenderer) {
        const output = await ipcRenderer.invoke(CMS_COMMAND_SEND, command)
        setOutput(output)
      }
    }
    initialFetch()
    // Called on unmount
    return () => {
      // Cancel all calls.
    }
  }, [])

  return [output, refreshOutput]
}
