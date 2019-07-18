import * as types from './../constants/ActionTypes';

let initialState = [];

let myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.FETCH_API_PRODUCT:
            return action.products;
        default:
            return state;
    };
};
export default myReducer;