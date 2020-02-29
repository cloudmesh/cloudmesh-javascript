import React from 'react'
import Head from 'next/head'
// import Link from 'next/link'
import electron from 'electron'

// prevent SSR webpacking
const ipcRenderer = electron.ipcRenderer ?? false

const Index = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Cloudmesh Dashboard</title>
        <meta
          httpEquiv="Content-Security-Policy"
          content="script-src 'self' 'unsafe-inline';"
        />
      </Head>
      <main>
        <section>
          <header>
            <h1>Cloudmesh Dashboard</h1>
          </header>
        </section>
      </main>
    </React.Fragment>
  )
}

export default Index
