import * as types from './../constants/ActionTypes';
import axios from 'axios';

let initialState = {
};

let myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.REGISTER_SUCCESS:
            let { email, password } = action.user
                axios.post('http://localhost:1494/api/accounts', {
                        email: email,
                        password: password,
                    });
            return "REGISTER_SUCCESS";
        case types.REGISTER_FAILED:
            return "REGISTER_FAILED";
        case types.REGISTER_LIKE:
            return "REGISTER_LIKE";
        case types.REGISTER_PROGRESS:
            return "REGISTER_PROGRESS";
        default:
            return "DEFAULT";
    };
};
export default myReducer;