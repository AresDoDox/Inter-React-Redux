import React, {Component} from 'react';
import { 
    Row, Col, Badge
} from 'reactstrap';

import Product from './../products/product/product-component';

import { connect } from 'react-redux';

class HomeComponent extends Component {


    render(){
        let { products } = this.props;
        let elements = products.map( (product,index) => {
            return (
                <Col xs="12" sm="4" md="3" key={index}>
                    <Product product={product}/>
                </Col>
            )   
        }).slice(0,4);
        
        return (
            <div>  
                <Row className="mb-3">
                    <Col xs="12" sm="12" md="12" >
                        <h3>Bài viết mới nhất <Badge color="primary">New</Badge></h3>
                    </Col>
                    <Col xs="12" sm="12" md="12"><hr className="m-0"></hr></Col>
                </Row>
                <Row>
                    {elements}
                </Row>
            </div>
            
        )
    }
}

let mapStateToProps = (store) => {
    return {
        products: store.fetchApiProduct,
    };
  };
  
  let mapDispatchToProps = (dispatch, action) => {
    return {
    };
  }
  
  
export default connect(mapStateToProps,mapDispatchToProps)(HomeComponent);