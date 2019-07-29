import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Media, CustomInput, Row, Col } from 'reactstrap';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import * as actions from './../../../actions';

import AlertComponent from './../../pure-components/alert-component';
import './product-create.css';

class ProductCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            image: '',
            description: '',
            isAlertShown: false,
            errors: '',
            colorAlert: "danger"
        }
    }

    componentWillMount() {
        if (this.props.logined === "" ||
            this.props.logined === "LOGOUT" ||
            this.props.logined === "LOGIN_PROGRESS" ||
            this.props.logined === "LOGIN_FAILED"
        ){
            this.props.history.push("/login");
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.Product.status === 'PRODUCT_FAILED'){
            this.setState({
                isAlertShown: true,
                errors: "Vui lòng điền đầy đủ thông tin!!!~"
            });
        }
        if (nextProps.Product.status === 'PRODUCT_CREATE'){
            this.setState({
                isAlertShown: true,
                errors: "Đăng bài viết thành công!!!~",
                colorAlert: "success",
                name: '',
                image: '',
                description: '',
            });
            window.scrollTo(0, 0);
        } 
    }

    onCreatePost = (name, image, description) =>{
        let poster = this.props.logined;
        this.props.onCreateProduct(name, poster, image, description);
    }

    onViewDetail = (id) =>{
        this.props.onViewDetail(id);
        this.props.history.push("/product-detail");
    }

    render() {
        let { colorAlert, isAlertShown, errors, name, image, description } = this.state;
        return (
            <Row className="d-flex justify-content-center">
                <Col xs="12" sm="12" md="12" xl="12">
            <Form className="form-create-product">
                <h3>ĐĂNG BÀI VIẾT</h3>
                {isAlertShown &&
                    <AlertComponent color={colorAlert} content={errors} />  
                }
                {(isAlertShown && colorAlert === "success")  &&
                    <Button color="primary" onClick={() => this.onViewDetail(this.props.Product.id)} className="mb-2">Xem tin ngay!</Button>
                }
                <FormGroup>
                    <Label for="namePost">Tiêu đề</Label>
                    <Input
                        type="text"
                        name="name"
                        id="namePost"
                        placeholder="Nhập tiêu đề bài viết"
                        value={this.state.name}
                        onChange={(event) => {
                            this.setState({
                                name: event.target.value
                            })
                        }}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleCustomFileBrowser">File Image</Label>
                    <CustomInput 
                        type="file" 
                        id="exampleCustomFileBrowser" 
                        name="customFile" 
                        // value={this.state.image}
                        onChange={(event) => {
                            let files = event.target.files;
                            let reader = new FileReader();
                            reader.readAsDataURL(files[0]);
                            reader.onload = (event) => {
                                this.setState({
                                    image: event.target.result
                                })
                            }
                        }}
                    />
                    <Media object src={image} height="200px" className="mt-2"/>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleText">Nội dung</Label>
                    <CKEditor
                        editor={ ClassicEditor }
                        data={this.state.description}
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            this.setState({
                                description: data
                            })
                        } }
                    />
                </FormGroup>
                <Button color="primary" className="mb-2" onClick={() => this.onCreatePost(name, image, description)}>Đăng bài viết</Button>
            </Form>
            </Col>
            </Row>
        )
    }
}


let mapStateToProps = (store) => {
    return {
        Product: store.products,
        logined: store.login,
    };
};

let mapDispatchToProps = (dispatch, action) => {
    return {
        onCreateProduct: (name, poster, image, description)=>{
            dispatch(actions.product(name, poster, image, description))
        },
        onViewDetail: (product_id) => {
            dispatch(actions.onViewDetail(product_id));
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductCreate));