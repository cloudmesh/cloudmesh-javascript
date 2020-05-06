import React from 'react'
import Link from 'next/link'
import styles from './index.module.css'
import MainAppCard from '../MainAppCard'
import AdjustIcon from '@material-ui/icons/Adjust'
import LineWeightIcon from '@material-ui/icons/LineWeight'
import CloudIcon from '@material-ui/icons/Cloud'
import SettingsIcon from '@material-ui/icons/Settings'
import PersonIcon from '@material-ui/icons/Person'

const Main = () => {
  return (
    <div className={styles.app_sections}>
      <section>
        <h3>Clouds</h3>
        <div className={styles.app_cards}>
          <MainAppCard title="Images">
            <Link href="/images">
              <a>
                <AdjustIcon fontSize="inherit" style={{ fill: '#6100ee' }} />
              </a>
            </Link>
          </MainAppCard>
          <MainAppCard title="Flavors">
            <Link href="/flavors">
              <a>
                <LineWeightIcon
                  fontSize="inherit"
                  style={{ fill: '#6100ee' }}
                />
              </a>
            </Link>
          </MainAppCard>
          <MainAppCard title="VM List">
            <Link href="/vm/list">
              <a>
                <CloudIcon fontSize="inherit" style={{ fill: '#6100ee' }} />
              </a>
            </Link>
          </MainAppCard>
        </div>
      </section>
      <section>
        <h3>Cloudmesh</h3>
        <div className={styles.app_cards}>
          <MainAppCard title="Profile">
            <Link href="/profile">
              <a>
                <PersonIcon fontSize="inherit" style={{ fill: '#6100ee' }} />
              </a>
            </Link>
          </MainAppCard>
          <MainAppCard title="Settings">
            <Link href="/settings/index">
              <a>
                <SettingsIcon fontSize="inherit" style={{ fill: '#6100ee' }} />
              </a>
            </Link>
          </MainAppCard>
        </div>
      </section>
    </div>
  )
}

export default Main
