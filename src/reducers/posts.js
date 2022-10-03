import { FETCH_ALL, FETCH_POST, FETCH_SEARCHED, FETCH_SEARCHED_AUTHOR, CREATE, UPDATE, DELETE, LIKE, COMMENT, DELETE_COMMENT, START_LOADING, END_LOADING } from '../constants/actionTypes';

export default (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            }
        case FETCH_POST:
            return { ...state, post: action.payload };
        case FETCH_SEARCHED:
            return { ...state, posts: action.payload };
        case FETCH_SEARCHED_AUTHOR:
            return { ...state, posts: action.payload };
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        case UPDATE:
        case LIKE:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
        case COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if(post._id === action.payload._id) {
                        return action.payload;
                    }
                    return post;
                })
            };
        case DELETE_COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if(post._id === action.payload.id) {
                        post.comments.filter((comment) => comment._id !== action.payload.commentId)
                    }
                    return post;
                })
            }
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        default:
            return state;
    }
}