import React, {Component} from 'react';
import { Alert } from 'reactstrap';

class NoMatchComponent extends Component {
    render(){
        return (
            <Alert color="danger">
                Liên kết bạn truy cập có thể bị hỏng hoặc trang có thể đã bị gỡ.
            </Alert>
        );
    }
}

export default NoMatchComponent;