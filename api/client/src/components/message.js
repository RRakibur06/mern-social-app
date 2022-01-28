import { Avatar, Typography } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";
import { useStyles } from "./styles";
import {format} from 'timeago.js';

export default function Message({ message , own}) {
    const classes = useStyles();

    return(
        <div>
            <div className={own ? classes.messageOwnBox : classes.messageBox} >
                {!own && <Avatar />}
                <Typography className={own ? classes.messageOwn : classes.message} variant="body2" >
                {message.text}
                </Typography>
                {own && <Avatar style={{marginLeft: 10}} />}
            </div>
            <Typography className={own ? classes.ownMessageTime : classes.messageTime} variant="body2" >{format(message.createdAt)}</Typography>
        </div>
    )
};