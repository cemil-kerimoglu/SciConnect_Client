import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import { useNavigate, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import Pagination from '../Pagination/Pagination';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { mergeClasses } from '@material-ui/styles';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}


const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);

    useEffect(() => {
      dispatch(getPosts());
    }, [currentId, dispatch]);

    const handleChange = (e) => {
      setSearch(e.target.value);
    }

    const searchPost = () => {
      if(search.trim() || tags) {
        dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
        navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
      } else {
        navigate('/');
      }
    }

    const handleKeyPress = (e) => {
      if(e.keyCode === 13) { // 13 is the code for the enter key 
        searchPost();
      }
    }

    const handleAdd = (tag) => setTags([ ...tags, tag]);
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

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
                          label="Search Tags"
                          variant='outlined'
                        />
                        <Button onClick={searchPost} className={classes.searchButton} variant='contained' color="primary">Search</Button>
                      </AppBar>
                      <Form currentId={currentId} setCurrentId={setCurrentId} />
                      <Paper elevation={6}>
                        <Pagination />
                      </Paper>
                    </Grid>
                  </Grid>
                </Container>
            </Grow>
        </div>
    )
}

export default Home;