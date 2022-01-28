import { Avatar, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useStyles } from "./styles";
import {format} from 'timeago.js';

export default function Conversation({conversation, currentUser, message}) {
    const classes = useStyles();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState(null);
    let length = messages?.length-1;

    useEffect(()=>{
        const friendId = conversation.members.find((m)=> m !== currentUser._id);
        const getUser = async () => {
            try {
                const res = await axios.get("/users?userId=" + friendId);
                setUser(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getUser();
    },[currentUser, conversation]);

    useEffect(()=>{
        length = messages?.length-1;
        const getMessages = async () => {
            try {
                const res = await axios.get("/messages/" + conversation._id);
                setMessages(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getMessages();
    },[currentUser, message]);

    return(
        <div className={classes.conversation}>
            <Avatar src={user && PF + user.profilePicture} />
            <div className={classes.conversationNames}>
                <Typography style={{position : "absolute", left : 10, marginTop : -20, fontSize : 15}}>{user && user.username}</Typography>
                <Typography style={{position : "absolute", right : 5, marginTop : -17, fontSize : 12}}>
                    {format(messages!=null && messages[length] ? (messages[length].createdAt) : "")}
                </Typography>
                <Typography style={{position : "absolute", left : 10, fontSize : 12, marginTop : 3}}>
                    {messages!=null && messages[length] ? (messages[length].text) : ""}
                </Typography>
            </div>
        </div>
    )
}