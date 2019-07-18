import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Button
} from 'reactstrap';

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
                <CardImg top width="100%" src={product.image} alt={product.name} />
                <CardBody>
                    <CardTitle>{product.name}</CardTitle>
                    <CardText className="description-product">{product.description}</CardText>
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