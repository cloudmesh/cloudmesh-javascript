import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import styles from './index.module.css'

const useStyles = makeStyles({
    root: {
        minWidth: 200,
        maxWidth: 250,
        cursor: "pointer",
        boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)"
    }
})

const SimpleCard = ({...props}) => {
    console.log('props', props);
    const {id, name, ip, status} = props;
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="body1">
                  Name: <strong>{name}</strong>
                </Typography>
                <Typography variant="body2">
                  Status: {status}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  IP: {ip}
                 </Typography>
            </CardContent>
        </Card>
    );
}

export default SimpleCard
