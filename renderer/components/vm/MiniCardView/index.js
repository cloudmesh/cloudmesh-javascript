import React from 'react'
import styles from './index.module.css'
import { makeStyles } from '@material-ui/core/styles'
import { green, red, yellow } from '@material-ui/core/colors'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
// import Card from '@material-ui/core/Card'
import MiniCard from '../../MiniCard'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import RefreshIcon from '@material-ui/icons/Refresh'
import Typography from '@material-ui/core/Typography'
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite'
import StopIcon from '@material-ui/icons/Stop'
import ComputerIcon from '@material-ui/icons/Computer'
import { ipcRenderer } from 'electron'
import { CMS_COMMAND_SEND } from '../../../../main/constants'

const useStyles = makeStyles((theme) => ({
  green: {
    color: '#fff',
    backgroundColor: green[500],
  },
  yellow: {
    color: theme.palette.getContrastText(yellow[500]),
    backgroundColor: yellow[500],
  },
  red: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
  },
}))

const controlVm = async (command, vmName) => {
  if (ipcRenderer) {
    ipcRenderer.invoke(CMS_COMMAND_SEND, ['vm', command, vmName])
  }
}

const MiniCardView = ({ vmData = [], onRefresh = () => {} }) => {
  const classes = useStyles()

  return (
    <>
      <div className={styles.minicards}>
        {vmData &&
          vmData.map(({ id, name, ip_public, status, metadata }) => {
            let statusColor
            if (status === 'ACTIVE') {
              statusColor = 'green'
            } else if (status === 'SHUTOFF') {
              statusColor = 'red'
            } else if (status === 'ERROR') {
              statusColor = 'yellow'
            }
            return (
              <MiniCard key={id}>
                <CardHeader
                  avatar={
                    <Avatar
                      className={statusColor ? classes[statusColor] : null}
                      aria-label="virtual machine">
                      <ComputerIcon />
                    </Avatar>
                  }
                  title={name}
                />
              </MiniCard>
            )
          })}
      </div>
    </>
  )
}
export default MiniCardView
