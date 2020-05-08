import React, { useState } from 'react'
import { ipcRenderer } from 'electron'
import IconButton from '@material-ui/core/IconButton'
import LaunchIcon from '@material-ui/icons/Launch'
import { CMS_OPEN_TERMINAL } from '../../../main/constants'

const OpenTerminalButton = ({ ip, onLaunch = () => {} }) => {
  const handleOnClick = () => {
    if (ipcRenderer && Boolean(ip)) {
      ipcRenderer.invoke(CMS_OPEN_TERMINAL, [ip]).then(() => {
        onLaunch(`VM Terminal to ${ip} started in background`)
      })
    }
  }

  return (
    <IconButton size="small" onClick={handleOnClick}>
      <LaunchIcon />
    </IconButton>
  )
}

export default OpenTerminalButton
