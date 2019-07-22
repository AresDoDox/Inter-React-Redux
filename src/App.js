import React, { Component } from 'react';
import './App.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input
} from 'reactstrap';
import { Route, Link, withRouter, Switch } from "react-router-dom";

import HomeComponent from './components/home/home-component';
import LoginComponent from './components/login/login-component';
import RegisterComponent from './components/register/register-component';
import ListProduct from './components/products/list-product-component';
import ProductDetail from './components/products/product-detail/product-detail';
import ProductCreate from './components/products/product-create/product-create';
import ProductEdit from './components/products/product-edit/product-edit';
import ProductSearch from './components/products/product-search/product-search';
import NoMatchComponent from './components/pure-components/no-match/no-match-component';


import * as actions from './actions/index';

import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLogin: false,
      email: "",
      keyword: ''
    }
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  componentWillMount() {
    this.props.onFetchApiProduct();
    this.props.onfetchApiUser();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    // check Login token
    if (localStorage.getItem("token")) {
      let token = JSON.parse(localStorage.getItem("token"));
      let userToken = nextProps.users.filter(user => user.token === token);
      if (userToken[0]) {
        this.props.onLogined(userToken[0].email);
      }
    }
    if (nextProps.logined &&
      nextProps.logined !== "" &&
      nextProps.logined !== "LOGOUT" &&
      nextProps.logined !== "LOGIN_PROGRESS" &&
      nextProps.logined !== "LOGIN_FAILED") {
      this.setState({
        email: nextProps.logined,
        isLogin: true
      });
    } else {
      this.setState({
        email: "",
        isLogin: false
      });
    }

  }

  onLogoutUser = () => {
    this.props.onLogoutUser();
    this.props.history.push("/login");
  }

  onSearch = (keyword) => {
    this.props.onSearch(keyword);
    this.props.history.push("/product-search");
  }

  render() {
    let { isLogin, email, keyword } = this.state;
    return (
      <div>
        <Navbar color="light" light expand="md">
          <Link to="/" className="navbar-brand">Thái Huy</Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {!isLogin &&
              <Nav className="ml-auto" navbar>
                <NavItem className="mr-3" >
                  <Input
                    type="text"
                    name="keyword"
                    id="keyword"
                    placeholder="Nhập từ muốn tìm..."
                    value={keyword}
                    onChange={(event) => {
                      this.setState({
                        keyword: event.target.value
                      })
                    }}
                    onKeyDown={(event) => {
                      if (event.keyCode === 13) {
                        this.onSearch(keyword);
                      }
                    }
                    }
                  />
                </NavItem>
                <NavItem >
                  <Link to="/" className="nav-link">Trang chủ</Link>
                </NavItem>
                <NavItem >
                  <Link to="/products" className="nav-link">Bài viết</Link>
                </NavItem>
                <NavItem >
                  <Link to="/register" className="nav-link">Đăng ký</Link>
                </NavItem>
                <NavItem >
                  <Link to="/login" className="nav-link">Đăng nhập</Link>
                </NavItem>
              </Nav>
            }
            {isLogin &&
              <Nav className="ml-auto" navbar>
                <NavItem className="mr-3" >
                  <Input
                    type="text"
                    name="keyword"
                    id="keyword"
                    placeholder="Nhập từ muốn tìm..."
                    value={keyword}
                    onChange={(event) => {
                      this.setState({
                        keyword: event.target.value
                      })
                    }}
                    onKeyDown={(event) => {
                      if (event.keyCode === 13) {
                        this.onSearch(keyword);
                      }
                    }
                    }
                  />
                </NavItem>
                <NavItem >
                  <Link to="/" className="nav-link">Trang chủ</Link>
                </NavItem>
                <NavItem >
                  <Link to="/products" className="nav-link">Bài viết</Link>
                </NavItem>
                <UncontrolledDropdown nav inNavbar >
                  <DropdownToggle nav caret>
                    {email}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={() => this.onLogoutUser()}>
                      Đăng xuất
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            }
          </Collapse>
        </Navbar>
        <div className="px-3 py-3">
          <Switch>
            {!isLogin &&
              <Route path="/" exact component={() => <h1>Chào mừng bạn đến Website của Thái Huy!!!</h1>} />
            }
            {isLogin &&
              <Route path="/" exact component={HomeComponent} />
            }
            <Route path="/login" exact component={LoginComponent} />
            <Route path="/register" exact component={RegisterComponent} />
            <Route path="/products" exact component={ListProduct} />
            <Route path="/product-detail" exact component={ProductDetail} />
            <Route path="/product-create" exact component={ProductCreate} />
            <Route path="/product-edit" exact component={ProductEdit} />
            <Route path="/product-search" exact component={ProductSearch} />
            <Route component={NoMatchComponent} />
          </Switch>
        </div>
      </div>
    );
  }

}

let mapStateToProps = (store) => {
  return {
    users: store.fetchApiUser,
    logined: store.login,
  };
};

let mapDispatchToProps = (dispatch, action) => {
  return {
    onfetchApiUser: () => {
      dispatch(actions.fetchApiUserRequest());
    },
    onFetchApiProduct: () => {
      dispatch(actions.fetchApiProductRequest());
    },
    onLogoutUser: () => {
      dispatch(actions.logoutUser());
    },
    onSearch: (keyword) => {
      dispatch(actions.searchProduct(keyword));
    },
    onLogined: (email) => {
      dispatch(actions.loginSuccess(email));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
