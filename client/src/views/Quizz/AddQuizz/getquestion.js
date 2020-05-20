import axios from 'axios';
import { ADD_QUESTION } from '../../../actions/types';

export const getquestion = () => async dispatch => {
    try {
        const res = await axios.get('/Questions/questions')

        dispatch({
            type: ADD_QUESTION,
            payload: res.data
        });

    } catch (error) {
        console.log('error')
    }
}