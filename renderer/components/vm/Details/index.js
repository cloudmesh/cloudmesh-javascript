import React from 'react'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import RefreshButton from '../../../components/RefreshButton'
import CmsError from '../../../components/CmsError'
import { useCms } from '../../../hooks/cms'
import { CMS_VM_INFO_CMD } from '../../../../main/constants'

const Details = ({ name, router }) => {
  const [{ output: details, error, isRunning }, refreshDetails] = useCms({
    command: [...CMS_VM_INFO_CMD, name],
  })

  if (isRunning) {
    return (
      <div>
        <CircularProgress size="5rem" />
      </div>
    )
  }

  return (
    <div>
      <div>
        <Button onClick={() => router.back()}>Back</Button>
        <RefreshButton onRefresh={refreshDetails} />
        <CmsError error={error} />
      </div>
      {details && (
        <>
          <h2>VM Details for {name}</h2>
          <pre>{JSON.stringify(details, null, 4)}</pre>
        </>
      )}
    </div>
  )
}

Details.propTypes = {
  name: PropTypes.string.isRequired,
}

export default Details
