import * as api from '../api';
import { FETCH_ALL, FETCH_SEARCHED, FETCH_SEARCHED_AUTHOR, START_LOADING, END_LOADING, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts(page);
        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        console.log(data);
        dispatch({ type: FETCH_SEARCHED, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
       console.log(error); 
    }
}

export const getPostsByAuthor = (searchAuthor) => async (dispatch) => {
    console.log("searched author", searchAuthor)
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchPostsByAuthor(searchAuthor);
        console.log(data);
        dispatch({ type: FETCH_SEARCHED_AUTHOR, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
       console.log(error); 
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createPost(post);
        dispatch({ type: CREATE, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, updatedPost) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, updatedPost);
        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({ type: LIKE, payload: data })
    } catch (error) {
        console.log(error);
    }
}