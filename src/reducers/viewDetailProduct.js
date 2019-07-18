import * as types from './../constants/ActionTypes';

let initialState = {};

let myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.VIEW_DETAIL_PRODUCT:
            return action.product_id;
        default:
            return state;
    };
};
export default myReducer;