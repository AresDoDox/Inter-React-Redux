import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link, withRouter } from "react-router-dom";

import { connect } from 'react-redux';
import * as actions from './../../actions';

import AlertComponent from './../pure-components/alert-component';

class RegisterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            re_password: '',
            isAlertShown: false,
            errors: ''
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        //check logined
        if (nextProps.logined && 
            nextProps.logined !== "" && 
            nextProps.logined !== "LOGOUT" &&
            nextProps.logined !== "LOGIN_PROGRESS" &&
            nextProps.logined !== "LOGIN_FAILED") {
            this.props.history.push("/");
        } 
        // Check Register
        if (nextProps.registerStatus !== 'DEFAULT'){
            this.setState({
                isAlertShown: true,
                errors: "Vui lòng điền đầy đủ và chính xác thông tin!!!~"
            });
        } 
        if (nextProps.registerStatus === 'REGISTER_LIKE'){
            this.setState({
                isAlertShown: true,
                errors: "Email đã tồn tại!!!~"
            });
        }
        if (nextProps.registerStatus === 'REGISTER_SUCCESS'){
            this.props.history.push("/login");
        }
    }

    onRegister = (email, password, re_password) => {
        this.props.onRegisterUser(email, password, re_password);
    }

    render() {
        let { email, password, re_password, isAlertShown, errors } = this.state;
        return (
            <Form>
                <h3>ĐĂNG KÝ TÀI KHOẢN</h3>
                {isAlertShown &&
                        <AlertComponent color={'danger'} content={errors}/>
                }
                <FormGroup>
                    <Label for="exampleemail">Email</Label>
                    <Input
                        type="text"
                        name="email"
                        id="exampleemail"
                        placeholder="Nhập Email"
                        value={this.state.email}
                        onChange={(event) => {
                            this.setState({
                                email: event.target.value
                            })
                        }}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword1">Mật khẩu</Label>
                    <Input
                        type="password"
                        name="password"
                        id="examplePassword1"
                        placeholder="Nhập mật khẩu"
                        value={this.state.password}
                        onChange={(event) => {
                            this.setState({
                                password: event.target.value
                            })
                        }}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleRePassword">Nhập lại mật khẩu</Label>
                    <Input
                        type="password"
                        name="re-password"
                        id="exampleRePassword"
                        placeholder="Nhập mật khẩu"
                        value={this.state.re_password}
                        onChange={(event) => {
                            this.setState({
                                re_password: event.target.value
                            })
                        }}
                    />
                </FormGroup>
                <Button color="primary" className="mb-2" onClick={() => this.onRegister(email, password, re_password)}>Đăng ký</Button>
                <br />
                <Link to="/login">Đăng nhập!!!</Link>
            </Form>
        )
    }
}


let mapStateToProps = (store) => {
    return {
        registerStatus: store.register,
        users: store.fetchApiUser,
        logined: store.login,
    };
};

let mapDispatchToProps = (dispatch, action) => {
    return {
        onRegisterUser: (email, password, re_password) => {
            dispatch(actions.registerUser(email, password, re_password));
        },
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegisterComponent));