import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Media } from 'reactstrap';
import AlertComponent from './../../pure-components/alert-component';

import { connect } from 'react-redux';
import * as actions from '../../../actions';

class ProductEdit extends Component {
    constructor(props){
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
    componentWillMount(){
        let { products, product_id } = this.props;
        if (!this.props.user.token) {
            this.props.history.push("/login");
        }
        let product = products.filter( product => product._id === product_id );
        if(product[0]){
            this.setState({
                name: product[0].name,
                image: product[0].image,
                description: product[0].description,
            });
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.product.status === 'PRODUCT_FAILED'){
            this.setState({
                isAlertShown: true,
                errors: "Vui lòng điền đầy đủ thông tin!!!~"
            });
        }
        if (nextProps.product.status === 'PRODUCT_UPDATE'){
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

    onViewDetail = (id) =>{
        this.props.onViewDetail(id);
        this.props.history.push("/product-detail");
    }

    render() {
        let {product_id} = this.props;
        let { isAlertShown, colorAlert, errors, name, image, description } = this.state;
        return (
            <Form>
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
                    <Label for="exampleFile">File Image</Label>
                    <Input
                        type="file"
                        name="image"
                        id="exampleFile"
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
                    <Media object src={image} alt={name} height="200px"/>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleText">Nội dung</Label>
                    <Input
                        type="textarea"
                        name="description"
                        id="exampleText"
                        rows="8"
                        value={this.state.description}
                        onChange={(event) => {
                            this.setState({
                                description: event.target.value
                            })
                        }}
                    />
                </FormGroup>
                <Button 
                    onClick={()=>{this.onEditProduct(product_id, name, image, description)}}
                    disabled={product_id === "" ? true : false}
                >
                    Sửa bài viết
                </Button>
            </Form>
        )
    }
}


let mapStateToProps = (store) => {
    return {
        products: store.fetchApiProduct,
        product: store.products,
        product_id: store.viewDetailProduct,
        user: store.login,
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
  
  
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ProductEdit));