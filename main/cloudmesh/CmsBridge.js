import { PythonShell } from 'python-shell'
import { existsSync } from 'fs'
import Queue from 'p-queue'

/**
 * Class: CmsBridge
 * Description: Class for interfacing with the CloudMesh CMS command line
 * via PythonShell.
 */
export default class CmsBridge {
  // Default options to pass to the PythonShell lib.
  static defaultOptions = {
    mode: 'json',
    pythonOptions: ['-u'], // get print results in real-time
    jobTimeout: 10000,
  }

  /**
   * Constructor method for the CmsBridge.
   *
   * Throws an error if the script is not found.
   *
   * Default options are:
   *
   * {
   *   mode: 'json',
   *   pythonOptions: ['-u'],
   *   jobTimeout: 10000,
   * }
   *
   * @param scriptPath - The path to the CMS python script.
   * @param options - PythonShell options https://github.com/extrabacon/python-shell#pythonshellscript-options-constructor
   *
   */
  constructor({ scriptPath, options = {} }) {
    if (!existsSync(scriptPath)) {
      throw new Error(`${scriptPath} not found`)
    }

    this._jobQueue = new Queue({
      concurrency: 1,
      timeout: options?.jobTimeout ?? 10000,
      throwOnTimeout: true,
    })

    this.cms = new PythonShell(scriptPath, {
      ...CmsBridge.defaultOptions,
      ...options,
    })
  }

  /**
   * A proxy send command to wrap the event based stream handling of PythonShell
   * into a Promise based handler.  This was used to improve integration for
   * Electron and its IpcRenderer.  A promise queue is also used to prevent
   * more than one CMS command from being sent at a time.
   *
   * Command Object:
   *
   * {
   *   "command": "<CMS COMMAND>",
   *   "operation": "<CMS OPERATION>",
   *   "args": ["<OPERATION ARGS>"]
   * }
   *
   * @param commandObj - The CMS command object to submit.
   * @returns {Promise<unknown>} - A promise that resolves when the output or error has been sent.
   */
  send(commandObj = {}) {
    // This adds the submitted command to a job queue.
    return this._jobQueue.add(
      // The job is submitted as an anonymous function that returns a promise.
      () =>
        // This promise wraps the streaming event based API of the PythonShell module
        // so that we can easily integrate it with the IpcRenderer.invoke()
        // method of electron.
        new Promise((resolve, reject) => {
          // Handler for when data is returned from python.
          this.cms.on('message', (message) => {
            resolve(message)
          })
          // Handler for stderr from python.
          this.cms.on('stderr', (stderr) => {
            reject(Error(stderr))
          })
          // Handler for a general error.
          this.cms.on('error', (error) => {
            reject(Error(error))
          })
          // Send command to CMS
          this.cms.send(commandObj)
        })
    )
  }
}
