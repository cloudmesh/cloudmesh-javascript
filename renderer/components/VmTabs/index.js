import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

function TabPanel(props) {
  console.log(props)
  const { children, value, index, ...other } = props

  const [cloudProvider, setCloudProvider] = useState('openstack')

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === cloudProvider && <Box p={3}>{children}</Box>}
    </Typography>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: theme.palette.text.primary,
  },
}))

export default function SimpleTabs() {
  const classes = useStyles()
  // const [value, setValue] = React.useState(0);
  //
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  const [cloudProvider, setCloudProvider] = useState('openstack')

  const handleCloudProviderChange = (event, newValue) => {
    setCloudProvider(newValue)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={cloudProvider} onChange={handleCloudProviderChange}>
          <Tab label="Openstack" {...a11yProps(0)} />
          <Tab label="AWS" {...a11yProps(1)} />
          <Tab label="Google" {...a11yProps(2)} />
          <Tab label="Azure" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value="openstack" index={0}></TabPanel>
      <TabPanel value="aws" index={1}></TabPanel>
    </div>
  )
}
