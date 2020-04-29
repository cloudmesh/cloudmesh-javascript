import spawn from 'cross-spawn'
import fs from 'fs'
import extract from 'extract-json-from-string'

export const runCmsSync = ({ cmsBin, args = [], parseJson = true }) => {
  let result = {
    stdout: null,
    stderr: null,
  }
  if (cmsBin && fs.existsSync(cmsBin)) {
    try {
      const { stdout, stderr, status } = spawn.sync(cmsBin, args, {
        stdio: ['ignore', 'pipe', 'pipe'],
      })
      if (parseJson) {
        // The "JSON" output from CMS is problematic because it is polluted with
        // extraneous string data that is not part of the actual JSON response.
        // As a result we have to extract the JSON strings we can find in the
        // output.  Sometimes strings may look like a JSON object but are in fact
        // not so we return the last item found.
        const objects = extract(stdout.toString())
        // Always return the last JSON object
        result.stdout = objects.pop()
      } else {
        result.stdout = stdout.toString()
      }

      if (stderr) {
        result.stderr = stderr.toString()
      }
      if (stdout?.toString().includes('ERROR')) {
        result.stderr += stdout.toString()
      }
    } catch (error) {
      console.log('Error parsing output', error)
    }
  } else {
    throw new Error('Invalid CMS binary.')
  }
  return result
}

export const runCms = ({ cmsBin, args = [] }) => {
  if (cmsBin && fs.existsSync(cmsBin)) {
    return new Promise((resolve, reject) => {
      const cms = spawn(cmsBin, args)

      // Handler for when data is returned from CMS
      cms.on('close', (code) => {
        if (code !== 0) {
          reject(Error(`${cmsBin} ${args} exited with code ${code}`))
        }
        resolve()
      })
      // Handler for stderr from CMS
      cms.stderr.on('data', (stderr) => {
        reject(Error(stderr))
      })
    })
  }
}
