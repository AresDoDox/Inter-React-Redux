import React, { Component } from 'react';
import './App.css';

import { Route, Link, withRouter } from "react-router-dom";
import { Button } from 'reactstrap';

import LoginComponent from './components/login/login-component';
import RegisterComponent from './components/register/register-component';
import ListProduct from './components/products/list-product-component';
import ProductDetail from './components/products/product-detail/product-detail';
import ProductCreate from './components/products/product-create/product-create';
import * as actions from './actions/index';

import { connect } from 'react-redux';
// import * as actions from './actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      user: '',
    }
  }

  componentDidMount() {
    this.props.onFetchApiProduct();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.user.token) {
      this.setState({
        user: nextProps.user,
        isLogin: true
      });
    }
  }

  render() {
    let { isLogin, user } = this.state;
    return (
      // <div classNameName="App">
      //   <LoginComponent/>
      // </div>
      <div>
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
          <h5 className="my-0 mr-md-auto font-weight-normal">Thái Huy</h5>
          {isLogin === false &&
            <nav className="my-2 my-md-0 mr-md-3">
              <Link to="/" className="mr-3">Trang chủ</Link>
              <Link to="/register" className="mr-3">Đăng ký</Link>
              <Link to="/login" className="">Đăng nhập</Link>
            </nav>
          }
          {isLogin &&
            <nav className="my-2 my-md-0 mr-md-3">
              <Link to="/" className="mr-3">Trang chủ</Link>
              <Link to="/products" className="mr-3">Bài viết</Link>
              <span className="mr-3">Hi, {user.email}</span>
              <Button outline color="primary" onClick={() => {
                this.setState({
                  isLogin: false,
                  user: {
                    email: ''
                  }
                });
                this.props.history.push("/login");
              }}>Đăng xuất</Button>
            </nav>
          }
        </div>
        <div className="container">
          {isLogin === false &&
            <Route path="/" exact component={() => <h1>Chào mừng bạn đến Website của Thái Huy!!!</h1>} />
          }
          {isLogin &&
            <Route path="/" exact component={ListProduct} />
          }
          <Route path="/login" exact render={props => (<LoginComponent />)} />
          <Route path="/register" exact render={props => (<RegisterComponent />)} />
          <Route path="/products" exact component={ListProduct} />
          <Route path="/product-detail" exact component={ProductDetail} />
          <Route path="/product-create" exact component={ProductCreate} />
        </div>
      </div>
    );
  }

}

let mapStateToProps = (store) => {
  return {
    user: store.login
  };
};

let mapDispatchToProps = (dispatch, action) => {
  return {
    onFetchApiProduct: () => {
      dispatch(actions.fetchApiProductRequest());
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
