import spawn from 'cross-spawn'
import fs from 'fs'

const dataObjRegex = /([\[{][\S\s]*[}\]])/m

export const runCms = ({ cmsBin, args = [] }) => {
  let result = {}
  if (cmsBin && fs.existsSync(cmsBin)) {
    try {
      const { stdout: output, status } = spawn.sync(cmsBin, args, {
        stdio: ['ignore', 'pipe', process.stderr],
      })
      const match = output.toString().match(dataObjRegex)
      if (status === 0 && match) {
        result = JSON.parse(match[1])
      }
    } catch (error) {}
  } else {
    throw new Error('Invalid CMS binary.')
  }
  return result
}
