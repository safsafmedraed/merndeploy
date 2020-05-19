const initialState = {
    UserClaims : [],
    SuperClaims : []
}

export default (state = initialState , action) =>{
    const { type , payload } = action;
    if(type === "LOAD_STATE") {
        return{
            ...state,
            UserClaims : payload
        }
    }
    if(type === "LOAD_STATE_SUPER") {
        return{
            ...state,
            SuperClaims : payload
        }
    }
    return state;
}