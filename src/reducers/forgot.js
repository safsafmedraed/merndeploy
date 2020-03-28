import { PASS_FAIL, PASS_SEND } from '../actions/types';



const initialState = [
]
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case PASS_SEND:
            return [...state, payload];
        case PASS_FAIL:
            return state.filter(alert => alert.id !== payload);
        default:
            return state;
    }
}