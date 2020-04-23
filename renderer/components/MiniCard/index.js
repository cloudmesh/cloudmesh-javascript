import React from 'react'
import Card from '@material-ui/core/Card'

import styles from './index.module.css'

const MiniCard = ({ children }) => (
  <Card className={styles.minicard}>{children}</Card>
)

export default Card
