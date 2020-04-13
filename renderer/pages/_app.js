import React from 'react'
import Head from 'next/head'

import Sidebar from '../components/Sidebar'

// Globally applied CSS
import './global.css'
// CSS locally scoped to this component.
import styles from './_app.module.css'

function CloudmeshApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <title>Cloudmesh Dashboard</title>
        <meta
          httpEquiv="Content-Security-Policy"
          content="script-src 'self' 'unsafe-inline';"
        />
      </Head>
      <header>
        <h1>Cloudmesh Dashboard</h1>
      </header>
      <main className={styles.main}>
        <nav className={styles.nav}>
          <Sidebar />
        </nav>
        <section>
          <Component {...pageProps} />
        </section>
      </main>
    </React.Fragment>
  )
}

export default CloudmeshApp
