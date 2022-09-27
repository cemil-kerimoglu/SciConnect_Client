import * as api from '../api';
import { AUTH } from '../constants/actionTypes';

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, data });
        navigate('/');
    } catch (error) {
        console.log(error);
    }
}

export const signup = (newFormData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(newFormData);
        dispatch({ type: AUTH, data });
        navigate('/');
    } catch (error) {
        console.log(error);
    }
}