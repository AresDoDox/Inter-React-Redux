import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Button } from 'reactstrap';

import { connect } from 'react-redux';
import * as actions from '../../../actions';

class ProductEdit extends Component {
    onEditProduct = (product_id) => {
        // this.props.onEditProduct(product_id);
        console.log(product_id);
    }

    render() {
        console.log(this.props.product_id);
        let {product_id} = this.props;
        return (
            <div>
                <Button onClick={()=>{this.onEditProduct(product_id)}}>Lấy id</Button>
            </div>
        )
    }
}


let mapStateToProps = (store) => {
    return {
        product_id: store.viewDetailProduct,
    };
  };
  
  let mapDispatchToProps = (dispatch, action) => {
    return {
        onEditProduct: (product_id) => {
            dispatch(actions.editProduct(product_id))
        }
    };
  }
  
  
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ProductEdit));