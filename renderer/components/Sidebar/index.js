import React, { useState } from 'react'
import Link from 'next/link'

import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'

const Sidebar = () => {
  const [cloudProvider, setCloudProvider] = useState('openstack')

  const handleCloudProviderChange = (event) => {
    setCloudProvider(event.target.value)
  }

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
          <Link href="/settings/cms">
            <a>Settings</a>
          </Link>
        </MenuItem>
        <MenuItem>
          <FormControl>
            <InputLabel id="select-cloud-label">Cloud</InputLabel>
            <Select
              labelId="select-cloud-label"
              id="cloud-select"
              value={cloudProvider}
              onChange={handleCloudProviderChange}>
              <MenuItem value="openstack">OpenStack</MenuItem>
              <MenuItem value="aws">AWS</MenuItem>
              <MenuItem value="google">Google</MenuItem>
              <MenuItem value="azure">Azure</MenuItem>
            </Select>
          </FormControl>
        </MenuItem>
      </MenuList>
    </Paper>
  )
}

export default Sidebar
