import React, {Component} from 'react';
import { 
    Row, Col
} from 'reactstrap';

import Product from './../product/product-component';

import { connect } from 'react-redux';
import './product-search.css';

class ProductSearch extends Component {

    render(){
        let { products,keyword } = this.props;
        let productsLength = 0;
        // Search Products
        if (keyword !== "") {
            products = products.filter(product => {
                return product.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 
                || product.description.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
            });
        }
        productsLength = products.length;
        let elements = products.map( (product,index) => {
            return (
                <Col xs="12" sm="4" md="3" key={index}>
                    <Product product={product}/>
                </Col>
            )   
        });
        
        return (
            <div>  
                <Row className="mb-3 search-product">
                    <Col xs="12" sm="12" md="12" className="d-flex justify-content-start align-items-end">
                        <h3>TÌM KIẾM</h3>
                    </Col>
                    <Col xs="12" sm="12" md="12"><hr className="m-0"></hr></Col>
                </Row>
                <Row>
                    <Col xs="12" sm="12" md="12" className="mb-2 message-search">
                        <p>Có {productsLength} bài viết được tìm thấy với từ khóa: "{keyword === 'DEFAULT'? '': keyword}"</p>  
                    </Col>
                    {elements}
                </Row>
            </div>
            
        )
    }
}

let mapStateToProps = (store) => {
    return {
        products: store.fetchApiProduct,
        user: store.login,
        keyword: store.search
    };
  };
  
  let mapDispatchToProps = (dispatch, action) => {
    return {
    };
  }
  
  
export default connect(mapStateToProps,mapDispatchToProps)(ProductSearch);