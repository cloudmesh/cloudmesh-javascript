import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Typography from '@material-ui/core/Typography'
import MenuList from '@material-ui/core/MenuList'
import Divider from '@material-ui/core/Divider'
import HomeIcon from '@material-ui/icons/Home'
import PersonIcon from '@material-ui/icons/Person'
import CloudIcon from '@material-ui/icons/Cloud'
import SettingsIcon from '@material-ui/icons/Settings'
import FeedbackIcon from '@material-ui/icons/Feedback'
import AdjustIcon from '@material-ui/icons/Adjust'
import LineWeightIcon from '@material-ui/icons/LineWeight'
import { makeStyles } from '@material-ui/core/styles'

import classes from './index.module.css'

const Sidebar = ({ config }) => {
  const firstname = config?.cloudmesh?.profile?.firstname ?? ''
  const lastname = config?.cloudmesh?.profile?.lastname ?? ''
  const email = config?.cloudmesh?.profile?.email ?? ''
  return (
    <Paper className={classes.root}>
      <section className={classes.sidebar_section}>
        <MenuList>
          <MenuItem>
            <Typography variant="h6" color="textPrimary">
              {`${firstname} ${lastname}`}
            </Typography>
          </MenuItem>
          <MenuItem>
            <Typography variant="body2" color="textSecondary">
              {email}
            </Typography>
          </MenuItem>
        </MenuList>
      </section>

      <Divider />

      <MenuList>
        <MenuItem>
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.list_text}>
            Cloudmesh
          </Typography>
        </MenuItem>
        <MenuItem>
          <Link href="/">
            <div className={classes.link_child}>
              <HomeIcon
                fontSize="small"
                style={{ fill: '#6100ee', marginRight: '15px' }}
              />
              <Typography variant="body2" className={classes.list_text}>
                Home
              </Typography>
            </div>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/settings/cloudmesh">
            <div className={classes.link_child}>
              <PersonIcon
                fontSize="small"
                style={{ fill: '#6100ee', marginRight: '15px' }}
              />
              <Typography variant="body2" className={classes.list_text}>
                Profile
              </Typography>
            </div>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/settings/index">
            <div className={classes.link_child}>
              <SettingsIcon
                fontSize="small"
                style={{ fill: '#6100ee', marginRight: '15px' }}
              />
              <Typography variant="body2" className={classes.list_text}>
                Settings
              </Typography>
            </div>
          </Link>
        </MenuItem>
      </MenuList>

      <Divider />

      <MenuList>
        <MenuItem>
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.list_text}>
            Clouds
          </Typography>
        </MenuItem>
        <MenuItem>
          <Link href="/images">
            <div className={classes.link_child}>
              <AdjustIcon
                fontSize="small"
                style={{ fill: '#6100ee', marginRight: '15px' }}
              />
              <Typography variant="body2" className={classes.list_text}>
                Images
              </Typography>
            </div>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/flavors">
            <div className={classes.link_child}>
              <LineWeightIcon
                fontSize="small"
                style={{ fill: '#6100ee', marginRight: '15px' }}
              />
              <Typography variant="body2" className={classes.list_text}>
                Flavors
              </Typography>
            </div>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/vm/list">
            <div className={classes.link_child}>
              <CloudIcon
                fontSize="small"
                style={{ fill: '#6100ee', marginRight: '15px' }}
              />
              <Typography variant="body2" className={classes.list_text}>
                VM List
              </Typography>
            </div>
          </Link>
        </MenuItem>
        {/*<MenuItem>*/}
        {/*  <CloudSelector />*/}
        {/*</MenuItem>*/}
      </MenuList>
    </Paper>
  )
}

Sidebar.propTypes = {
  config: PropTypes.object,
}

export default Sidebar
