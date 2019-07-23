import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Media, CustomInput, Row, Col } from 'reactstrap';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import AlertComponent from './../../pure-components/alert-component';

import { connect } from 'react-redux';
import * as actions from '../../../actions';

import './product-edit.css';

class ProductEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            image: '',
            description: '',
            isAlertShown: false,
            colorAlert: "danger",
            errors: "",
        }
    }
    componentWillMount() {
        let { products, product_id } = this.props;
        if (this.props.logined === "" ||
        this.props.logined === "LOGOUT" ||
        this.props.logined === "LOGIN_PROGRESS" ||
        this.props.logined === "LOGIN_FAILED") {
            this.props.history.push("/login");
        }
        let product = products.filter(product => product._id === product_id);
        if (product[0]) {
            this.setState({
                name: product[0].name,
                image: `http://${product[0].image}`,
                description: product[0].description,
            });
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.product.status === 'PRODUCT_FAILED') {
            this.setState({
                isAlertShown: true,
                errors: "Vui lòng điền đầy đủ thông tin!!!~"
            });
        }
        if (nextProps.product.status === 'PRODUCT_UPDATE') {
            this.setState({
                isAlertShown: true,
                errors: "Sửa bài viết thành công!!!~",
                colorAlert: "success",
            });
        }
    };

    onEditProduct = (product_id, name, image, description) => {
        this.props.onEditProduct(product_id, name, image, description);
    }

    onViewDetail = (id) => {
        this.props.onViewDetail(id);
        this.props.history.push("/product-detail");
    }

    render() {
        let { product_id } = this.props;
        let { isAlertShown, colorAlert, errors, name, image, description } = this.state;
        return (
            <Row className="d-flex justify-content-center">
                <Col xs="12" sm="12" md="12" xl="12">
            <Form className="form-edit-product">
                <h3>CHỈNH SỬA BÀI VIẾT</h3>
                {product_id === "" &&
                    <AlertComponent color={"danger"} content={"Bài viết này không tồn tại!!!~"} />
                }
                {isAlertShown &&
                    <AlertComponent color={colorAlert} content={errors} />
                }
                {(isAlertShown && colorAlert === "success") &&
                    <Button color="primary" onClick={() => this.onViewDetail(product_id)} className="mb-2">Xem tin ngay!</Button>
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
                    <Media object src={image} alt={name} height="200px" className="mt-2" />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleText">Nội dung</Label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={this.state.description}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            this.setState({
                                description: data
                            })
                        }}
                    />
                </FormGroup>
                <Button
                    onClick={() => { this.onEditProduct(product_id, name, image, description) }}
                    disabled={product_id === "" ? true : false}
                >
                    Sửa bài viết
                </Button>
            </Form>
            </Col>
            </Row>
        )
    }
}


let mapStateToProps = (store) => {
    return {
        products: store.fetchApiProduct,
        product: store.products,
        product_id: store.viewDetailProduct,
        logined: store.login,
    };
};

let mapDispatchToProps = (dispatch, action) => {
    return {
        onEditProduct: (product_id, name, image, description) => {
            dispatch(actions.editProduct(product_id, name, image, description))
        },
        onViewDetail: (product_id) => {
            dispatch(actions.onViewDetail(product_id));
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductEdit));