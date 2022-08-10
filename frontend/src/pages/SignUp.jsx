import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useDispatch, useSelector} from 'react-redux';
import userActions from "../redux/actions/userActions";
import "../style/style.css";
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import {useNavigate} from 'react-router-dom'
import GoogleSignUp from '../components/GoogleSignUp';
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

const CssFormControl = styled(FormControl)({
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
        // console.log(event)
        event.preventDefault() //prevenimos la accion del submit
        const userData = {
			firstName: event.target[0].value,
            lastName: event.target[2].value,
            photo: event.target[4].value,
            country: country,
            email: event.target[6].value,
			password: event.target[8].value,
			from: "formSignUp"
		}
        dispatch(userActions.signUp(userData))
        // console.log(event)
    }

    var countries = ["Argentina", "Brazil", "China", "Denmark", "Egypt", "France", "Germany", "Hungary", "Italy", "Japan", "Korea", "Luxembourg", "Mexico", "New Zealand", "Russia", "Sweden", "Thailand", "United Kingdom", "Venezuela", "Another country"]
    
    const [country, setCountry] = React.useState('');

    const handleChange = (event) => {
    setCountry(event.target.value);
    };

    const navigate = useNavigate()
    const userState = useSelector(store => store.userReducer.snackbar)
    if (userState.success)
        navigate("/LogIn");

    return (
        <div className='container-log'>
    <ThemeProvider theme={theme}>
        <Grid container component="" sx={{minHeight: "76.5vh"}}>
            <CssBaseline />
            <Grid item xs={false} sm={6} md={6} sx={{
            backgroundImage: 'url(https://images5.alphacoders.com/935/thumb-1920-935189.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            }} />
            <Grid item xs={12} sm={6} md={6} component={Paper} elevation={0} square>
                <Box sx={{
                my: 0,
                mx: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                    <Avatar sx={{ m: 1, bgcolor: '#41788f' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h3" variant="h5" sx={{my: 1, textAlign:"center"}}>
                        Select your contry to continue registration
                    </Typography>
                    <CssFormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Country</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={country}
                            label="Country"
                            onChange={handleChange}
                            >
                                {countries && countries.map((country, index) =>
                                <MenuItem key={index} value={country}>{country}</MenuItem>)}
                            </Select>
                    </CssFormControl>
                    {country && 
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <Typography component="h3" variant="h6" sx={{my: 1}}>
                        Sign Up With
                    </Typography>
                    <GoogleSignUp country={country}/>
                    <Typography component="h3" variant="h6">
                        Or
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 0}}>
                        <CssTextField margin="dense" required fullWidth id="firstName" label="First Name" name="firstName"
                            autoComplete="firstName" autoFocus />
                        <CssTextField margin="dense" required fullWidth id="lastName" label="Last Name" name="lastName"
                            autoComplete="lastName" autoFocus />
                        <CssTextField margin="dense" required fullWidth id="photo" label="Photo Url" name="photo"
                            autoComplete="photo" autoFocus />
                        <CssTextField margin="dense" required fullWidth id="email" label="E-mail Address" name="email"
                            autoComplete="email" autoFocus />
                        <CssTextField margin="dense" required fullWidth name="password" label="Password" type="password"
                            id="password" autoComplete="current-password" />
                                <Button className='formBtn' type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 1, bgcolor: '#41788f'}}>
                                    Sign Up
                                </Button>
                    </Box>
                        <Grid item>
                            <LinkRouter to={"/LogIn"} className="DontHaveAnAccount">
                                {"Are you already registered? Log In"}
                            </LinkRouter>
                        </Grid>
                    <Copyright sx={{ mt: 1 }} />
                    </Box>
                    }
                </Box>
            </Grid>
        </Grid>
    </ThemeProvider>
    </div>
    );
}