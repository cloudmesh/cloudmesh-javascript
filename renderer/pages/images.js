import React from 'react'
import { CMS_IMAGE_LIST_CMD } from '../../main/constants'
import { useCms } from '../hooks/cms'
import ImagesTable from '../components/ImagesTable'

const Images = () => {
  const [images, refreshImages] = useCms({ command: CMS_IMAGE_LIST_CMD })

  return images && <ImagesTable rows={images} />
}

export default Images
