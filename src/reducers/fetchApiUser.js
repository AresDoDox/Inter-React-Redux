import * as types from './../constants/ActionTypes';

let initialState = [];

let myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.FETCH_API_USER:
            return action.users;
        default:
            return state;
    };
};
export default myReducer;