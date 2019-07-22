import * as types from '../constants/ActionTypes';

let initialState = "";

let myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.PRODUCT_SEARCH:
            return action.keyword;
        default:
            return state;
    };
};
export default myReducer;