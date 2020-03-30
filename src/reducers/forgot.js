import { PASS_FAIL, PASS_SEND, RESET_OK, RESET_ERROR } from '../actions/types';



const initialState = [
]
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case PASS_SEND:
        case RESET_OK:
            return [...state, payload];
        case PASS_FAIL:
        case RESET_ERROR:
            return state.filter(alert => alert.id !== payload);
        default:
            return state;
    }
}