import React from 'react';
import { Badge ,useTheme ,IconButton ,useMediaQuery , AppBar, Toolbar, Typography,  Drawer, Button } from "@material-ui/core";
import { Chat, Notifications, Person, RssFeed, Search, PlayCircleFilledOutlined, Group, Bookmark, HelpOutline, WorkOutline, Event, School } from "@material-ui/icons";
import InputBase from '@mui/material/InputBase';
import { Avatar, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Box} from '@mui/system';
import MenuIcon from "@material-ui/icons/Menu";
import cat from '../assets/cat.jpg';
import jhon from '../assets/jhon.jpeg';
import bruce_wayne from '../assets/bruce_wayne.jpg';
import milesmorales from '../assets/milesmorales.jpeg';
import {useStyles} from './styles.js';
import {Mymenu} from './menu.js';
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Layout({profile}) {
    const classes = useStyles();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
    const {user} = useContext(AuthContext);
    const toggleDrawer = event => {
        if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
        ) {
        return;
        }
        setOpen(!open);
    }; 
    const menuItems = [
        {
            text : 'Feed',
            icon : <RssFeed color="primary" />,
            path : ''
        },{
            text : 'Chats',
            icon : <Chat color="primary" />,
            path : ''
        },{
            text : 'Videos',
            icon : <PlayCircleFilledOutlined color="primary" />,
            path : ''
        },{
            text : 'Groups',
            icon : <Group color="primary" />,
            path : ''
        },{
            text : 'Bookmarks',
            icon : <Bookmark color="primary" />,
            path : ''
        },{
            text : 'Questions',
            icon : <HelpOutline color="primary" />,
            path : ''
        },{
            text : 'Jobs',
            icon : <WorkOutline color="primary" />,
            path : ''
        },{
            text : 'Events',
            icon : <Event color="primary" />,
            path : ''
        },{
            text : 'Courses',
            icon : <School color="primary" />,
            path : ''
        },
    ];   

   const handleClick = () => {
        localStorage.removeItem('user');
        window.location.reload();
    };

    return (
        <div>
        <AppBar position="fixed" className={classes.appbar}>
        <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        <Typography variant="h4" className={classes.text}>
            <Link to="/" style={{color:"white", textDecoration : "none"}}>Bee</Link>
        </Typography>
        <Box className={classes.box}>
            <Search className={classes.seacrhicon}/>
            <InputBase className={classes.input} placeholder="Search for friend, post or video"/>
        </Box>
        <Box className={classes.iconbox}>
            <Typography >Homepage</Typography>
            <Link to={"/settings"} style={{color:"white", textDecoration : "none"}}>
            <Typography >Settings</Typography>
            </Link>
            <Badge badgeContent={2} color="error">
                <Person/>
            </Badge>
            <Badge badgeContent={9} color="error">
                <Link to={"/chat"} style={{color:"white"}}>
                    <Chat/>
                </Link>
            </Badge>
            <Badge badgeContent={17} color="error">
                <Notifications/>
            </Badge>
            {(!profile) && (<Typography onClick={handleClick} variant="button" style={{marginLeft:10,cursor:"pointer"}}>Log Out</Typography>)}
            <Link to={`/profile/${user.username}`}>
                <Avatar  className={classes.avatar}  src={user.profilePicture}/>
            </Link>
        </Box>
        <Mymenu />
        </Toolbar>
        </AppBar>
        <Drawer className={classes.drawer} variant={isMdUp ? "permanent" : "temporary"} anchor="left" open={open}
        onClose={toggleDrawer} classes={{paper : classes.drawerPaper}}> 
            <List>
                {menuItems.map(item =>( 
                    <ListItem key={item.text} className={classes.leftdrawerlistitems}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText>{item.text}</ListItemText>
                    </ListItem>
                ))}
            </List>
            <Button variant="contained" color="default" className={classes.button}>Show More</Button>
            <hr className={classes.horizontalline}/>
            <List>
                <ListItem className={classes.typo}>
                    <ListItemIcon><Avatar  alt="person" src={jhon} /></ListItemIcon>
                    <ListItemText><Typography>Jhon Wick</Typography></ListItemText>
                </ListItem>
                <ListItem className={classes.typo}>
                    <ListItemIcon><Avatar  alt="person" src={bruce_wayne}/></ListItemIcon>
                    <ListItemText><Typography>Bruce Wayne</Typography></ListItemText>
                </ListItem>
                <ListItem className={classes.typo}>
                    <ListItemIcon><Avatar  alt="person" src={milesmorales}/></ListItemIcon>
                    <ListItemText><Typography>Miles Morales</Typography></ListItemText>
                </ListItem>
                <ListItem className={classes.typo}>
                    <ListItemIcon><Avatar  alt="person" src={cat}/></ListItemIcon>
                    <ListItemText><Typography>Thunder Cat</Typography></ListItemText>
                </ListItem>
            </List>
        </Drawer>
        </div>
    );
}

export {Layout};