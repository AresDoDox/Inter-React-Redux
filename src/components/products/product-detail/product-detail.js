import React, { Component } from 'react';
import { Media, Alert, Button } from 'reactstrap';
import { withRouter } from "react-router-dom";

import { connect } from 'react-redux';
import * as actions from './../../../actions';

class ProductDetail extends Component {

    // componentWillReceiveProps(nextProps, nextContext){
    //     if(nextProps.statusProduct.status === "PRODUCT_DELETE"){
    //         this.props.history.push("/products");
    //     }
    // }

    onDeleteProduct = (product_id) => {
        this.props.onDeleteProduct(product_id);
        this.props.history.push("/products");
    }

    onEditProduct = () => {
        this.props.history.push("/product-edit");
    }

    render() {
        let {product_id, products} = this.props;
        let product = products.filter( product => product._id === product_id )[0];
        return (
            <div>
                { !product &&  
                    <Alert color="danger">The post does not exist!!!</Alert>
                }
                { product &&  
                    <Media>
                        <Media left href="#" className="mr-3">
                            <Media object src={product.image} alt={product.name} />
                        </Media>
                        <Media body>
                            <Media heading>
                                {product.name}
                            </Media>
                            <Media className="mb-4">
                                {product.description}
                            </Media>
                            <Button className="mr-2" color="danger" onClick={()=>{this.onDeleteProduct(product_id)}}>Xóa</Button>
                            <Button color="success" onClick={()=>{this.onEditProduct()}}>Sửa</Button>
                        </Media>
                    </Media>
                }
            </div>
        )
    }
}


let mapStateToProps = (store) => {
    return {
        product_id: store.viewDetailProduct,
        products: store.fetchApiProduct,
        statusProduct: store.products
    };
  };
  
  let mapDispatchToProps = (dispatch, action) => {
    return {
        onDeleteProduct: (product_id) => {
            dispatch(actions.deleteProduct(product_id))
        }
    };
  }
  
  
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ProductDetail));