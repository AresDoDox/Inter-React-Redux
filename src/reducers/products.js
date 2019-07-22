import * as types from '../constants/ActionTypes';

let initialState = {
};

let myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.PRODUCT_CREATE:
            return {
                status: "PRODUCT_CREATE",
                id: action.id
            };
        case types.PRODUCT_UPDATE:
            return {
                status: "PRODUCT_UPDATE",
                id: action.id
            };
        case types.PRODUCT_DELETE:
            return {
                status: "PRODUCT_DELETE",
            };
        case types.PRODUCT_FAILED:
            return {
                status: "PRODUCT_FAILED"
            };
        default:
            return "DEFAULT";
    };
};
export default myReducer;