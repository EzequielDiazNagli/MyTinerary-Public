import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useDispatch, useSelector} from 'react-redux';
import userActions from "../redux/actions/userActions";
import {useNavigate} from 'react-router-dom'
import "../style/style.css";
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import GoogleLogIn from '../components/GoogleLogIn';
import {Link as LinkRouter} from "react-router-dom"

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
    color: '#1f766c',
    },
    '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
    '& fieldset': {
    borderColor: 'grey',
    },
    '&:hover fieldset': {
    borderColor: 'dark',
    },
    '&.Mui-focused fieldset': {
    borderColor: '#1f766c',
    },
    },
});

function Copyright(props) {
    return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <LinkRouter color="inherit" to={"/"} className="copyRight">
        My Tinerary
        </LinkRouter>{' '}
        {new Date().getFullYear()}
        {'.'}
    </Typography>
    );
    }

    const theme = createTheme();

    export default function SignInSide() {

        const dispatch = useDispatch()
        
        const handleSubmit = (event) => {
            event.preventDefault() //prevenimos la accion del submit
            const userLogin = {
                email: event.target[0].value,
                password: event.target[2].value,
                from: "formSignUp"
            }
            dispatch(userActions.logIn(userLogin))
            // console.log(userLogin)
        }

        const navigate = useNavigate()

        const userState = useSelector(store => store.userReducer.snackbar)
        if (userState.success)
            navigate("/");

    return (
        <div className='container-log'>
                <ThemeProvider theme={theme} >
                    <Grid container component="" sx={{minHeight: "76.5vh"}}>
                        <CssBaseline />
                        <Grid item xs={false} sm={6} md={6} sx={{
                            // backgroundImage: 'url(https://source.unsplash.com/random)'
                            backgroundImage: 'url(https://images5.alphacoders.com/935/thumb-1920-935189.jpg)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            }} />
                        <Grid item xs={12} sm={6} md={6} component={Paper} elevation={0} square>
                            <Box sx={{
                                my: 8,
                                mx: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                }}>
                                <Avatar sx={{ m: 1, bgcolor: '#41788f' }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h3" variant="h5" sx={{ mb: 1}}>
                                    Log In With
                                </Typography>
                                <GoogleLogIn/>
                                <Typography component="h3" variant="h6" sx={{ mt: 1}}>
                                    Or
                                </Typography>
                                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 0 }}>
                                    <CssTextField margin="normal" required fullWidth id="email" label="Email Address"
                                        name="email" autoComplete="email" autoFocus />
                                    <CssTextField margin="normal" required fullWidth name="password" label="Password"
                                        type="password" id="password" autoComplete="current-password" />
                                    <FormControlLabel control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                    />
                                    <Button className='formBtn' type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, bgcolor: '#41788f'}}>
                                        Log In
                                    </Button>
                                    <Grid container>
                                        <Grid item xs>
                                            <Link className="DontHaveAnAccount">
                                            Forgot password?
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <LinkRouter to={"/SignUp"} className="DontHaveAnAccount">
                                                {"Don't have an account? Sign Up"}
                                            </LinkRouter>
                                        </Grid>
                                    </Grid>
                                    <Copyright sx={{ mt: 5 }} />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </ThemeProvider>
        </div>
    );
}