import React from 'react';
import { Box} from '@mui/system';
import { Avatar, Typography, Button } from "@material-ui/core";
import {useStyles} from '../styles.js';
import {Layout} from '../layout.js';
import {Post} from '../Post.js';
import {CreatePost} from '../createPost';
import axios from "axios";
import { useState, useEffect, useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Settings } from "@material-ui/icons";

function Profile(){
    const classes = useStyles();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [posts, setPosts] = useState([]);
    const [friends, setFriends] = useState([]);
    const {user : currentUser, dispatch} = useContext(AuthContext);
    const username = useParams().username;
    const [user, setUser] = useState({});
    const [followed, setFollowed] = useState(currentUser.following.includes(user?._id));

    useEffect(() => {
        const fetchPosts = async () => {
            //const res = await axios.get(`/posts/profile/${user.username}`);
            const res = await axios.get(`/posts/profile/${username}`);
            setPosts(
                res.data.sort((p1, p2)=>{
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
            );
        }
        fetchPosts();
    },[username]);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?username=${username}`);
            setUser(res.data);
        }
        fetchUser();
    },[username]);
    
    useEffect(() => {
        const getFriends = async () => {
            try {
                const res = await axios.get("/users/friends/"+user._id);
                setFriends(res.data);    
            } catch (error) {
                console.log(error);
            }
        };
        getFriends();
    },[user._id]);
    
    useEffect(()=> {
        setFollowed(currentUser.following.includes(user?._id));
    },[currentUser, user._id]);

    const handleClick = async () => {
        try {
            if(followed){
                await axios.put("/users/"+user._id+"/unfollow", {userId : currentUser._id});
                dispatch({type : "UNFOLLOW", payload : user._id});
            }
            else{
                await axios.put("/users/"+user._id+"/follow", {userId : currentUser._id});
                dispatch({type : "FOLLOW", payload : user._id});
            }
            
        } catch (error) {
            console.log(error);
        }
        setFollowed(!followed);
    }
    return(
        <div className={classes.root2}>
            <Layout profile={1}/>
            <div className={classes.profilePageTop}>
                <img src={user.coverPicture ? user.coverPicture : PF+"/bee_cover.png"} alt="coverPhoto" style={{width : "100%", height : 250, objectFit : "cover"}} />
                <Avatar className={classes.avatar2} src={user.profilePicture}/>
                <div className={classes.profileHeading}>
                    <Typography variant="h5" className={classes.boldText}>{user.username}</Typography>
                    <Typography className={classes.fadedText}>{user.description}</Typography>
                </div>
            </div>

            <div className={classes.userInfo}>
                <div className={classes.userInfoBox}>
                    <Typography variant="h5" className={classes.boldText}>User Information</Typography>
                    <div className={classes.profileBtnBox}>
                            {username !== currentUser.username && (
                                <Button variant="contained" onClick={handleClick} style={{ backgroundColor: '#3778bd', color : 'white',  marginTop : 15}}>
                                    {followed ? "Unfollow" : "Follow"}
                                </Button>
                            )}
                            <Settings style={{marginLeft : 10, marginTop : 15}} fontSize="medium" />
                    </div>
                </div>
                <Typography  style={{paddingTop : 10}}><div style={{paddingRight : 10}} className={classes.fadedText}>From:</div><div style={{display:"inline",fontWeight : 350}}>{user.from}</div></Typography>
                <Typography  style={{paddingTop : 5}}><div style={{paddingRight : 10}} className={classes.fadedText}>Occupation:</div><div style={{display:"inline",fontWeight : 350}}>
                    {user.occupation}</div></Typography>
                <Typography  style={{paddingTop : 5}}><div style={{paddingRight : 10}} className={classes.fadedText}>Relationship:</div><div style={{display:"inline",fontWeight : 350}}>
                    {user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "Complicated"}
                    </div></Typography>
            </div>

            <Typography className={classes.userInfo} style={{marginTop:10}}variant="h5"><div className={classes.boldText}>Friends</div></Typography>
            <Box className={classes.friendBox}>
                {friends.map((friend)=>( 
                    <Link to={`/profile/${friend.username}`} style={{textDecoration:"none", color: "black"}}>
                    <div style={{display:"flex",flexDirection : "column", marginRight : 10}}>
                    <img src={PF+friend.profilePicture}  style={{width : 100, height : 100, borderRadius:5, objectFit:"cover"}} />
                    <Typography style={{textAlign:"left"}} className={classes.boldText}>{friend.username}</Typography>
                    </div>
                    </Link>
                ))}
            </Box>

            <Box className={classes.feedBox2}>
                {username===currentUser.username && <CreatePost/>}
                {posts.map((p)=>(
                    <Post key={p._id} post={p}/>
                ))};
            </Box>
        </div>
    );
};

export {Profile};