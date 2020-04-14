import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import forgot from './forgot';
import profile from "./profile";


export default combineReducers({
    alert, auth, forgot, profile
});