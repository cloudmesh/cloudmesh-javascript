import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { CMS_FLAVOR_LIST_CMD } from '../../main/constants'
import { useCms } from '../hooks/cms'
import FlavorsTable from '../components/FlavorsTable'

import styles from './images.module.css'

const Flavors = () => {
  const [flavors, refreshFlavors] = useCms({ command: CMS_FLAVOR_LIST_CMD })

  if (flavors) {
    return <FlavorsTable rows={flavors} />
  }

  return (
    <div className={styles.loading}>
      <CircularProgress size="5rem" />
    </div>
  )
}

export default Flavors
