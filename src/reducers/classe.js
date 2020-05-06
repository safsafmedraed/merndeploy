import {
  ADDCLASS_SUCCESS,
  ADDCLASS_FAIL,
  GET_CLASSES,
  AFFECTSTUDENT_SUCCESS,
  GETSC,
  GETSTUDENTSNOTAFF, GETTEACHERS, AFFECTTEACHER_SUCCESS,UPDATE_CLASS,GETTC,MP
} from "../actions/types";

const initialState = {
  students:[],
  student:null,
  classe : null,
  classes:[],
  spc:[],
  teachers:[],
  loading: true,
  TC:[],
  error: {}

}
export default function (state = initialState, action) {

  const {type, payload} = action

  switch (type) {
    case ADDCLASS_SUCCESS:
      return {
        ...state,
        classes: [payload, ...state.classes],
        loading: false
      }
    case AFFECTSTUDENT_SUCCESS:
      return {
        ...state,
        classe :payload,
        loading: false
      }
    case MP:
      return {
        ...state,
        classe :payload,
        loading: false
      }
    case UPDATE_CLASS:
      return {
        ...state,
        classe :payload,
        loading: false
      }
    case AFFECTTEACHER_SUCCESS:
      return {
        ...state,
        classes: [payload, ...state.classes],
        loading: false
      }
    case GETSC:
      return {
        ...state,
        spc: payload,
        loading: false
      }
    case GETTC:
      return {
        ...state,
        TC: payload,
        loading: false
      }

    case GET_CLASSES:
      return {
        ...state,
        classes: payload,
        loading: false
      }

    case GETSTUDENTSNOTAFF:
      return {
        ...state,
        students: payload,
        loading: false
      }
    case GETTEACHERS:
      return {
        ...state,
        teachers: payload,
        loading: false
      }
    case ADDCLASS_FAIL:
      return {
        ...state,
        error: payload,
        loading: false
      }
    default:
      return state;


  }

}
