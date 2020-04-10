import React from 'react'
import Card from '../Card'
import styles from './index.module.css'

const VmCardView = ({ vmData = null, onRefresh = () => {} }) => {
  const output = vmData?.output ?? []
  return (
    <>
      <h2>VM Card View</h2>
      <button onClick={onRefresh}>Refresh</button>
      <div className={styles.cards}>
        {output.map(({ id, name, ip_public, status }) => (
          <Card key={id}>
            <div>
              <b>Name:</b> {name}
            </div>
            <div>
              <b>IP (public):</b> {ip_public}
            </div>
            <div>
              <b>Status:</b> {status}
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}
export default VmCardView
