import React, { Component } from 'react';
import Pagination from "react-js-pagination";
import {
    Row, Col, Button
} from 'reactstrap';
import { Link } from "react-router-dom";

import Product from './product/product-component';
import AlertComponent from './../pure-components/alert-component';

import { connect } from 'react-redux';
import "./list-product.css";

class ListProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAlertShow: false,
            activePage: 1,
            elements: this.props.products ? this.props.products.slice(0, 8) : [],
        }
    }

    checkLogined(check) {
        if (check &&
            check !== "" &&
            check !== "LOGOUT" &&
            check !== "LOGIN_PROGRESS" &&
            check !== "LOGIN_FAILED") {
            this.setState({
                isLogin: true
            });
        }
    }

    componentWillMount() {
        // Check login
        this.checkLogined(this.props.logined);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.statusProduct.status === "PRODUCT_DELETE") {
            this.setState({
                isAlertShow: true,
            });
        }
        let elements = nextProps.products;
        this.setState({
            elements: elements.slice(0, 8)
        });
        // Check login
        this.checkLogined(nextProps.logined);
    }


    handlePageChange = (pageNumber) => {
        let elements = this.props.products;
        const itemsCountPerPage = 8;
        let start = (pageNumber - 1) * itemsCountPerPage;
        let end = pageNumber * itemsCountPerPage;
        this.setState({
            activePage: pageNumber,
            elements: elements.slice(start, end)
        });
    }

    render() {
        let { products } = this.props;
        let { isAlertShow, isLogin, elements } = this.state;
        elements = elements.map((product, index) => {
            return (
                <Col xs="12" sm="4" md="3" key={index}>
                    <Product product={product} />
                </Col>
            )
        });
        return (
            <div>
                <Row className="mb-3 header-container">
                    <Col xs="12" sm="9" md="9" >
                        <h3>TẤT CẢ BÀI VIẾT</h3>
                    </Col>
                    {isLogin &&
                        <Col xs="12" sm="3" md="3" >
                            <Button color="primary" className="add-product">
                                <Link to="/product-create" style={{ color: "#fff" }}>Thêm bài viết</Link>
                            </Button>
                        </Col>
                    }
                    <Col xs="12" sm="12" md="12"><hr className="m-0"></hr></Col>
                </Row>
                <Row>
                    {isAlertShow &&
                        <Col xs="12" sm="12" md="12">
                            <AlertComponent color={"success"} content={"Xóa bài viết thành công !!!~"} />
                        </Col>
                    }
                    {elements.length === 0 &&
                        <Col xs="12" sm="12" md="12" >
                            <AlertComponent color={"danger"} content={"Không tồn tại bất kỳ bài viết nào...!!!~"} />
                        </Col>
                    }
                    {elements}
                </Row>
                {products.length > 8 &&
                    <Row>
                        <Col xs="12" sm="12" md="12">
                            <Pagination
                                hideFirstLastPages
                                pageRangeDisplayed={5}
                                activePage={this.state.activePage}
                                itemsCountPerPage={8}
                                totalItemsCount={products.length}
                                onChange={this.handlePageChange}
                            />
                        </Col>
                    </Row>
                }
            </div>
        )
    }
}

let mapStateToProps = (store) => {
    return {
        products: store.fetchApiProduct,
        statusProduct: store.products,
        logined: store.login,
    };
};

let mapDispatchToProps = (dispatch, action) => {
    return {
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ListProduct);