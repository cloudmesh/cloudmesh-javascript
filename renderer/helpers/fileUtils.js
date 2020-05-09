import fs from 'fs'
import { join } from 'path'

export const getAllFiles = (
  dirPath,
  filter = () => true,
  arrayOfFiles = []
) => {
  const files = fs.readdirSync(dirPath)
  files.filter(filter).forEach((file) => {
    if (fs.statSync(join(dirPath, file)).isDirectory()) {
      arrayOfFiles = getAllFiles(join(dirPath, file), filter, arrayOfFiles)
    } else {
      arrayOfFiles.push(join(dirPath, file))
    }
  })

  return arrayOfFiles
}
