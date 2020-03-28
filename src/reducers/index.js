import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth'
import claims from './claims'
export default combineReducers({
    alert, auth , claims 
});