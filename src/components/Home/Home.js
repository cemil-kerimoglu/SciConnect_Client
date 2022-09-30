import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getPostsBySearch, getPosts, getPostsByAuthor } from '../../actions/posts';
import { useNavigate, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import Pagination from '../Pagination/Pagination';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}


const Home = ( { author }) => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);
    const [altTags, setAltTags] = useState([]);

    // const { state } = useLocation();
    // console.log(state)
    useEffect(() => {
      if(!searchQuery && !altTags.length && !author) dispatch(getPosts(page));
    }, [dispatch(getPosts), page, searchQuery, altTags, author]);
  

    const handleChange = (e) => {
      setSearch(e.target.value);
    }

    const searchPost = () => {
      if(search.trim() || tags.length) {
        dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
        navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
      } else {
        navigate('/');
      }
    }

    const handleKeyPress = (e) => {
      if(e.key === 'Enter') { 
        searchPost();
        setAltTags([]);
      }
    }

    const handleAdd = (tag) => {
      setTags([ ...tags, tag]);
      setAltTags([ ...tags]);
    }

    const handleDelete = (tagToDelete) => {
      setTags(tags.filter((tag) => tag !== tagToDelete));
      setAltTags(tags.filter((tag) => tag !== tagToDelete));
    }

    console.log("test home", searchQuery, altTags, author)

    return (
        <div>
            <Grow in>
                <Container maxWidth="xl">
                  <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                      <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                        <TextField 
                          name="search" 
                          variant="outlined" 
                          label="Search for data or pre-prints"
                          onKeyPress={handleKeyPress}
                          fullWidth
                          value={search}
                          onChange={handleChange} 
                        />
                        <ChipInput
                          style={{ margin: '10px 0'}}
                          value={tags}
                          onAdd={handleAdd}
                          onDelete={handleDelete}
                          onKeyPress={handleKeyPress}
                          label="Search Tags"
                          variant='outlined'
                        />
                        <Button onClick={searchPost} className={classes.searchButton} variant='contained' color="primary">Search</Button>
                      </AppBar>
                      <Form currentId={currentId} setCurrentId={setCurrentId} />
                      {(!searchQuery && !altTags.length) && (
                        <Paper elevation={6} className={classes.pagination}>
                          <Pagination page={page} />
                        </Paper>
                      )}
                    </Grid>
                  </Grid>
                </Container>
            </Grow>
        </div>
    )
}

export default Home;