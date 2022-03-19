import React, {useState} from "react"
import { Avatar, Button,Paper,Grid,Typography,Container } from "@material-ui/core";
import Icon from "./Icon"
import {useDispatch} from 'react-redux'
import {GoogleLogin} from 'react-google-login'
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined'
import useStyles from "./styles"
import {useNavigate} from 'react-router-dom'
import Input from "./input";
import {signin,signup} from '../../actions/auth';


const initialFormState = {firstName:"",lastName:"",email:"",password:"",confirmPassword:"",}

const Auth = () =>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setformData] = useState(initialFormState)
    const [isSignup, setisSignUp] = useState(false);
    const navigate = useNavigate();
    
    const handleSubmit = (form) =>{
        form.preventDefault()
        if(isSignup){
            dispatch(signup(formData,navigate))
        } else {
            dispatch(signin(formData,navigate)) 
        }
    }
    const handleChange = (e) =>{
        setformData({...formData, [e.target.name]:e.target.value})
    }
    const switchMode = ()=> {
        setisSignUp((prevIsSignUp)=> !prevIsSignUp)
        // handleShowPassword(false)
    }
    const googleSuccess = async (res) =>{
        //?. optional chaining oprator that wont throw an error if the res object doesnt exist
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({type:'AUTH', data:{ result , token}})
            //redirect to home
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }
    const googleFailure = (error) =>{
        console.log("google SignIn was unsuccessful. Try again Later, Error:",error)
    }


    const handleShowPassword = () => setShowPassword((prevShowPassword)=>!prevShowPassword)
    
    return (
    <div>
        <Container component = "main" maxWidth="xs">
            <Paper className= {classes.paper}>
                <Avatar className={classes.avatar}>
                   <LockOutlinedIcon/>
                </Avatar>
                <Typography variant = "h5">{isSignup? 'Sign Up': 'Sign In'}</Typography>
                <form className = {classes.form} onSubmit = {handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup &&(
                                <>
                                    <Input name ="firstName" label = "First Name" handleChange={handleChange} autoFocus half/>
                                    <Input name ="lastName" label = "Last Name" handleChange={handleChange}  half/>
                                </>
                        )}
                        <Input name = "email" label = "Email Address" handleChange={handleChange} type = "email"/>
                        <Input name = "password" label="Password" handleChange = {handleChange} type = {showPassword? "text":"password"} handleShowPassword={handleShowPassword}/>
                        {isSignup&& <Input name ="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
                    </Grid>
                    <Button className={classes.submit} type ="submit" fullWidth variant="contained" color="primary">
                        {isSignup? "Sign Up": "Sign In"}
                    </Button>
                    <GoogleLogin
                        clientId="1084119087341-ubgvu88eaf9fib2fi68tedrdc7f1gm0h.apps.googleusercontent.com"
                        render={(renderProps) =>(
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant="contained">
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup? "Already have an account? Sign In": "Don't Have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    </div>
    )
}

export default Auth;