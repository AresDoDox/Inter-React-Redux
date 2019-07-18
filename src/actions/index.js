import axios from 'axios';
import * as types from './../constants/ActionTypes';
import randomstring from 'randomstring';
// import md5 from 'md5';

// Get API
// export const fetchApiUserRequest = () => {
//     return (dispatch) => {
//         return axios('http://localhost:1494/api/accounts')
//             .then(res => res.data)
//             .then(data => dispatch(fetchApiUser(data)))
//     }
// }
// Action Function
// export const fetchApiUser = (users) => {
//     return {
//         type: types.FETCH_API_USER,
//         users
//     }
// }

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
                    dispatch({
                        type: types.LOGIN_SUCCESS,
                        data: { userId: user[0]._id, email: email, token: randomstring.generate() }
                    });
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

// action REGISTER
export const registerUser = (email, password, re_password) => {
    return (dispatch) => {
        dispatch({
            type: types.REGISTER_PROGRESS,
        });
        if (!email || !password || !re_password) {
            dispatch({
                type: types.REGISTER_FAILED,
            });
        }
        if (password !== re_password) {
            dispatch({
                type: types.REGISTER_FAILED,
            });
        }
        axios("http://localhost:1494/api/accounts")
            .then(res => res.data)
            .then(data => {
                let user = data.filter(user => user.email === email);
                if (user[0]) {
                    dispatch({
                        type: types.REGISTER_LIKE,
                    });
                }
            }).catch();
        // Create Account   
        if (password && email){
            dispatch({
                type: types.REGISTER_SUCCESS,
                user: {
                    password,
                    email
                }
            });
        } 
    }
}

//action PRODUCT
export const product = (name,image,description) => {
    return (dispatch) => {
        if(name === "" || image === "" || description === "" ){
            dispatch({
                type: types.PRODUCT_FAILED,
            });
        }else{
            axios.post('http://localhost:1494/api/products', {
                name,
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
        axios.post('http://localhost:1494/api/products/delete', {id})
        .then(res=> res.data)
        .then(data => {
            dispatch(fetchApiProduct(data));
            dispatch({
                type: types.PRODUCT_DELETE,
            });
        }).catch();
    }
}

export const editProduct = (id) => {
    return (dispatch) => {
        axios.post('http://localhost:1494/api/products/edit', {id})
        // .then(res=> res.data)
        // .then(data => {
        //     dispatch(fetchApiProduct(data));
        //     dispatch({
        //         type: types.PRODUCT_DELETE,
        //     });
        // }).catch();
    }
}