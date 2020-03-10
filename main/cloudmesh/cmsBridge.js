import { PythonShell } from 'python-shell'

// Default options to pass to the PythonShell lib.
const defaultOptions = {
  mode: 'json',
  pythonOptions: ['-u'], // get print results in real-time
}

/**
 * Returns a new PythonShell instance.
 *
 * See https://www.npmjs.com/package/python-shell#pythonshellscript-options-constructor
 * for a full list of options supported by PythonShell.
 *
 * @param cmsPath - The path to the cloudmesh cms script.
 * @param options - An object of options to pass to PythonShell
 * @returns {PythonShell} - The PythonShell object.
 */
export const getCmsBridge = ({
  scriptPath,
  options = {},
  onMessage = () => {},
  onStderr = () => {},
  onClose = () => {},
  onError = () => {},
}) => {
  const pyShellOpts = {
    ...defaultOptions,
    ...options,
  }
  const cms = new PythonShell(scriptPath, pyShellOpts)
  // Attach event handlers.
  cms.on('message', onMessage)
  cms.on('stderr', onStderr)
  cms.on('close', onClose)
  cms.on('error', onError)
  return cms
}
