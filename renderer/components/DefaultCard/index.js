import React from 'react'
import Card from '@material-ui/core/Card'

import styles from './index.module.css'

const DefaultCard = ({ children }) => <Card className={styles.card}>{children}</Card>

// <div className={styles.card}>{children}</div>

export default DefaultCard