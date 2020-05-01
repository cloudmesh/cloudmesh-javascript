import React, { useState, useEffect } from 'react'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import ComputerIcon from '@material-ui/icons/Computer'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import { CMS_VM_START_CMD, CMS_VM_STOP_CMD } from '../../../main/constants'
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite'
import StopIcon from '@material-ui/icons/Stop'
import InfoIcon from '@material-ui/icons/Info'
import DefaultCard from '../DefaultCard'
import { makeStyles } from '@material-ui/core/styles'
import { green, red, yellow, orange } from '@material-ui/core/colors'
import { useCmsVmStartStop } from '../../hooks/cms'
import Link from 'next/link'

const useStyles = makeStyles((theme) => ({
  green: {
    color: '#fff',
    backgroundColor: green[500],
  },
  yellow: {
    color: theme.palette.getContrastText(yellow[500]),
    backgroundColor: yellow[500],
  },
  orange: {
    color: theme.palette.getContrastText(orange[500]),
    backgroundColor: orange[500],
  },
  red: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
  },
}))

const Card = ({ id, name, ip_public, status: vmStatus, metadata }) => {
  const classes = useStyles()
  // Initialize local status using VM list status.
  const [status, setStatus] = useState(vmStatus)

  const [cmsStatus, sendVmStart, sendVmStop] = useCmsVmStartStop()

  useEffect(() => {
    if (cmsStatus === 'starting') {
      setStatus('STARTING')
    } else if (cmsStatus === 'stopping') {
      setStatus('STOPPING')
    } else if (status === 'STARTING' || status === 'STOPPING') {
      setStatus(status === 'STARTING' ? 'ACTIVE' : 'SHUTOFF')
    }
  }, [cmsStatus])

  let statusColor

  if (status === 'ACTIVE') {
    statusColor = 'green'
  } else if (status === 'SHUTOFF') {
    statusColor = 'red'
  } else if (status === 'ERROR') {
    statusColor = 'orange'
  } else if (status === 'STARTING' || status === 'STOPPING') {
    statusColor = 'yellow'
  }

  return (
    <DefaultCard key={id}>
      <CardHeader
        avatar={
          <Avatar
            className={statusColor ? classes[statusColor] : null}
            aria-label="virtual machine">
            <ComputerIcon />
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={name}
        subheader={ip_public}
      />
      <CardContent>
        <Typography color="textSecondary">Flavor</Typography>
        <Typography color="textPrimary">
          {metadata && metadata['flavor'] && metadata['flavor']}
        </Typography>
        <Typography color="textSecondary">Image</Typography>
        <Typography color="textPrimary">
          {metadata && metadata['image'] && metadata['image']}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href="/vm/details/[name]" as={`/vm/details/${name}`}>
          <IconButton size="small">
            <InfoIcon />
          </IconButton>
        </Link>
        <IconButton
          size="small"
          onClick={() => sendVmStart([...CMS_VM_START_CMD, name])}>
          <PlayCircleFilledWhiteIcon />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => sendVmStop([...CMS_VM_STOP_CMD, name])}>
          <StopIcon />
        </IconButton>
      </CardActions>
    </DefaultCard>
  )
}

export default Card
