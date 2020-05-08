import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Link from 'next/link'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'

const ActionOverflowButton = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="action-overflow-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}>
        {children.map((child, i) => (
          <MenuItem key={i} onClick={handleClose}>
            {child}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
export default ActionOverflowButton
