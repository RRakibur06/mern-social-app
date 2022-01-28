import {useStyles} from '../styles.js';
import { Typography, TextField, Button, CircularProgress } from "@material-ui/core";
import {useContext, useRef} from "react";
import {loginCall} from "../../apiCalls";
import {AuthContext} from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';

function Login(){
    const classes = useStyles();
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const {isFetching, dispatch} = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault();
        loginCall(
            { email : email.current.value, password : password.current.value }, dispatch);
    };
    const registerButton = () => {
        navigate('/register');
    };

    return(
        <div className={classes.root3}>
            <div className={classes.login}>
                <div className={classes.loginTitle}>
                    <Typography color="primary"  variant="h1">Bee</Typography>
                    <Typography style={{fontWeight : 200, textAlign : "left"}} variant="h5">Connect to the people and share your story.</Typography>
                </div>
                <form className={classes.loginForm} onSubmit={handleClick}>
                    <TextField style={{width:"80%", marginBottom : 15, borderRadius : 5}} id="outlined-basic" type="email" required label="Email" variant="outlined" inputRef={email} />
                    <TextField style={{width:"80%", marginBottom : 15, borderRadius : 5}} id="outlined-basic" type="password" required inputProps={{minLength : 6 }}  label="Password" variant="outlined" inputRef={password} />
                    <Button type="submit" variant="contained" style={{ backgroundColor: '#655afa', color : 'white', width:"80%"}}>
                        { isFetching ? <CircularProgress color="white" size="24px"/> : "Log In"}
                    </Button>
                    <Typography color="primary" style={{ marginTop : 15 }} >Forgot Password?</Typography>
                    <Button variant="contained" onClick={registerButton} style={{ backgroundColor: '#3778bd', color : 'white', width:"60%", marginTop : 15}}>
                        { isFetching ? <CircularProgress color="white" size="24px"/> : "Create a new Account"}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export {Login};

