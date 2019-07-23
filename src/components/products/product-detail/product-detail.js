import React, { Component } from 'react';
import { Row, Col, Alert, Button } from 'reactstrap';
import { withRouter } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';

import { connect } from 'react-redux';
import * as actions from './../../../actions';
import './product-detail.css';

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false
        }
    }

    componentWillMount() {
        if (this.props.logined &&
            this.props.logined !== "" &&
            this.props.logined !== "LOGOUT" &&
            this.props.logined !== "LOGIN_PROGRESS" &&
            this.props.logined !== "LOGIN_FAILED") {
            this.setState({
                isLogin: true
            });
        }
    }

    onDeleteProduct = (product_id) => {
        this.props.onDeleteProduct(product_id);
        this.props.history.push("/products");
    }

    onEditProduct = () => {
        this.props.history.push("/product-edit");
    }

    render() {
        let { product_id, products } = this.props;
        let { isLogin } = this.state;
        let product = products.filter(product => product._id === product_id)[0];
        return (
            <Row>
                {!product &&
                    <Col xs="12" sm="12" md="12" xl="12">
                        <Alert color="danger">Bài viết không tồn tại!!!</Alert>
                    </Col>
                }
                {product &&
                    <Col xs="12" sm="12" md="12" xl="12">
                        <div className="product-detail">
                            <div className="float-left product-detail-image">
                                <img className="rounded" object src={`http://${product.image}`} alt={product.name} />
                                {isLogin &&
                                    <div className="product-detail-button">
                                        <Button className="mr-2" color="primary" onClick={() => { this.onEditProduct() }}>Sửa</Button>
                                        <Button color="primary" onClick={() => { this.onDeleteProduct(product_id) }}>Xóa</Button>
                                    </div>
                                }
                            </div>
                            <div>
                                <h3>
                                    {product.name}
                                </h3>
                                <div className="mb-4">
                                    {ReactHtmlParser(product.description)}
                                </div>
                            </div>
                        </div>
                    </Col>
                }
            </Row>
        )
    }
}


let mapStateToProps = (store) => {
    return {
        product_id: store.viewDetailProduct,
        products: store.fetchApiProduct,
        statusProduct: store.products,
        logined: store.login
    };
};

let mapDispatchToProps = (dispatch, action) => {
    return {
        onDeleteProduct: (product_id) => {
            dispatch(actions.deleteProduct(product_id))
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductDetail));