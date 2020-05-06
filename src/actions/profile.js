import axios from 'axios';
import { setAlert } from './alert';


import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, CLEAR_PROFILE, DELETE_ACCOUNT, GET_PROFILES } from './types';


//get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }

        });

    }
}
//get all Profiles
export const getAllProfile = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    try {
        const res = await axios.get('http://localhost:5000/profile/');
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }

        });

    }
}
//get profile by ID
export const getProfilebyID = userId => async dispatch => {

    try {
        const res = await axios.get(`http://localhost:5000/profile/user/${userId}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }

        });

    }
}
//create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('http://localhost:5000/profile/', formData, config);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        dispatch(setAlert(edit ? 'Profile updated' : 'Profile Created', 'success'));
        if (!edit) {
            history.push('/dashboard');
        }
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'warning'))
            });
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }

        });
    }
}

//edit account
export const editaccount = (formData, history, edit = false) => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('http://localhost:5000/users/update', formData, config);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        dispatch(setAlert(edit ? 'Profile updated' : 'Profile Created', 'success'));
        if (!edit) {
            history.push('/dashboard');
        }
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'warning'))
            });
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }

        });
    }
}


//get current users Account
export const getCurrentAccount = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/users/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }

        });

    }
}

//ADD Education 
export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('http://localhost:5000/profile/education', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Education Added', 'success'));

        history.push('/users');

    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'warning'))
            });
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }

        });
    }

}
//Delete Education
export const deleteEducation = id => async dispatch => {

    if (window.confirm('Are you sure? this can not be undone')) {
        try {
            const res = await axios.delete(`http://localhost:5000/profile/education/${id}`);
            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data
            })
            dispatch(setAlert('Education Removed', 'warning'));
        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: error.response.statusText, status: error.response.status }

            });
        }

        try {
            const res = await axios.delete(`http://localhost:5000/profile/education/${id}`);
            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data
            })
            dispatch(setAlert('Education Removed', 'warning'));
        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: error.response.statusText, status: error.response.status }

            });

        }
    }
    //Delete Account & profile
    export const deleteAccount = () => async dispatch => {
        if (window.confirm('Are you sure? this can not be undone')) {
            try {
                await axios.delete(`http://localhost:5000/profile/`);
                dispatch({
                    type: CLEAR_PROFILE,
                })
                dispatch({
                    type: DELETE_ACCOUNT,
                })
                dispatch(setAlert('Your Acccount has been permanantly deleted Removed'));
            } catch (error) {
                dispatch({
                    type: PROFILE_ERROR,
                    payload: { msg: error.response.statusText, status: error.response.status }

                });
            }
        }
    }
}
