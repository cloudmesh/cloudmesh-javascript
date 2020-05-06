import React from 'react'
import MainAppCard from '../../components/MainAppCard'
import Link from 'next/link'
import AdjustIcon from '@material-ui/icons/Adjust'
import SettingsIcon from '@material-ui/icons/Settings'

const Index = () => {
  return (
    <main>
      <h2>Settings</h2>
      <MainAppCard title="CMS Path">
        <Link href="/settings/cms">
          <a>
            <SettingsIcon fontSize="inherit" style={{ fill: '#6100ee' }} />
          </a>
        </Link>
      </MainAppCard>
      <MainAppCard title="Cloudmesh Config">
        <Link href="/settings/cloudmesh">
          <a>
            <SettingsIcon fontSize="inherit" style={{ fill: '#6100ee' }} />
          </a>
        </Link>
      </MainAppCard>
    </main>
  )
}

export default Index
