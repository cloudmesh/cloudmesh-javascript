import React, { useState } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import JSONTree from 'react-json-tree'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import CircularProgress from '@material-ui/core/CircularProgress'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch'

import RefreshButton from '../../../components/RefreshButton'
import CmsError from '../../../components/CmsError'
import { useCms } from '../../../hooks/cms'
import { CMS_VM_INFO_CMD } from '../../../../main/constants'
import nicinabox from './themes/nicinabox'

const Details = ({ name }) => {
  const [showJson, setShowJson] = useState(true)
  const router = useRouter()
  const [{ output: details, error, isRunning }, refreshDetails] = useCms({
    command: [...CMS_VM_INFO_CMD, name],
  })
  const handleSwitchChange = () => setShowJson(!showJson)

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
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={showJson}
                  onChange={handleSwitchChange}
                  name="json"
                  color="primary"
                />
              }
              label="Show Formatted JSON"
            />
          </FormGroup>
          {showJson && (
            <JSONTree
              data={details[0]}
              theme={nicinabox}
              invertTheme={true}
              hideRoot={true}
            />
          )}
          {!showJson && <pre>{JSON.stringify(details[0], null, 2)}</pre>}
        </div>
      )}
    </div>
  )
}

Details.propTypes = {
  name: PropTypes.string.isRequired,
}

export default Details
