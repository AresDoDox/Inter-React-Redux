import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link, withRouter } from "react-router-dom";

import { connect } from 'react-redux';
import * as actions from './../../actions';

import AlertComponent from './../pure-components/alert-component'

class LoginComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            isAlertShown: false,
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.logined === ""){
            this.setState({
                isAlertShown: false
            });
        }else{
            this.setState({
                isAlertShown: true
            });
        }
        if (nextProps.logined && 
            nextProps.logined !== "" && 
            nextProps.logined !== "LOGOUT" &&
            nextProps.logined !== "LOGIN_PROGRESS" &&
            nextProps.logined !== "LOGIN_FAILED") {
            this.props.history.push("/");
        } 
    }


    onLoginClick = (email,password) => {
        this.props.onLoginUser(email,password);
    }

    render(){
        let { email, password, isAlertShown } = this.state;

        return (
                <Form>
                    <h3>ĐĂNG NHẬP</h3>
                    {isAlertShown &&
                        <AlertComponent color={'danger'} content={"Email hoặc mật khẩu không đúng!!!~"}/>
                    }
                    <FormGroup>
                        <Label for="exampleemail">Email</Label>
                        <Input type="text" name="email" 
                            id="exampleemail" 
                            placeholder="Nhập Email"
                            value={this.state.email}
                            onChange = {(event) => {
                                this.setState({
                                    email: event.target.value
                                })
                            }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Mật khẩu</Label>
                        <Input type="password" name="password" 
                            id="examplePassword" 
                            placeholder="Nhập mật khẩu" 
                            value={this.state.password}
                            onChange = {(event) => {
                                this.setState({
                                    password: event.target.value
                                })
                            }}
                        />
                    </FormGroup>
                    <Button color="primary" className="mb-2"
                        onClick={()=>this.onLoginClick(email,password)}
                    >Đăng nhập</Button>
                    <br/>
                    <Link to="/register">Đăng ký tài khoản ngay</Link>
                </Form>
        )
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
      onLoginUser: (email,password) => {
        dispatch(actions.loginUser(email,password));
      },
    };
  }
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(withRouter(LoginComponent));