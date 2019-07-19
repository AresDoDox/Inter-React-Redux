import * as types from './../constants/ActionTypes';


let initialState = {
    userId: "",
    email:'',
    token: '',
};

let myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            state = {
                userId: action.data.userId,
                email: action.data.email,
                token: action.data.token,
            }
            return {...state};
        case types.LOGOUT:
            return {
                userId: "",
                email:'',
                token: '',
            }
        case types.LOGIN_PROGRESS:
            return "LOGIN_PROGRESS";
        case types.LOGIN_FAILED:
            return "LOGIN_FAILED";
        default:
            return state;
    };
};
export default myReducer;