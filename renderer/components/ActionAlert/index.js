import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import CloseIcon from '@material-ui/icons/Close'

const ActionAlert = ({ open, message = 'Alert' }) => {
  const [close, setClose] = useState(false)
  const handleClose = () => setClose(true)
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={open && !close}
      autoHideDuration={6000}
      onClose={handleClose}
      message={message}
      action={
        <>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      }
    />
  )
}

export default ActionAlert
