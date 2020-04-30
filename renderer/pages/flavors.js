import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { CMS_FLAVOR_LIST_CMD } from '../../main/constants'
import { useCms } from '../hooks/cms'
import CmsError from '../components/CmsError'
import FlavorsTable from '../components/FlavorsTable'

import styles from './flavors.module.css'
import RefreshButton from '../components/RefreshButton'

const Flavors = () => {
  const [{ output: flavors, error, isRunning }, refreshFlavors] = useCms({
    command: CMS_FLAVOR_LIST_CMD,
  })

  if (isRunning) {
    return (
      <div className={styles.loading}>
        <CircularProgress size="5rem" />
      </div>
    )
  }
  return (
    <div>
      <div className={styles.buttons}>
        <RefreshButton onRefresh={refreshFlavors} />
        <CmsError error={error} />
      </div>
      {flavors && <FlavorsTable rows={flavors} />}
    </div>
  )
}

export default Flavors
