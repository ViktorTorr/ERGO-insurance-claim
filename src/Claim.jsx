import React, {Component} from 'react';
import {Panel, Button, Col, Clearfix} from 'react-bootstrap';
import PropTypes from 'prop-types';

class Claim extends Component {
    constructor () {
        super();

        this.updateClaim = this.updateClaim.bind(this);

        const accepted = 'accepted';
        const rejected = 'rejected';
    }
    render() {
        return (
            <Panel header={`Claim Number: ${this.props.id} - ${this.props.status}`}
                   bsStyle={this.getPanelStyle(this.props.status)}>
                <Col md={4}>
                    <p>Claim Id: </p>
                </Col>
                <Col md={8}>
                    <p><b>{this.props.id}</b></p>
                </Col>

                <Col md={4}>
                    <p>Name: </p>
                </Col>
                <Col md={8}>
                    <p><b>{this.props.name}</b></p>
                </Col>

                <Col md={4}>
                    <p>Email: </p>
                </Col>
                <Col md={8}>
                    <p><b>{this.props.email}</b></p>
                </Col>
                <Col md={4}>
                    <p>Policy id: </p>
                </Col>
                <Col md={8}>
                    <p><b>{this.props.policyId}</b></p>
                </Col>

                <Col md={4}>
                    <p>Claim type: </p>
                </Col>
                <Col md={8}>
                    <p><b>{this.props.claimType}</b></p>
                </Col>

                <Col md={4}>
                    <p>Claim Amount: </p>
                </Col>
                <Col md={8}>
                    <p><b>{this.props.claimAmount}</b></p>
                </Col>

                <Col md={4}>
                    <p>Incident date: </p>
                </Col>
                <Col md={8}>
                    <p><b>{this.props.incidentDate}</b></p>
                </Col>
                <Clearfix />
                {this._getActionButtons(this.props.status)}
            </Panel>
        );
    }

    getPanelStyle(status) {
        if (status === 'new') {
            return 'primary'
        } else if (status === 'accepted') {
            return 'success'
        } else {
            return 'danger'
        }
    }

    _getActionButtons(status) {
        if (status === 'new') {
            return (
                <div>
                    <Button bsStyle="success" onClick={() => this.updateClaim('accepted')}>Accept</Button>
                    <Button bsStyle="danger" onClick={() => this.updateClaim('rejected')}>Reject</Button>
                </div>
            )
        }
    }

    updateClaim(status) {
        this.props.updateClaim(this.props.id, status);
    }
}

Claim.propTypes = {
    name: PropTypes.string,
    email: PropTypes.string,
    policyId: PropTypes.string,
    claimType: PropTypes.string,
    claimAmount: PropTypes.string,
    incidentDate: PropTypes.string,
    updateClaim: PropTypes.func
};

export default Claim;
