import React from 'react'
import Link from 'next/link'

import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'

const Sidebar = () => {
  return (
    <Paper>
      <MenuList>
        <MenuItem>
          <Link href="/">
            <a>Home</a>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/vm/list">
            <a>VM List</a>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/settings">
            <a>Settings</a>
          </Link>
        </MenuItem>
      </MenuList>
    </Paper>
  )
}

export default Sidebar
