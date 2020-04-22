import React, { useState } from 'react'
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
import CloudIcon from '@material-ui/icons/Cloud';
import SettingsIcon from '@material-ui/icons/Settings';
import FeedbackIcon from '@material-ui/icons/Feedback';
import AdjustIcon from '@material-ui/icons/Adjust';
import LineWeightIcon from '@material-ui/icons/LineWeight';
import { makeStyles } from '@material-ui/core/styles';

import classes from './index.module.css'

// const useStyles = makeStyles({
//   root: {
//     width: 230,
//     boxShadow: "0 0 7px 10px #888",
//     borderRadius: "6px"
//   }
// });

// const styles = useStyles()

const Sidebar = () => {
  const [cloudProvider, setCloudProvider] = useState('openstack')

  const handleCloudProviderChange = (event) => {
    setCloudProvider(event.target.value)
  }

  return (
    <Paper className={classes.root}>

      <section className={classes.sidebar_section}>
        <MenuList>
          <MenuItem>
            <Typography variant="h6" color="textPrimary">Akshay Gupta</Typography>
          </MenuItem>
          <MenuItem>
            <Typography variant="body2" color="textSecondary">guptaaks@iu.edu</Typography>
          </MenuItem>
        </MenuList>
      </section>

      <Divider />

      <MenuList>
        <MenuItem>
          <Typography variant="body2" color="textSecondary" className={classes.list_text}>Cloudmesh</Typography>
        </MenuItem>
        <MenuItem>
          <Link href="/">
            <>
              <HomeIcon fontSize="small" style={{fill: "#6100ee", marginRight: '15px'}} />
              <Typography variant="body2" className={classes.list_text}>Home</Typography>
            </>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/profile">
            <>
              <PersonIcon fontSize="small" style={{fill: "#6100ee", marginRight: '15px'}} />
              <Typography variant="body2" className={classes.list_text}>Profile</Typography>
            </>
          </Link>
        </MenuItem>
      </MenuList>

      <Divider />

      <MenuList>
        <MenuItem>
          <Typography variant="body2" color="textSecondary" className={classes.list_text}>Clouds</Typography>
        </MenuItem>
        <MenuItem>
          <Link href="/images">
            <>
              <AdjustIcon fontSize="small" style={{fill: "#6100ee", marginRight: '15px'}} />
              <Typography variant="body2" className={classes.list_text}>Images</Typography>
            </>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/flavors">
            <>
              <LineWeightIcon fontSize="small" style={{fill: "#6100ee", marginRight: '15px'}} />
              <Typography variant="body2" className={classes.list_text}>Flavors</Typography>
            </>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/vm/list">
            <>
              <CloudIcon fontSize="small" style={{fill: "#6100ee", marginRight: '15px'}} />
              <Typography variant="body2" className={classes.list_text}>VM List</Typography>
            </>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/settings/cms">
            <>
              <SettingsIcon fontSize="small" style={{fill: "#6100ee", marginRight: '15px'}} />
              <Typography variant="body2" className={classes.list_text}>Settings</Typography>
            </>
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
