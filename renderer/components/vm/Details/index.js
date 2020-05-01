import React from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import JSONTree from 'react-json-tree'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import RefreshButton from '../../../components/RefreshButton'
import CmsError from '../../../components/CmsError'
import { useCms } from '../../../hooks/cms'
import { CMS_VM_INFO_CMD } from '../../../../main/constants'
import nicinabox from './themes/nicinabox'

const Details = ({ name }) => {
  const router = useRouter()
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
        <Button onClick={() => router.back()}>
          <ArrowBackIosIcon />
        </Button>
        <RefreshButton onRefresh={refreshDetails} />
        <CmsError error={error} />
      </div>
      {details && (
        <div style={{ padding: '2rem 0 0 3rem' }}>
          <h2>VM Details for {name}</h2>
          <JSONTree
            data={details[0]}
            theme={nicinabox}
            invertTheme={true}
            hideRoot={true}
          />
        </div>
      )}
    </div>
  )
}

Details.propTypes = {
  name: PropTypes.string.isRequired,
}

export default Details
