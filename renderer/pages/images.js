import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { CMS_IMAGE_LIST_CMD } from '../../main/constants'
import { useCms } from '../hooks/cms'
import ImagesTable from '../components/ImagesTable'

import styles from './images.module.css'

const Images = () => {
  const [images, refreshImages] = useCms({ command: CMS_IMAGE_LIST_CMD })

  if (images) {
    return <ImagesTable rows={images} />
  }

  return (
    <div className={styles.loading}>
      <CircularProgress size="5rem" />
    </div>
  )
}

export default Images
