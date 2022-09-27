import React, { useState, useEffect } from 'react';
import { AppBar, Avatar, Toolbar, Typography, Button, TextField } from '@material-ui/core';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getPostsByAuthor } from '../../actions/posts'; // keep this in mind
import decode from 'jwt-decode';
import useStyles from './styles';
import logo from '../../images/SciConnect_Logo.png';


const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [author, setAuthor] = useState("");

    const handleChange = (e) => {
        setAuthor(e.target.value);
      }
  
    const searchPost = () => {
      if(author.trim()) {
        dispatch(getPostsByAuthor(author));
        navigate(`/posts/search?searchAuthor=${author || 'none'}`);
      } else {
        navigate('/');
      }
    }
  
    const handleKeyPress = (e) => {
      if(e.key === 'Enter') { 
        searchPost();
      }
    }

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        if(token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

    return (
        <div>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Link to="/">
                    <img src={logo} alt="sciconnect" height="75" />
                </Link>
                    <TextField 
                        name="search" 
                        variant="outlined" 
                        label="Search for people"
                        onKeyPress={handleKeyPress}
                        size='small'
                        value={author}
                        onChange={handleChange} 
                    />
                    {user ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.profilePicture}>{user.result.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                            <Button component={Link} to="/signin" variant="contained" className={classes.logout} color="secondary" onClick={logout}>Sign Out</Button>
                        </div>
                    ) : (
                        <div>
                            <Button component={Link} to="/signin" variant="contained" color="primary">Sign In</Button>
                            &nbsp; &nbsp; &nbsp;
                            <Button component={Link} to="/signup" className={classes.green} variant="contained">Sign Up</Button>
                        </div>      
                    )}
            </AppBar>
        </div>
    );
}

export default Navbar;