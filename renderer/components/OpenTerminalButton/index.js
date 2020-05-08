import React from 'react'
import { ipcRenderer } from 'electron'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import LaunchIcon from '@material-ui/icons/Launch'
import { CMS_OPEN_TERMINAL } from '../../../main/constants'

const OpenTerminalButton = ({
  name,
  ip,
  showLabel = true,
  onLaunch = () => {},
}) => {
  const handleOnClick = () => {
    if (ipcRenderer && Boolean(ip)) {
      ipcRenderer.invoke(CMS_OPEN_TERMINAL, [name]).then(() => {
        onLaunch(`Terminal to ${name} (${ip}) started in background`)
      })
    }
  }

  if (showLabel) {
    return (
      <Button size="small" onClick={handleOnClick} startIcon={<LaunchIcon />}>
        Launch Terminal
      </Button>
    )
    return
  }
  return (
    <IconButton size="small" onClick={handleOnClick}>
      <LaunchIcon />
    </IconButton>
  )
}

export default OpenTerminalButton
