import React from 'react';
import { CardMedia , Typography, Button, Card, CardContent, } from "@material-ui/core";
import { Avatar, CardHeader, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import ad from '../assets/advertise.jpg';
import gift from '../assets/giftbox.jpg';
import aron from '../assets/aron-smith.jpg';
import jadon from '../assets/jadon.webp';
import micheal from '../assets/michal-h.jpg';
import {useStyles} from './styles.js';

function Rightbar(){
    const classes = useStyles();
    return(
        <Card className={classes.rightbarTop}>
            <CardHeader
             avatar={<Avatar sx={{ width : 80 }} src={gift} alt="giftbox"/>}
             title={
                <Typography> <div className={classes.boldText}>Jhon Wick</div> <div className={classes.fadedText}>and</div> <div className={classes.boldText}>3 other friends</div> <div className={classes.fadedText}>have a birthday today</div>
                </Typography>
                }
            />
            <CardMedia
                component="img"
                height="250"
                image={ad}
                alt="advertisement"
                className={classes.ad}
            />
            <CardContent>
            <Typography variant="h5"> <div className={classes.boldText}>Suggestions</div></Typography>
            <List>
                <ListItem className={classes.typo}>
                    <ListItemIcon><Avatar  alt="person" src={aron} /></ListItemIcon>
                    <ListItemText><Typography>Aron Smith</Typography></ListItemText>
                    <Button className={classes.friendButton} variant="outlined">Add friend</Button>
                </ListItem>
            
                <ListItem className={classes.typo}>
                    <ListItemIcon><Avatar  alt="person" src={jadon}/></ListItemIcon>
                    <ListItemText><Typography>Jadon Sancho</Typography></ListItemText>
                    <Button className={classes.friendButton} variant="outlined">Add friend</Button>
                </ListItem>
            
                <ListItem className={classes.typo}>
                    <ListItemIcon><Avatar  alt="person" src={micheal}/></ListItemIcon>
                    <ListItemText><Typography>Micheal H</Typography></ListItemText>
                    <Button className={classes.friendButton} variant="outlined">Add friend</Button>
                </ListItem>
            </List>
            </CardContent>
        </Card>
    );
};

export {Rightbar};