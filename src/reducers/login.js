import * as types from './../constants/ActionTypes';


let initialState = "";

let myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return action.email;
        case types.LOGOUT:
            return "LOGOUT"
        case types.LOGIN_PROGRESS:
            return "LOGIN_PROGRESS";
        case types.LOGIN_FAILED:
            return "LOGIN_FAILED";
        default:
            return state;
    };
};
export default myReducer;