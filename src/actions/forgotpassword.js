import axios from 'axios';
import { PASS_SEND, PASS_FAIL } from './types';
import { setAlert } from './alert';


export const sendpass = (email) => async dispatch => {
    const config = {
        headers: {
            'content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({
        email,

    });
    console.log(body);
    try {
        const res = await axios.post('http://localhost:5000/forgot/forgotPassword', body, config)
        dispatch({
            type: PASS_SEND,
            payload: res.data
        })


    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'warning'))
            });
        };
        dispatch({
            type: PASS_FAIL,

        })
    }
}




