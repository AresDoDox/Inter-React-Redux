import React, {Component} from 'react';
import { Alert } from 'reactstrap';

class AlertComponent extends Component {
    render(){
        let {color,content} = this.props
        // color[ primary, success, danger, warning]
        return (
            <Alert color={color}>
                {content}
            </Alert>
        );
    }
}

export default AlertComponent;