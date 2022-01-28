import {useStyles} from '../styles.js';
import { Typography, TextField, Button } from "@material-ui/core";
import {useRef} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register(){
    const classes = useStyles();
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        if(confirmPassword.current.value !== password.current.value){
            password.current.setCustomValidity("Password don't match!");
        }
        else{
            const user = {
                username : username.current.value,
                email : email.current.value,
                password : password.current.value
            };
            try {
                await axios.post("/auth/register", user);
                navigate('/login');
            } catch (error) {
                console.log(error);
            }
        }
    };

    const loginButton = () => {
        navigate('/login');
    };

    return(
        <div className={classes.root3}>
            <div className={classes.login}>
                <div className={classes.loginTitle}>
                    <Typography color="primary"  variant="h1">Bee</Typography>
                    <Typography style={{fontWeight : 200, textAlign : "left"}} variant="h5">Connect to the people and share your story.</Typography>
                </div>
                <form className={classes.loginForm} onSubmit={handleClick}>
                    <TextField style={{width:"80%", marginBottom : 15, borderRadius : 5}} id="outlined-basic" label="Username" inputRef={username} variant="outlined" required/>
                    <TextField style={{width:"80%", marginBottom : 15, borderRadius : 5}} id="outlined-basic" label="Email" type="email" inputRef={email} variant="outlined" required/>
                    <TextField style={{width:"80%", marginBottom : 15, borderRadius : 5}} id="outlined-basic" label="Password" type="password" inputRef={password} variant="outlined" inputProps={{minLength : 6 }} required/>
                    <TextField style={{width:"80%", marginBottom : 15, borderRadius : 5}} id="outlined-basic" label="Confirm Password" type="password" inputRef={confirmPassword} variant="outlined" required/>
                    <Button type="submit" variant="contained" style={{ backgroundColor: '#655afa', color : 'white', width:"80%"}}>Sign In</Button>
                    <Button variant="contained" onClick={loginButton} style={{ backgroundColor: '#4248f5', color : 'white', width:"50%", marginTop : 10}}>Log into Account</Button>
                </form>
            </div>
        </div>
    );
}

export {Register};