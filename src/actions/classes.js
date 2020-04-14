import axios from 'axios';

import {setAlert} from "./alert";




//add Class
export const addclass = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.post('http://localhost:5000/class/Add', formData, config);
    dispatch({
      payload: res.data
    });
    dispatch(setAlert('class Added', 'success'));

    history.push('/classes');

  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg, 'warning'))
      });
    }
    dispatch({
      payload: { msg: error.response.statusText, status: error.response.status }

    });
  }

}
//get all classes
export const getallclasses = () => async dispatch => {
  dispatch({  });
  try {
    const res = await axios.get('http://localhost:5000/class/Getall');
    dispatch({
      payload: res.data
    });

  } catch (error) {
    dispatch({
      payload: { msg: error.response.statusText, status: error.response.status }

    });

  }
}
