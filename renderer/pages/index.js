import React from 'react'
import Head from 'next/head'
import usePythonPath from '../hooks/usePythonPath'
// import Link from 'next/link'
import Main from '../components/Main'
import PythonPath from '../components/PythonPath'

const Index = () => {
  const [pythonPath, setPythonPath] = usePythonPath()

  const app = pythonPath ? (
    <Main />
  ) : (
    <PythonPath path={pythonPath} onChange={path => setPythonPath(path)} />
  )

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
      <main>{app}</main>
    </React.Fragment>
  )
}

export default Index
