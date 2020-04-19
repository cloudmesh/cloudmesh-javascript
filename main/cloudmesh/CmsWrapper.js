import spawn from 'cross-spawn'
import fs from 'fs'
import extract from 'extract-json-from-string'

export const runCmsSync = ({ cmsBin, args = [] }) => {
  let result = {}
  if (cmsBin && fs.existsSync(cmsBin)) {
    try {
      const { stdout: output, stderr, status } = spawn.sync(cmsBin, args, {
        stdio: ['ignore', 'pipe', 'pipe'],
      })
      // The "JSON" output from CMS is problematic because it is polluted with
      // extraneous string data that is not part of the actual JSON response.
      // As a result we have to extract the JSON strings we can find in the
      // output.  Sometimes strings may look like a JSON object but are in fact
      // not so we return the last item found.
      const objects = extract(output.toString())
      // Always return the last JSON object
      result = objects.pop()
    } catch (error) {
      console.log('Error parsing output', error)
    }
  } else {
    throw new Error('Invalid CMS binary.')
  }
  return result
}

// export const runCms = ({ cmsBin, args = [] }) => {
//   let result = {}
//   if (cmsBin && fs.existsSync(cmsBin)) {
//     try {
//       const { stdout: output, status } = spawn(cmsBin, args, {
//         stdio: ['ignore', 'pipe', process.stderr],
//       })
//       const match = output.toString().match(dataObjRegex)
//       if (status === 0 && match) {
//         result = JSON.parse(match[1])
//       }
//     } catch (error) {}
//   } else {
//     throw new Error('Invalid CMS binary.')
//   }
//   return result
// }
