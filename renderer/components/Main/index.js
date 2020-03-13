import React from 'react'
import Link from 'next/link'

const Main = () => {
  return (
    <section>
      <div>This is the main section</div>
      <Link href="/settings">
        <a>Settings</a>
      </Link>
      <Link href="/vmlist">
        <a>VM List</a>
      </Link>
    </section>
  )
}

export default Main
