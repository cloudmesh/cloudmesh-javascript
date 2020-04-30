import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import ErrorIcon from '@material-ui/icons/Error'

const CmsError = ({ error }) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const errorMessageRef = useRef(null)
  useEffect(() => {
    if (open) {
      const { current: errMessage } = errorMessageRef
      if (errMessage !== null) {
        errMessage.focus()
      }
    }
  }, [open])

  if (!error) {
    return null
  }

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        <ErrorIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        fullWidth={true}
        maxWidth="lg"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description">
        <DialogTitle id="scroll-dialog-title">CMS Error</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            variant="body1"
            component="pre"
            ref={errorMessageRef}
            tabIndex={-1}>
            {error}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Dismiss
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

CmsError.propTypes = {
  error: PropTypes.string,
}
export default CmsError
