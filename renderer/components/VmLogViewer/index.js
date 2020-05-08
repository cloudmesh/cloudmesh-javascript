import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import DescriptionIcon from '@material-ui/icons/Description'
import CmsLog from '../CmsLog'

/**
 * Given a VM name, this component fetches the log output from the
 * cms vm log command and displays it in a dismissable dialog screen.
 *
 * @param vmName - The VM name to fetch a log for.
 */
const VmLogViewer = ({ vmName, showLabel = true }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  let button = (
    <Button size="small" onClick={handleOpen} startIcon={<DescriptionIcon />}>
      Logs
    </Button>
  )

  if (!showLabel) {
    button = (
      <IconButton onClick={handleOpen}>
        <DescriptionIcon />
      </IconButton>
    )
  }

  return (
    <>
      {button}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        fullWidth={true}
        maxWidth="lg"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description">
        <DialogTitle id="scroll-dialog-title">VM Log</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            variant="body1"
            component="pre"
            tabIndex={-1}>
            <CmsLog vmName={vmName} />
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

VmLogViewer.propTypes = {
  vmName: PropTypes.string.isRequired,
  showLabel: PropTypes.bool,
}
export default VmLogViewer
