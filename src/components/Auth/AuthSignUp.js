import React, { useState } from 'react';
import { Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useStyles from './styles';
import Input from './Input';
import logo from '../../images/SciConnect_Logo.png';
import { signup } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', profilePicture: '' }

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowPassword = () => setShowPassword((prev) => !prev);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newFormData = new FormData();
        newFormData.append('firstName', formData.firstName);
        newFormData.append('lastName', formData.lastName);
        newFormData.append('email', formData.email);
        newFormData.append('password', formData.password);
        newFormData.append('confirmPassword', formData.confirmPassword);
        newFormData.append('profilePicture', formData.profilePicture);
        dispatch(signup(newFormData, navigate)) 
    }

    const handleChange = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const uploadProfilePicture = (e) => {
        console.log(e.target.files[0])
        setFormData({ ...formData, profilePicture: e.target.files[0] });
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <img src={logo} alt="sciconnect" height="25" />
                <Typography variant="h5"> Sign Up </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                        <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
                        <Typography style={{ marginLeft: '10px'}} variant='subtitle1'>Upload Profile Picture</Typography>
                        <Input name="profilePicture" id="profilePicture" handleChange={uploadProfilePicture} type="file" />
                    </Grid>
                        <Button type="submit" fullWidth variant="contained" className={classes.submitgreen}> 
                            Sign Up
                        </Button>
                        <Button component={Link} to="/signin" fullWidth variant="contained" color="primary">
                            	Already have an account? Sign In
                        </Button>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth; 