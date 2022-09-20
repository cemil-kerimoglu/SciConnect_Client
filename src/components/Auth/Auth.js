import React, { useState } from 'react';
import { Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useStyles from './styles';
import Input from './Input';
import logo from '../../images/SciConnect_Logo.png';
import { signin, signup } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    // const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowPassword = () => setShowPassword((prev) => !prev);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signin(formData, navigate))  
    }

    const handleChange = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    /*
    const switchMode = () => {
        setIsSignup((prev) => !prev);
        setShowPassword(false);
    }
    */

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <img src={logo} alt="sciconnect" height="25" />
                <Typography variant="h5"> Sign In </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} > 
                        Sign In
                    </Button>
                    <Button component={Link} to="/signup" fullWidth variant="contained" className={classes.green}>
                        	Don't have an account? Sign Up
                    </Button>          
                </form>
            </Paper>
        </Container>
    )
}

export default Auth; 