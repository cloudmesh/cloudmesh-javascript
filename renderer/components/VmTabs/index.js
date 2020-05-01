import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { useCmsCloud } from '../../hooks/cms'

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
    marginBottom: '1.5rem',
  },
}))

export default function SimpleTabs() {
  const classes = useStyles()

  const [cloudProvider, setCloudProvider] = useCmsCloud('openstack')
  const handleCloudProviderChange = (event, newValue = '') => {
    setCloudProvider(newValue.toLowerCase())
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={cloudProvider} onChange={handleCloudProviderChange}>
          <Tab label="Openstack" value="openstack" {...a11yProps(0)} />
          <Tab label="AWS" value="aws" {...a11yProps(1)} />
          <Tab label="Google" value="google" {...a11yProps(2)} />
          <Tab label="Azure" value="azure" {...a11yProps(3)} />
          <Tab label="Chameleon" value="chameleon" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      {/*<TabPanel value="openstack" index={0}></TabPanel>*/}
      {/*<TabPanel value="aws" index={1}></TabPanel>*/}
    </div>
  )
}
