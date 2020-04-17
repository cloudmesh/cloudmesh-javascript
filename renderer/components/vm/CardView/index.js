import React from 'react'
import SimpleCard from '../../Card'
import styles from './index.module.css'

const CardView = ({ vmData = [], onRefresh = () => {} }) => {
  return (
    <>
      <h2>VM Card View</h2>
      <button onClick={onRefresh}>Refresh</button>
      <div className={styles.cards}>
        {vmData &&
          vmData.map(({ id, name, ip_public, status }) => (
            <SimpleCard key={id} name={name} ip={ip_public} status={status} />
          ))}
      </div>
    </>
  )
}
export default CardView
