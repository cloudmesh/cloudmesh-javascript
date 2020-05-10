import React from 'react'
import { useCms } from '../../hooks/cms'
import CmsError from '../CmsError'
import { CMS_VM_LOG_CMD } from '../../../main/constants'

const CmsLog = ({ vmName }) => {
  const [{ output, isRunning }] = useCms({
    command: [...CMS_VM_LOG_CMD, vmName],
    parseJson: false,
  })

  if (isRunning) {
    return <div>Fetching logs for {vmName}...</div>
  }

  return (
    <div>
      <h3>Logs for {vmName}</h3>
      <pre>{output}</pre>
    </div>
  )
}
export default CmsLog
