//import combine
import { combineReducers } from 'redux';

//import các reducers
import fetchApiUser from './fetchApiUser';
import fetchApiProduct from './fetchApiProduct';
import viewDetailProduct from './viewDetailProduct';
import login from './login';
import register from './register';
import products from './products';
import search from './search';

//combine các reducers
const myReducers = combineReducers({
    // reducers
    fetchApiUser,
    fetchApiProduct,
    viewDetailProduct,
    login,
    register,
    products,
    search
});

export default myReducers;