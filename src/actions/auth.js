import axios from 'axios';
import { setAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, CLEAR_PROFILE } from './types';
import setAuthToken from '../utlis/setAuthToken';
//load user 
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('http://localhost:5000/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}


//Register User 

export const register = ({
    username,
    email,
    password,
    phonenumber,
    Firstname,
    Lastname,
    borndate,
    bornplace,
    role
}) => async dispatch => {
    const config = {
        headers: {
            'content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({
        username,
        email,
        password,
        Firstname,
        Lastname,
        borndate,
        role,
        bornplace,
        phonenumber
    });
    console.log(body);
    try {
        const res = await axios.post('http://localhost:5000/users/register', body, config)


        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(
            loadUser()
        )

    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'warning'))
            });
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}
//login user
export const login = (
    email,
    password,
) => async dispatch => {
    const config = {
        headers: {
            'content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({
        email,
        password,
    });

    try {
        const res = await axios.post('http://localhost:5000/users/login', body, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(
            loadUser()
        )

    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'warning'))
            });

        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}
// logout /clear profile
export const logout = () => dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    });

    dispatch({
        type: LOGOUT
    });




}