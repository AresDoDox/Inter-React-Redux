import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import {
    Card, CardImg, CardBody,
    CardTitle, Button
} from 'reactstrap';
import ReactHtmlParser from 'react-html-parser';

import { connect } from 'react-redux';
import * as actions from './../../../actions';
import './product.css';

class Product extends Component {

    onViewDetail = (product_id) => {
        this.props.onViewDetail(product_id);
        this.props.history.push("/product-detail");
    }

    render() {
        let { product } = this.props;
        return (
            <Card className="mb-3">
                <CardImg top width="100%" src={`http://${product.image}`} alt={product.name} />
                <CardBody>
                    <CardTitle className="title-product">{product.name}</CardTitle>
                    <div className="description-product">
                        { ReactHtmlParser(product.description) }
                    </div>
                    <Button color="primary" onClick={() => this.onViewDetail(product._id)}>View more</Button>
                </CardBody>
            </Card>
        )
    }
}


let mapStateToProps = (state) => {
    return {
    };
};

let mapDispatchToProps = (dispatch, action) => {
    return {
        onViewDetail: (product_id) => {
            dispatch(actions.onViewDetail(product_id));
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Product));