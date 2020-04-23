import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { CMS_FLAVOR_LIST_CMD } from '../../main/constants'
import { useCms } from '../hooks/cms'
import FlavorsTable from '../components/FlavorsTable'

import Button from '@material-ui/core/Button'
import RefreshIcon from '@material-ui/icons/Refresh'

import styles from './images.module.css'
import RefreshButton from '../components/RefreshButton'

const Flavors = () => {
  const [flavors, refreshFlavors] = useCms({ command: CMS_FLAVOR_LIST_CMD })

  if (flavors) {
    return (
      <div>
        <RefreshButton onRefresh={refreshFlavors} />
        <FlavorsTable rows={flavors} />
      </div>
    )
  }

  return (
    <div className={styles.loading}>
      <CircularProgress size="5rem" />
    </div>
  )
}

export default Flavors
