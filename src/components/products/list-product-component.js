import React, {Component} from 'react';
import { 
    Row, Col, Button
} from 'reactstrap';
import { Link } from "react-router-dom";

import Product from './product/product-component';
import AlertComponent from './../pure-components/alert-component'

import { connect } from 'react-redux';

class ListProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            isAlertShow: false,
        }
    }
    componentWillReceiveProps(nextProps, nextContext){
        if(nextProps.statusProduct.status === "PRODUCT_DELETE"){
            this.setState({
                isAlertShow: true
            });
        }
    }

    render(){
        let { products } = this.props;
        let { isAlertShow } = this.state;
        let elements = products.reverse().map( (product,index) => {
            return (
                <Col xs="12" sm="4" md="3" key={index}>
                    <Product product={product}/>
                </Col>
            )   
        });
        
        return (
            <div>  
                <Row className="mb-3">
                    <Col xs="8" sm="9" md="9" >
                        <h3>Tất cả bài viết</h3>
                    </Col>
                    <Col xs="4" sm="3" md="3" >
                        <Button color="primary" style={{float: "right"}}>
                            <Link to="/product-create" style={{color: "#fff"}}>Thêm bài viết</Link>
                        </Button>
                    </Col>
                </Row>
                <Row>
                    {isAlertShow && 
                        <Col xs="12" sm="12" md="12">
                            <AlertComponent color={"success"} content={"Xóa bài viết thành công !!!~"} />
                        </Col>
                    }
                    {elements}
                </Row>
            </div>
            
        )
    }
}

let mapStateToProps = (store) => {
    return {
        products: store.fetchApiProduct,
        statusProduct: store.products
    };
  };
  
  let mapDispatchToProps = (dispatch, action) => {
    return {
    };
  }
  
  
export default connect(mapStateToProps,mapDispatchToProps)(ListProduct);