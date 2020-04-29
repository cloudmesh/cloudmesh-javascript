import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { CMS_IMAGE_LIST_CMD } from '../../main/constants'
import { useCms } from '../hooks/cms'
import ImagesTable from '../components/ImagesTable'

import styles from './images.module.css'
import RefreshButton from '../components/RefreshButton'
import CmsError from '../components/CmsError'

const Images = () => {
  const [{ output: images, error, isRunning = false }, refreshImages] = useCms({
    command: CMS_IMAGE_LIST_CMD,
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
        <RefreshButton onRefresh={refreshImages} />
        <CmsError error={error} />
      </div>
      {images && <ImagesTable rows={images} />}
    </div>
  )
}

export default Images
