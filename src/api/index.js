import axios from 'axios';

// const API = axios.create({ baseURL: 'http://localhost:5000' });
// const API = axios.create({ baseURL: 'https://sciconnect-server.onrender.com' });
const API = axios.create({ baseURL: 'https://sciconnectserver.onrender.com' });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
})

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search/content?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const fetchPostsByAuthor = (searchAuthor) => API.get(`/posts/search/author?searchAuthor=${searchAuthor || 'none'}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
export const deleteComment = (id, commentId) => API.delete(`/posts/${id}/comments/${commentId}`);
export const likeComment = (id, commentId) => API.patch(`/posts/${id}/comments/${commentId}`);

export const signIn = (newFormData) => API.post('/user/signin', newFormData);
export const signUp = (newFormData) => API.post('/user/signup', newFormData);

// export const signIn = (formData) => API.post('/user/signin', formData);
// export const signUp = (formData) => API.post('/user/signup', formData);
