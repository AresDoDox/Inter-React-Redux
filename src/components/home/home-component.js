import React, { Component } from 'react';
import {
    Col,
    Button,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';
import AlertComponent from './../pure-components/alert-component';
import "./home-component.css";

import { connect } from 'react-redux';
import * as actions from './../../actions';

class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            items: this.props.products ? this.props.products.slice(0, 4) : []
        };
    }

    componentWillReceiveProps(nextProps, nextContext){
        if(nextProps.products && nextProps.products !== []){
            this.setState({
                items: nextProps.products.slice(0, 4)
            })
        }
    }

    onExiting = () => {
        this.animating = true;
    }

    onExited = () => {
        this.animating = false;
    }

    next = () => {
        let { items } = this.state;
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous = () => {
        let { items } = this.state;
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex = (newIndex) => {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }
    // End funtion slide

    //action view detail
    onViewDetail = (product_id) => {
        this.props.onViewDetail(product_id);
        this.props.history.push("/product-detail");
    }

    render() {
        const { activeIndex, items } = this.state;
        const slides = items.map((item) => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.image}
                >
                    <img src={`http://${item.image}`} alt={"title"} />
                    {/* <CarouselCaption captionText={"description"} captionHeader={"title"} /> */}
                    <CarouselCaption captionText={""} captionHeader={item.name} />
                    <Button 
                            className="view-more"
                            onClick={() => this.onViewDetail(item._id)}
                    >Xem ngay</Button>
                </CarouselItem>
            );
        });
        return (
            <div>
                {items.length === 0 &&
                    <Col xs="12" sm="12" md="12" >
                        <AlertComponent color={"danger"} content={"Không tồn tại bất kỳ bài viết nào...!!!~"} />
                    </Col>
                }
                <Carousel
                    activeIndex={activeIndex}
                    next={this.next}
                    previous={this.previous}
                    className="slideShow"
                >
                    <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                    {slides}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                </Carousel>
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
        onViewDetail: (product_id) => {
            dispatch(actions.onViewDetail(product_id));
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);