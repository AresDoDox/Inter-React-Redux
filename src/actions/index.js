import axios from 'axios';
import * as types from './../constants/ActionTypes';
// import md5 from 'md5';

// Get API
export const fetchApiUserRequest = () => {
    return (dispatch) => {
        return axios('http://localhost:1494/api/accounts')
            .then(res => res.data)
            .then(data => dispatch(fetchApiUser(data)))
    }
}
// Action Function
export const fetchApiUser = (users) => {
    return {
        type: types.FETCH_API_USER,
        users
    }
}

export const fetchApiProductRequest = () => {
    return (dispatch) => {
        return axios('http://localhost:1494/api/products')
            .then(res => res.data)
            .then(data => dispatch(fetchApiProduct(data)))
    }
}

export const fetchApiProduct = (products) => {
    return {
        type: types.FETCH_API_PRODUCT,
        products
    }
}

export const onViewDetail = (product_id) => {
    return {
        type: types.VIEW_DETAIL_PRODUCT,
        product_id
    }
}
//action LOGIN SUCCESS
export const loginSuccess = (email) => {
    return {
        type: types.LOGIN_SUCCESS,
        email
    }
} 
// action LOGIN
export const loginUser = (email, password) => {
    return (dispatch) => {
        // return new Promise((resolve, reject) => {
        dispatch({
            type: types.LOGIN_PROGRESS
        });
        // reject();
        axios("http://localhost:1494/api/accounts")
            .then(res => res.data)
            .then(data => {
                let user = data.filter(user => user.email === email && user.password === password);
                if (!user[0]) {
                    dispatch({
                        type: types.LOGIN_FAILED,
                    });
                    // reject();
                } else {
                    localStorage.setItem("token", JSON.stringify(user[0].token));
                    dispatch(loginSuccess(user[0].email));
                    // resolve();                               
                }
            })
            .catch((err) => {
                dispatch({
                    type: "OPERATION_FAILED"
                });
                // reject();
            });
        // });
    };
};
// action LOGOUT
export const logoutUser = () => {
    return (dispatch) => {
        localStorage.setItem("token", JSON.stringify(""));
        dispatch({
            type: types.LOGOUT
        });
    }
}
// action REGISTER
export const registerUser = (email, password, re_password) => {
    return (dispatch) => {
        dispatch({
            type: types.REGISTER_PROGRESS,
        });
        if (!email || !password || !re_password) {
            return dispatch({
                type: types.REGISTER_FAILED,
            });
        }
        if (password !== re_password) {
            return dispatch({
                type: types.REGISTER_FAILED,
            });
        }
        axios("http://localhost:1494/api/accounts")
            .then(res => res.data)
            .then(data => {
                let user = data.filter(user => user.email === email);
                if (user[0]) {
                    return dispatch({
                        type: types.REGISTER_LIKE,
                    });
                }else{
                    return dispatch({
                        type: types.REGISTER_SUCCESS,
                        user: {
                            password,
                            email
                        }
                    });
                }
            }).catch();
        // // Create Account   
        // if (password && email) {
            
        // }
    }
}

//action PRODUCT
export const product = (name, poster, image, description) => {
    return (dispatch) => {
        if (name === "" || image === "" || description === "") {
            dispatch({
                type: types.PRODUCT_FAILED,
            });
        } else {
            axios.post('http://localhost:1494/api/products', {
                name,
                poster,
                image,
                description
            }).then(
                res => {
                    let id = res.data._id;
                    axios('http://localhost:1494/api/products')
                        .then(res => res.data)
                        .then(data => {
                            dispatch(fetchApiProduct(data));
                            dispatch({
                                type: types.PRODUCT_CREATE,
                                id: id,
                            });
                        });
                }
            ).catch();
        }
    }
}

export const deleteProduct = (id) => {
    return (dispatch) => {
        axios.post('http://localhost:1494/api/products/delete', { id })
            .then(res => res.data)
            .then(data => {
                dispatch(fetchApiProduct(data));
                dispatch({
                    type: types.PRODUCT_DELETE,
                });
            }).catch();
    }
}

export const editProduct = (id, name, image, description) => {
    return (dispatch) => {
        if (name === "" || image === "" || description === "") {
            dispatch({
                type: types.PRODUCT_FAILED,
            });
        } else {
            axios.post('http://localhost:1494/api/products/edit', {
                id,
                name,
                image,
                description
            }).then(res => res.dataId)
            .then(dataId => {
                let id = dataId;
                axios('http://localhost:1494/api/products')
                    .then(res => res.data)
                    .then(data => {
                        dispatch(fetchApiProduct(data));
                        dispatch({
                            type: types.PRODUCT_UPDATE,
                            id: id,
                        });
                    });
            }).catch();
        }
    }
}

// search PRODUCT
export const searchProduct = (keyword) => {
    return {
        type: types.PRODUCT_SEARCH,
        keyword
    }
}