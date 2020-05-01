import React from 'react'
import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import VmTabs from '../components/VmTabs'

import 'typeface-roboto'

// Globally applied CSS
import './global.css'

// CSS locally scoped to this component.
import styles from './_app.module.css'

function CloudmeshApp({ Component, pageProps }) {
  console.log('pageProps', pageProps)
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
          <Sidebar />
        </nav>
        <section className={styles.main_section}>
          {/*<VmTabs />*/}
          <Component {...pageProps} />
        </section>
      </main>
    </React.Fragment>
  )
}

export default CloudmeshApp
