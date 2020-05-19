import {ADD_QUESTION } from "../actions/types";

const initialState = {
    questions:null
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ADD_QUESTION:
            return{
                ...state,
                questions: payload,   
        }

        default:
            return state;   
    }




}