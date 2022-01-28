import React from 'react';
import { Avatar ,Badge ,Typography ,IconButton, Menu, MenuItem} from '@material-ui/core';
import { Chat, Notifications, Person, Home, Settings} from "@material-ui/icons";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useStyles} from './styles.js';
import newsfeed from '../assets/newspaper.png';
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Mymenu(){
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const toggleMenu = () => {
        setAnchorEl(null);
    };
    return(
        <div>
            <IconButton
                id="button"
                aria-controls="menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className={classes.menubuttonTwo}
            >
                <MoreVertIcon/>
            </IconButton>
            <Menu id="menu" open={open} onClose={toggleMenu} anchorEl={anchorEl}
             MenuListProps={{
                'aria-labelledby': 'button',
            }}
            className={classes.menu}
            >
                <MenuItem onClick={toggleMenu}>
                    <Link to={"/"} className={classes.menuItem}>
                    <Home  style={{marginRight:20}}/>
                    <Typography >Homepage</Typography>
                    </Link>
                </MenuItem>    
                <MenuItem onClick={toggleMenu} style={{overflow:"visible"}}>
                    <Link to={"/chat"}  className={classes.menuItem}>
                    <Badge badgeContent={9} color="error">
                    <Chat/></Badge>
                    <Typography className={classes.typo2}>Chats</Typography>  
                    </Link>  
                </MenuItem>
                <MenuItem onClick={toggleMenu} style={{overflow:"visible"}}>
                    <Link to={""} className={classes.menuItem}>
                    <Badge badgeContent={17} color="error">
                    <Notifications/></Badge>
                    <Typography className={classes.typo2}>Notifications</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={toggleMenu} style={{overflow:"visible"}}>
                    <Link to={"/settings"} className={classes.menuItem}>
                    <Settings />
                    <Typography className={classes.typo2}>Settings</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={toggleMenu} style={{overflow:"visible"}}>
                    <Link to={`/profile/${user.username}`}  className={classes.menuItem}>
                    <Avatar  src={PF+user.profilePicture}/>
                    <Typography className={classes.typo3}>{user.username}</Typography>
                    </Link>
                </MenuItem>
            </Menu>
        </div>
    );
}

export {Mymenu};