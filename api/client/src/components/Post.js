import React, { useState, useEffect, useContext } from 'react';
import { CardMedia,IconButton,Typography, Card, CardContent} from "@material-ui/core";
import { Avatar, CardHeader} from '@mui/material';
import { Box} from '@mui/system';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import likeimg from '../assets/like.png';
import heart from '../assets/heart.png';
import {useStyles} from './styles.js';
//import {Users} from '../dummyData';
import axios from "axios";
import {format} from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

function Post({post}){
    const classes = useStyles();
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user : currentUser} = useContext(AuthContext);
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data);
        }
        fetchUser();
    },[post.userId]);
    useEffect(()=>{
        setIsLiked(post.likes.includes(currentUser._id));
    },[currentUser._id, post.likes]);
    const likeHandler = () => {
        try {
            axios.put("/posts/"+post._id+"/like", {userId : currentUser._id});
        } catch (error) {
            console.log(error);
        }
        setLike(isLiked ? like-1 : like+1);
        setIsLiked(!isLiked);
    };
    return(
        <Card  className={classes.post}>
            <CardHeader
                avatar={
                    <Link to={`/profile/${user.username}`} style={{textDecoration:"none"}}>
                        <Avatar className={classes.avatar} src={PF+user.profilePicture}/>
                    </Link>
                }
                action={
                <IconButton aria-label="settings" style={{ color: 'black'}}>
                    <MoreVertIcon />
                </IconButton>
                }/>
            <Typography className={classes.postTitle}>
                <Link to={`/profile/${user.username}`} style={{textDecoration:"none", color: "black"}}>
                    <div style={{paddingRight : 10}} className={classes.boldText}>
                        { user.username }
                    </div>
                </Link>
                {format(post.createdAt)}
            </Typography>
            <CardContent>
                <Typography variant="body1" color="text.secondary" className={classes.postText}>
                {post.description} 
                </Typography>
            </CardContent>
            <CardMedia
                component="img"
                height="300"
                image={post.img}
                alt="Image"
                className={classes.postImg}
            />
            <Box className={classes.postBottom}>
                <Avatar sx={{width : 30, height : 30, marginRight : 1}} alt="like" src={likeimg} onClick={likeHandler} />
                <Avatar sx={{width : 30, height : 30, marginRight : 2}} alt="heart" src={heart} onClick={likeHandler} />
                <Typography className={classes.likecountertext}>{like} people like it</Typography>
                <Typography>{post.comment} comments</Typography>
            </Box>
        </Card>
    );
}

export {Post};