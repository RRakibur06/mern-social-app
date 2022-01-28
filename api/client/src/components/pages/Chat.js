import React, { useEffect, useRef } from 'react';
import { Badge , AppBar, useTheme, Toolbar, Typography, TextField, Button, useMediaQuery} from "@material-ui/core";
import { Chat, Menu, Notifications, Person, Search, Room } from "@material-ui/icons";
import InputBase from '@mui/material/InputBase';
import { Avatar} from '@mui/material';
import { Box} from '@mui/system';
import {useStyles} from '../styles.js';
import { Link } from "react-router-dom";
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext.js';
import { Mymenu } from '../menu.js';
import Conversation from '../conversation.js';
import Message from '../message.js';
import axios from 'axios';
import { grey } from '@material-ui/core/colors';
import {io} from 'socket.io-client';
import FriendSelect from '../searchFriends.js';

export default function Chat_(){
    const classes = useStyles();
    const {user} = useContext(AuthContext);
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socket = useRef();
    const scrollRef = useRef();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down(900));
    const [open, setOpen] = useState(false);

    useEffect(()=>{
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (data)=>{
            setArrivalMessage({
                sender : data.senderId,
                text : data.text,
                createdAt : Date.now()
            });
        });
    },[]);

    useEffect(()=>{
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && 
        setMessages((prev)=> [...prev, arrivalMessage]);
    },[arrivalMessage, currentChat]);

    useEffect(()=>{
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", users=>{
            console.log(users);
        });
    },[user]);

    useEffect(()=>{
        const getConversations = async () => {
            try {
                const res = await axios.get("/conversations/" + user._id);
                setConversations(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getConversations();
    },[user._id]);

    useEffect(()=>{
        const getMessages = async () => {
            try {
                const res = await axios.get("/messages/" + currentChat?._id);
                setMessages(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getMessages();
    },[currentChat]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender : user._id,
            text : newMessage,
            conversationId : currentChat._id
        };
        const receiverId = currentChat.members.find(
            (member) => member !== user._id
        );

        socket.current.emit("sendMessage", {
            senderId : user._id,
            receiverId,
            text : newMessage
        });

        try {
            const res = await axios.post("/messages", message);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({ behaviour : "smoth" });
    },[messages]);

    return(
        <div className={classes.chatPage}>
        <AppBar position="fixed" className={classes.appbar}>
            <Toolbar>
            <Typography variant="h4" className={classes.text}>
                <Link to="/" style={{color:"white", textDecoration : "none"}}>Bee</Link>
            </Typography>
            <Box className={classes.box}>
                <Search className={classes.seacrhicon}/>
                <InputBase className={classes.input} placeholder="Search for friend, post or video"/>
            </Box>
            <Box className={classes.iconbox}>
                <Typography >Homepage</Typography>
                <Typography >Timeline</Typography>
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
                
                <Link to={`/profile/${user.username}`}>
                    <Avatar  className={classes.avatar}  src={PF+user.profilePicture}/>
                </Link>
            </Box>
            <Mymenu />
            </Toolbar>
        </AppBar>

        <div className={classes.chatContainer}> 
            {
                (!isMdDown) ? (<div className={classes.conversationContainer}>
                    <FriendSelect />
                    {conversations.map((c)=>(
                        <div onClick={()=> setCurrentChat(c)}>
                            <Conversation conversation={c} currentUser={user} message={messages} />
                        </div>
                    ))}
                </div>)
                :
                 (
                    open ? 
                    (<div className={classes.conversationContainer}>
                        <Menu onClick={()=> setOpen(!open)} style={{border : "2px solid black", width: 40, height: 40}}/>
                        <FriendSelect />
                        {conversations.map((c)=>(
                            <div onClick={()=> setCurrentChat(c)}>
                                <Conversation conversation={c} currentUser={user} message={messages} />
                            </div>
                        ))}
                    </div>) : 
                    <Menu onClick={()=> setOpen(!open)} style={{border : "2px solid black", width: 40, height: 40}} />  
                ) 
            }
            
            <div className={classes.chatBox}>
                {currentChat ? 
                <>
                <div className={classes.chatDivOverflow}>
                        {messages.map((m)=>(
                            <div ref={scrollRef}>
                                <Message message={m} own={m.sender === user._id} />
                            </div>
                        ))}
                </div>
                
                <div className={classes.chatBoxBottom}>
                    <TextField variant="outlined" multiline placeholder="Type your message" maxRows="20" rows="5" style={{width: "80%"}} onChange={(e)=> setNewMessage(e.target.value)} value={newMessage} />
                    <Button variant="contained" color="primary" onClick={handleSubmit} >Send</Button>
                </div>
                </> : <div>
                    <Typography variant="h3" style={{color: grey[400], marginTop: 50, marginLeft: 50 }} >Open a conversation to start a chat.</Typography>
                </div>}
            </div>
            
        </div>
        </div>
    )
};



