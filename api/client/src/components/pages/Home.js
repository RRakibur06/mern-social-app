import React from 'react';
import { Box} from '@mui/system';
import {useStyles} from '../styles.js';
import {Layout} from '../layout.js';
import {Post} from '../Post.js';
import {Rightbar} from '../Rightbar.js';
//import {Posts} from '../../dummyData';
import {CreatePost} from '../createPost';
import axios from "axios";
import { useState, useEffect, useContext } from 'react';
import {AuthContext} from "../../context/AuthContext";

function Home() {
    const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get(`posts/timeline/${user._id}`);
            setPosts(
                res.data.sort((p1, p2)=>{
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
            );
        }
        fetchPosts();
    },[user._id]);
    
    return(
    <div className={classes.root}>
        <Layout/>
        <Box className={classes.feedBox}>
            <CreatePost/>
            {posts.map((p)=>(
                <Post key={p._id} post={p}/>
            ))};
        </Box>
        <Rightbar/>     
    </div>
)}

export  {Home};