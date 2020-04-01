import React from 'react'
import Link from 'next/link'
import PythonPath from '../components/PythonPath'
import usePythonPath from '../hooks/usePythonPath'

const Settings = () => {
  const [pythonPath, setPythonPath] = usePythonPath()

  return (
    <main>
      <Link href="/">
        <a>Home</a>
      </Link>
      <PythonPath path={pythonPath} onChange={(path) => setPythonPath(path)} />
    </main>
  )
}

export default Settings
