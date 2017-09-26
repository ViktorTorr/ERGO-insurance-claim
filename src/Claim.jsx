import React, {Component} from 'react';
import {Panel, Button, Col, ControlLabel, Clearfix} from 'react-bootstrap';

class Claim extends Component {
    render() {
        return (
            <Panel header={`Claim Number: ${this.props.id} - ${this.props.status}`}
                   bsStyle={this._getPanelStyle(this.props.status)}>
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

    _getPanelStyle(status) {
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
                    <Button bsStyle="success" onClick={this._updateClaim.bind(this, 'accepted')}>Accept</Button>
                    <Button bsStyle="danger" onClick={this._updateClaim.bind(this, 'rejected')}>Reject</Button>
                </div>
            )
        }
    }

    _updateClaim(status) {
        this.props.updateClaim(this.props.id, status);
    }
}
export default Claim;
