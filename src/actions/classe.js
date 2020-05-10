import axios from 'axios';
import { setAlert } from './alert';


import {
  ADDCLASS_SUCCESS,  ADDCLASS_FAIL,  AFFECTSTUDENT_FAIL,
  GETTEACHERS,  AFFECTSTUDENT_SUCCESS,  GETSTUDENTSNOTAFF,
  GET_CLASSES,  AFFECTTEACHER_SUCCESS,  GETSC,  UPDATE_CLASS,GETTC,MP,AffectModu,GETMOD,GETTM

} from './types';

//add class
export const addclass = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    console.log(formData)
    const res = await axios.post('http://localhost:5000/class/Add', formData, config);
    dispatch({
      type: ADDCLASS_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert('class added', 'success'));

    history.push('/Addclass');

  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg, 'warning'))
      });
    }
    dispatch({
      type: ADDCLASS_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }

    });
  }

}
//affect student
export const affectstudent =(formdata,ids ,history)=> async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.put(`http://localhost:5000/class/affect/${ids}`,formdata,config)

    dispatch({
      type: AFFECTSTUDENT_SUCCESS,
      payload:   res.data
    });
    dispatch(setAlert('student affected', 'success'));
    history.push('/AffectSC')
    window.location.reload()
  } catch (error) {
    dispatch({
      type: AFFECTSTUDENT_FAIL,
      payload: { msg: error.response.statusText, status: error.response.status }

    });
    dispatch(setAlert('Already affected ', 'danger'));

  }

}
//GET   STudents not aff
export const getstudentsnotaff = () => async dispatch => {
  try {
    const res = await axios.get('http://localhost:5000/class/notaff');
    dispatch({
      type: GETSTUDENTSNOTAFF,
      payload: res.data
    });

  } catch (error) {
    dispatch({
      type: ADDCLASS_FAIL,
      payload: { msg: error.response.statusText, status: error.response.status }

    });

  }
}
//GET All Classes
export const GETALLCLASSES = () => async dispatch => {
  try {
    const res = await axios.get('http://localhost:5000/class/Getall');
    dispatch({
      type: GET_CLASSES,
      payload: res.data
    });

  } catch (error) {
    dispatch({
      type: ADDCLASS_FAIL,
      payload: { msg: error.response.statusText, status: error.response.status }

    });

  }
}

//getuser  par class
export const getSC = classid => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:5000/class/users/${classid}`);
    dispatch({
      type: GETSC,
      payload: res.data
    });

  } catch (error) {
    dispatch({
      type: ADDCLASS_FAIL,
      payload: { msg: error.response.statusText, status: error.response.status }

    });
      }
}
//affect teacher
export const affectteacher =(formdata,history )=> async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.post(`http://localhost:5000/class/affectteacher`,formdata,config)
    dispatch({
      type: AFFECTTEACHER_SUCCESS,
      payload:   res.data
    });
    dispatch(setAlert('Teacher affected ', 'success'));

    history.push('/AffectST');


  } catch (err) {

    dispatch({
      type: AFFECTSTUDENT_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }

    });
   dispatch(setAlert('Already affected ', 'danger'));
  }

}
///get teachers
export const getteachers = () => async dispatch => {
  try {

    const res = await axios.get('http://localhost:5000/class/teacher');
    dispatch({
      type: GETTEACHERS,
      payload: res.data
    });

  } catch (error) {
    dispatch({
      type: ADDCLASS_FAIL,
      payload: { msg: error.response.statusText, status: error.response.status }

    });

  }
}
//delete student
export const deletestudent = (classid, uid,history) => async dispatch => {
  try {
    const res = await axios.delete(`http://localhost:5000/class/deletu/${classid}/${uid}`);
    dispatch({
      type: UPDATE_CLASS,
      payload: res.data
    })
    dispatch(setAlert('Student Removed', 'warning'));
    history.push('/Listclasses')
    window.location.reload()
  } catch (error) {
    dispatch({
      type: ADDCLASS_FAIL,
      payload: { msg: error.response.statusText, status: error.response.status }

    });
  }
}
///get teacher classes
export const getTC = teacherid => async dispatch => {
  try {

    const res = await axios.get(`http://localhost:5000/class/teachercl/${teacherid}`);
    dispatch({
      type: GETTC,
      payload: res.data
    });

  } catch (error) {
    dispatch({
      type: ADDCLASS_FAIL,
      payload: { msg: error.response.statusText, status: error.response.status }

    });

  }
}
export const marquerpr =(formdata,ids )=> async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.put(`http://localhost:5000/class/marquerp/${ids}`,formdata,config)

    dispatch({
      type: MP,
      payload:   res.data
    });
    dispatch(setAlert('Presence affected', 'success'));

  } catch (error) {
    dispatch({
      type: AFFECTSTUDENT_FAIL,
      payload: { msg: error.response.statusText, status: error.response.status }

    });

  }

}

//affect Modules
export const affectmodules =(formdata,idm,history )=> async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.post(`http://localhost:5000/class/affectTModule/${idm}`,formdata,config)
    dispatch({
      type: AffectModu,
      payload:   res.data
    });
    dispatch(setAlert('Teacher affected ', 'success'));

    history.push('/AffectTM');


  } catch (err) {

    dispatch({
      type: AFFECTSTUDENT_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }

    });
    dispatch(setAlert('Already affected ', 'danger'));
  }

}
//GET All modules
export const GETMODULES = () => async dispatch => {
  try {
    const res = await axios.get('http://localhost:5000/class/getmodules');
    dispatch({
      type: GETMOD,
      payload: res.data
    });

  } catch (error) {
    dispatch({
      type: ADDCLASS_FAIL,
      payload: { msg: error.response.statusText, status: error.response.status }

    });

  }
}
///get teacher modules
export const getTM = teacherid => async dispatch => {
  try {

    const res = await axios.get(`http://localhost:5000/class/teachermd/${teacherid}`);
    dispatch({
      type: GETTM,
      payload: res.data
    });

  } catch (error) {
    dispatch({
      type: ADDCLASS_FAIL,
      payload: { msg: error.response.statusText, status: error.response.status }

    });

  }
}
