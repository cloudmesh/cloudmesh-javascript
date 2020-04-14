import React from 'react'
import Link from 'next/link'

const Sidebar = () => {
  return (
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/settings">
          <a>Settings</a>
        </Link>
      </li>
      <li>
        <Link href="/vmlist">
          <a>VM List</a>
        </Link>
      </li>
    </ul>
  )
}

export default Sidebar
