import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import { connect } from 'react-redux';
import * as actions from './../../../actions';

import AlertComponent from './../../pure-components/alert-component';

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
        } 
    }

    onCreatePost = (name, image, description) =>{
        this.props.onCreateProduct(name, image, description);
    }

    onViewDetail = (id) =>{
        this.props.onViewDetail(id);
        this.props.history.push("/product-detail");
    }

    render() {
        let { colorAlert, isAlertShown, errors, name, image, description } = this.state;
        return (
            <Form>
                <h3>ĐĂNG KÝ TÀI KHOẢN</h3>
                {isAlertShown &&
                    <AlertComponent color={colorAlert} content={errors} />  
                }
                {isAlertShown &&
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
                    <Label for="exampleFile">File Image</Label>
                    <Input
                        type="file"
                        name="image"
                        id="exampleFile"
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
                </FormGroup>
                <FormGroup>
                    <Label for="exampleText">Nội dung</Label>
                    <Input
                        type="textarea"
                        name="description"
                        id="exampleText"
                        value={this.state.description}
                        onChange={(event) => {
                            this.setState({
                                description: event.target.value
                            })
                        }}
                    />
                </FormGroup>
                <Button color="primary" className="mb-2" onClick={() => this.onCreatePost(name, image, description)}>Đăng tin</Button>
            </Form>
        )
    }
}


let mapStateToProps = (store) => {
    return {
        Product: store.products,
    };
};

let mapDispatchToProps = (dispatch, action) => {
    return {
        onCreateProduct: (name, image, description)=>{
            dispatch(actions.product(name, image, description))
        },
        onViewDetail: (product_id) => {
            dispatch(actions.onViewDetail(product_id));
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductCreate);