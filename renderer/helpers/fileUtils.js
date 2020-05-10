import fs from 'fs'
import { join } from 'path'

/**
 * Given a directory, returns a list of all files within
 * that directory and its tree.
 *
 * @param dirPath - The directory path to search.
 * @param arrayOfFiles - Optional array to add files to.
 * @returns {*[]} - An array of file paths contained in the directory.
 */
export const getAllFiles = (dirPath, arrayOfFiles = []) => {
  // Read in all directories and files in initial path.
  const files = fs.readdirSync(dirPath)
  // Loop over each entry in the directory.
  files.forEach((file) => {
    if (fs.statSync(join(dirPath, file)).isDirectory()) {
      arrayOfFiles = getAllFiles(join(dirPath, file), arrayOfFiles)
    } else {
      arrayOfFiles.push(join(dirPath, file))
    }
  })

  return arrayOfFiles
}
