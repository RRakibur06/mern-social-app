import { Typography, Button, InputBase, useTheme, TextField } from "@material-ui/core";
import { PermMedia } from "@material-ui/icons";
import { useStyles } from "../styles";
import {useContext, useState, useRef} from 'react';
import {storage} from '../../firebase/config';
import {Layout} from '../layout.js';
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function Settings() {
    const classes = useStyles();
    const [url, setUrl] = useState(null);
    const [progress, setProgress] = useState(0);
    const theme = useTheme();
    let image = null;
    const {user} = useContext(AuthContext);
    const description = useRef();
    const from = useRef();
    const occupation = useRef();
    const [relationship, setRelationship] = useState(null);

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

    const submitHandlerProfile = async (e) => {
        e.preventDefault();
        setProgress(0);
        const p = {
            picture : url
        };
        console.log(p.picture);
        try {
            await axios.put("/users/profilepic/"+user._id, p);
        } catch (error) {
            console.log(error);
        }
    };

    const submitHandlerCover = async (e) => {
        e.preventDefault();
        setProgress(0);
        const p = {
            picture : url
        };
        console.log(p.picture);
        try {
            await axios.put("/users/coverpic/"+user._id, p);
        } catch (error) {
            console.log(error);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const object = {
            description : description.current.value==="" ?  user.description : description.current.value,
            from : from.current.value!=="" ? from.current.value : user.from,
            occupation : occupation.current.value!=="" ? occupation.current.value : user.occupation,
            relationship : relationship!==null ? relationship : user.relationship
        };

        try {
            await axios.put("/users/"+user._id, object);
        } catch (error) {
            console.log(error);
        }
    };
    
    return(
            <div>
            <Layout />
            <div className={classes.settings} >
                <Typography  variant="h4">Settings :</Typography>

                <Typography style={{marginTop: 20}}>1. Change or add Profile picture. </Typography>
                <form style={{width: 160, marginTop: 10}} onSubmit={submitHandlerProfile}>
                    <label htmlFor="file" className={classes.shareoption} style={{border: "2px solid orange", padding: 5, borderRadius: 5, margin: 5}}>
                        <PermMedia style={{ color: '#FF6347', marginRight : 3}}/>
                        <Typography style={{marginLeft: 5}}>Select Photo</Typography>
                        {progress>0 && progress<100 ? `Uploading ${progress}%` : ""}
                        <InputBase style={{display:"none"}} type="file" id="file" onChange={handleChange}/>
                    </label>
                    <Button variant="contained" type="submit" style={{ backgroundColor: 'green', color : 'white', width : 40, marginTop: 10, marginLeft: 8}}>SUBMIT</Button>
                </form>
                
                <Typography style={{marginTop: 20}}>2. Change or add Cover picture. </Typography>
                <form style={{width: 160, marginTop: 10}} onSubmit={submitHandlerCover}>
                    <label htmlFor="file" className={classes.shareoption} style={{border: "2px solid orange", padding: 5, borderRadius: 5, margin: 5}}>
                        <PermMedia style={{ color: '#FF6347', marginRight : 3}}/>
                        <Typography style={{marginLeft: 5}}>Select Photo</Typography>
                        {progress>0 && progress<100 ? `Uploading ${progress}%` : ""}
                        <InputBase style={{display:"none"}} type="file" id="file" onChange={handleChange}/>
                    </label>
                    <Button variant="contained" type="submit" style={{ backgroundColor: '#1d3ebf', color : 'white', width : 40, margin: 8}}>SUBMIT</Button>
                </form>

                <Typography style={{marginTop: 20}}>3. Edit User Information. </Typography>
                <form onSubmit={submitHandler} style={{display:"flex", flexDirection:"column", maxWidth:400}}>
                    <TextField style={{marginTop: 20}} id="outlined-basic" type="text"  label="Description" variant="outlined" inputRef={description} />
                    <TextField style={{marginTop: 20}} id="outlined-basic" type="text"  label="From" variant="outlined" inputRef={from} />
                    <TextField style={{marginTop: 20}} id="outlined-basic" type="text"  label="Occupation" variant="outlined" inputRef={occupation} />
                    <FormControl component="fieldset" style={{marginTop: 20}}>
                    <FormLabel component="legend">Relationship</FormLabel>
                    <RadioGroup row aria-label="gender" name="row-radio-buttons-group" onChange={(event, value)=> setRelationship(Number(event.target.value))} >
                        <FormControlLabel value={1} control={<Radio />} label="Single" />
                        <FormControlLabel value={2} control={<Radio />} label="Married" />
                        <FormControlLabel value={3} control={<Radio />} label="Complicated" />
                    </RadioGroup>
                    </FormControl>
                    <Button variant="contained" type="submit" style={{ backgroundColor: '#1d3ebf', color : 'white', width : 40, marginTop: 10}}>SUBMIT</Button>
                </form>

                
            </div>
            </div>
    )
}