import React from 'react'
import Link from 'next/link'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import GithubIcon from '@material-ui/icons/Github'
import { makeStyles } from '@material-ui/core'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles(() => ({
  contri: {
    margin: '20px',
    padding: '20px'
  },
  mainContris: {
      marginBottom: '20px'
  }
}))

const Contributors = () => {
  const classes = useStyles()

  return (
    <Paper className={classes.contri}>
        <div className={classes.mainContris}>
            <Typography variant="h4">
                List of contributors
            <span
                href='https://github.com/cloudmesh/cloudmesh-javascript/graphs/contributors'
                target="_blank"
                rel="noopener noreferrer">
                <GithubIcon
                    fontSize="medium"
                    style={{ marginLeft: '15px', cursor: 'pointer', color: '#000' }}
                />
            </span>
            </Typography>
            <Typography variant='body1'>
                <MenuList>
                    <MenuItem>Josh Goodman (@jogoodma)</MenuItem>
                    <MenuItem>Akshay Gupta (@akshaygpt)</MenuItem>
                    <MenuItem>Gregor von Laszewski (@laszewsk)</MenuItem>
                </MenuList>
            </Typography>
        </div>
        <Typography variant="body1">
            The project referenced the design mocks developed in a previous project (cloudmesh-community/graphql) by:
            <MenuList>
                <MenuItem>Mihir Shanishchara (@MihirNS)</MenuItem>
            </MenuList>
        </Typography>
    </Paper>
  )
}

export default Contributors
