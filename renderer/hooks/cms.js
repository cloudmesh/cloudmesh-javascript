import { useEffect, useReducer } from 'react'
import { ipcRenderer } from 'electron'
import { CMS_COMMAND_SEND } from '../../main/constants'

const initialState = {
  output: null,
  error: null,
  isRunning: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'execute':
      return { output: null, error: null, isRunning: true }
    case 'setio':
      return { output: action?.output, error: action?.error, isRunning: false }
    case 'reset':
      return initialState
    default:
      throw new Error(`Unexpected action: {action.type}`)
  }
}
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
  const [state, dispatch] = useReducer(reducer, initialState)

  const refresh = async () => {
    if (ipcRenderer) {
      dispatch({ type: 'execute' })
      const { stdout, stderr } = await ipcRenderer.invoke(CMS_COMMAND_SEND, [
        ...command,
        '--refresh',
      ])
      dispatch({ type: 'setio', output: stdout, error: stderr })
    }
  }

  // Load up data on initial mount.
  useEffect(() => {
    const initialFetch = async () => {
      if (ipcRenderer) {
        dispatch({ type: 'execute' })
        const { stdout, stderr } = await ipcRenderer.invoke(
          CMS_COMMAND_SEND,
          command
        )
        dispatch({ type: 'setio', output: stdout, error: stderr })
      }
    }
    initialFetch()
    // Called on unmount
    return () => {
      // Cancel all calls.
    }
  }, [])

  return [state, refresh]
}
