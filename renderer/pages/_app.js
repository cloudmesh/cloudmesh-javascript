import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { ipcRenderer } from 'electron'
import { CMS_GET_CONFIG } from '../../main/constants'
import Sidebar from '../components/Sidebar'
import VmTabs from '../components/VmTabs'

import 'typeface-roboto'

// Globally applied CSS
import './global.css'

// CSS locally scoped to this component.
import styles from './_app.module.css'

function CloudmeshApp({ Component, pageProps }) {
  const [config, setConfig] = useState()

  useEffect(() => {
    const getConfig = async () => {
      if (ipcRenderer) {
        setConfig(await ipcRenderer.invoke(CMS_GET_CONFIG))
      }
    }
    getConfig()
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>Cloudmesh Dashboard</title>
        <meta
          httpEquiv="Content-Security-Policy"
          content="script-src 'self' 'unsafe-inline';"
        />
      </Head>
      <main className={styles.main}>
        <nav className={styles.nav}>
          <Sidebar config={config} />
        </nav>
        <section className={styles.main_section}>
          <VmTabs />
          <Component config={config} {...pageProps} />
        </section>
      </main>
    </React.Fragment>
  )
}

export default CloudmeshApp
