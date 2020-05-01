import React from 'react'
import Card from '@material-ui/core/Card'

import styles from './index.module.css'

const PageHeader = ({ children, name }) => {
  return (
    <div className={styles.pageHeader}>
      <header className={styles.headerLabel}>{name}</header>
      {children}
    </div>
  )
}

export default PageHeader
