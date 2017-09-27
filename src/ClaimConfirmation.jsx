import React, {Component} from 'react';
import {Jumbotron} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class ClaimConfirmation extends Component {
    render() {
        return (
            <Jumbotron>
                <h3>Your Claim has been Submited</h3>
                <Link to="">
                    <p>Go back to form</p>
                </Link>
            </Jumbotron>
        )
    }

    componentWillUnmount() {
        this.props.clearClaimSubmit();
    }
}
export default ClaimConfirmation;