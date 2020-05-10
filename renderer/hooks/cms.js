import { useEffect, useReducer, useState } from 'react'
import { ipcRenderer } from 'electron'
import { CMS_COMMAND_SEND, CMS_COMMAND_SEND_SYNC } from '../../main/constants'

/**
 * The initial state of the CMS hook state.
 * output - The parsed JSON output from CMS.
 * error - The stderr string buffer from the CMS IO
 * isRunning - Boolean indicating if we are currently running the specified command.
 *
 * @type {{output: null, isRunning: boolean, error: null}}
 */
const initialState = {
  output: null,
  error: null,
  isRunning: false,
}

/**
 * Reducer used to track output, error, and running status of the CMS command.
 *
 * @param state - The current state of the reducer.
 * @param action - The action object indicating the type of event and any payload data.
 * @returns {{output: *, isRunning: boolean, error: *}|{output: null, isRunning: boolean, error: null}}
 */
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
 *   const [ {output: vms, error, isRunning}, refreshVms ] = useCms({command: ['vm','list','--output=json']})
 *
 *   return (
 *     <>
 *       {vms.map(vm => <div>vm.name</div>)}
 *       <button onClick={() => refresmVms}>Refresh</button>
 *     </>
 *   )
 * }
 *
 * @param command | <Array> - Array of commands to pass to the cms script.
 * @returns {[output, refreshOutput]} | <Array> - First element is an object with output, error, and isRunning fields,
 *                                                second is a function that can be used to
 *                                                refresh the output.
 */
export const useCms = ({ command, parseJson = true }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const refresh = async () => {
    if (ipcRenderer) {
      dispatch({ type: 'execute' })
      const { stdout, stderr } = await ipcRenderer.invoke(
        CMS_COMMAND_SEND_SYNC,
        [...command, '--refresh'],
        parseJson
      )
      dispatch({ type: 'setio', output: stdout, error: stderr })
    }
  }

  // Load up data on initial mount.
  useEffect(() => {
    const initialFetch = async () => {
      if (ipcRenderer) {
        dispatch({ type: 'execute' })
        const { stdout, stderr } = await ipcRenderer.invoke(
          CMS_COMMAND_SEND_SYNC,
          command,
          parseJson
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

export const useCmsVmStartStop = () => {
  const [status, setStatus] = useState('idle')

  const sendVmStart = (command) => {
    setStatus('starting')
    ipcRenderer.invoke(CMS_COMMAND_SEND, command).then(() => {
      setStatus('idle')
    })
  }

  const sendVmStop = (command) => {
    setStatus('stopping')
    ipcRenderer.invoke(CMS_COMMAND_SEND, command).then(() => {
      setStatus('idle')
    })
  }
  return [status, sendVmStart, sendVmStop]
}

/**
 * Custom hook to get / set CMS cloud information
 *
 */
export const useCmsCloud = (defaultCloud = 'openstack') => {
  const [cloud, setCloud] = useState(defaultCloud)

  const setCmsCloud = (cloud) => {
    ipcRenderer.invoke(CMS_COMMAND_SEND, ['set', `cloud=${cloud}`]).then(() => {
      setCloud(cloud)
    })
  }
  useEffect(() => {
    const getCloud = async () => {
      const { stdout, stderr } = await ipcRenderer.invoke(
        CMS_COMMAND_SEND_SYNC,
        ['set', 'cloud'],
        false
      )
      const cloudRegex = /cloud='(\w+)\'/g
      const matches = stdout.matchAll(cloudRegex)

      let cloud
      for (const match of matches) {
        cloud = match[1]
      }
      setCloud(cloud)
    }
    getCloud()
  }, [])
  return [cloud, setCmsCloud]
}
