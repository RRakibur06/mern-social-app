import { Typography, Button, Box, Avatar, InputBase,  useTheme } from "@material-ui/core";
import { PermMedia, Label, Room, EmojiEmotions  } from "@material-ui/icons";
import {useStyles} from './styles.js';
import { useContext, useRef } from "react"
import { AuthContext } from '../context/AuthContext';
import {storage} from '../firebase/config';
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import {useState} from 'react';
import axios from "axios";

function CreatePost() {
    const classes = useStyles();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user} = useContext(AuthContext);
    const desc = useRef();
    const [url, setUrl] = useState(null);
    const [progress, setProgress] = useState(0);
    const theme = useTheme();
    let image = null;

    const handleChange = (e) => {
        console.log(e.target.files[0]);
        if(e.target.files[0]){
            image = e.target.files[0];
            uploadImage(image);
        };
    };

    const uploadImage = () => {
        const storageRef = ref(storage, `/images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
                "state_changed",
                snapshot => {
                    const prog = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(prog);
                },
                error => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(storageRef)
                    .then(url => {
                        setUrl(url);
                    });
                }
        );
    };

    const submitHandler = async (e) => {
            e.preventDefault();
            setProgress(0);
            
            const newPost = {
                userId : user._id,
                description : desc.current.value,
                img : url
            }
            try {
                await axios.post("/posts", newPost);
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
    };

    return(
        <Box sx={{ boxShadow: "1px 1px 2px 2px lightgrey" }} className={classes.createpost}>
            <Avatar src={PF + user.profilePicture} sx={{ width: 56, height: 56 }}/>
            <InputBase className={classes.createpostTitle} placeholder={"What's in your mind "+user.username+"?"} inputRef={desc}/>
            <hr className={classes.horizontalline2}/>
            <form className={classes.shareoptions} onSubmit={submitHandler}>
                <label htmlFor="file" className={classes.shareoption}>
                    <PermMedia style={{ color: '#FF6347', marginRight : 3}}/>
                    <Typography>Photo or Video</Typography>
                    {progress>0 && progress<100 ? `Uploading ${progress}%` : ""}
                    <InputBase style={{display:"none"}} type="file" id="file" onChange={handleChange}/>
                </label>
                <Box className={classes.shareoption2} >
                    <Label style={{ color: 'blue'}}/>
                    <Typography>Tag</Typography>
                </Box>
                <Box className={classes.shareoption2} >
                    <Room style={{ color: 'green'}}/>
                    <Typography>Location</Typography>
                </Box>
                <Box className={classes.shareoption2} >
                    <EmojiEmotions style={{ color: '#FFD700', marginRight : 3}}/>
                    <Typography>Feelings</Typography>
                </Box>
                <Button variant="contained" type="submit" style={{ backgroundColor: 'green', color : 'white', width : 40}}>Share</Button>
            </form>        
        </Box>
    );
};

export {CreatePost};

