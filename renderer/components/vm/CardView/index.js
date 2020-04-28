import React from 'react'
import PropTypes from 'prop-types'

import Card from '../../Card'
import styles from './index.module.css'

const CardView = ({ vmData = [] }) => {
  return (
    <>
      <div className={styles.cards}>
        {vmData && vmData.map((vm, i) => <Card key={i} {...vm} />)}
      </div>
    </>
  )
}

CardView.propTypes = {
  vmData: PropTypes.arrayOf(PropTypes.object),
}

export default CardView
