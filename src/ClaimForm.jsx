import React, {Component} from 'react';
import {Panel, Form, FormGroup, ControlLabel, FormControl, Col, Button, Checkbox} from 'react-bootstrap';
import DateTimeField from 'react-bootstrap-datetimepicker';

class ClaimForm extends Component {
    constructor(props) {
        super(props);

        const today = this._getCurrentDate();

        this.state = {
            dateFormat: {
                date: today,
                format: "YYYY-MM-DD",
                inputFormat: "DD/MM/YYYY",
                mode: "date"
            },
            claimType: {
                lostBaggage: 'Lost Baggage',
                theft: 'Theft',
                missedFlight: 'Missed Flight',
                illness: 'Illness',
                accident: 'Accident'
            }
        };
    }

    _getCurrentDate() {
        const currentDate = new Date();
        const currentMonth = ('0' + currentDate.getMonth()).slice(-2);
        const currentDay = ('0' + currentDate.getDate()).slice(-2);
        return `${currentDate.getFullYear()}-${currentMonth}-${currentDay}`;
    }

    render() {
        const {date, format, mode, inputFormat} = this.state.dateFormat;
        const claimTypes = this.state.claimType;
        const claimList = Object.keys(claimTypes).map((keyName, index) => {
            return ( <option value={keyName}>{claimTypes[keyName]}</option> )
        });
        return (
            <Panel header="Fill out new claim form" bsStyle="success">
                <Form horizontal onSubmit={this._handleSubmit.bind(this)}>
                    <FormGroup controlId="formHorizontalName">
                        <Col componentClass={ControlLabel} sm={2}>
                            Name
                        </Col>
                        <Col sm={10}>
                            <FormControl required type="text" placeholder="Name"
                                         inputRef={(input) => this._name = input}/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2}>
                            Email
                        </Col>
                        <Col sm={10}>
                            <FormControl required type="email" placeholder="Email"
                                         inputRef={(input) => this._email = input}/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPolicyId">
                        <Col componentClass={ControlLabel} sm={2}>
                            Policy Id
                        </Col>
                        <Col sm={10}>
                            <FormControl required type="text" placeholder="Policy Id"
                                         inputRef={(input) => this._policyId = input}/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalClaimType">
                        <Col componentClass={ControlLabel} sm={2}>
                            Claim Type
                        </Col>
                        <Col sm={10}>
                            <FormControl required componentClass="select" placeholder="select"
                                         inputRef={(input) => this._claimType = input}>
                                {claimList}
                            </FormControl>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalClaimAmount">
                        <Col componentClass={ControlLabel} sm={2}>
                            Claim Amount
                        </Col>
                        <Col sm={10}>
                            <FormControl required type="number" placeholder="Claim Amount"
                                         inputRef={(input) => this._claimAmount = input}/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalDate">
                        <Col componentClass={ControlLabel} sm={2}>
                            Incident date
                        </Col>
                        <Col sm={10}>
                            <DateTimeField
                                dateTime={date}
                                format={format}
                                inputFormat={inputFormat}
                                onChange={this.handleChange}
                                viewMode={mode}
                                ref={(input) => this._incidentDate = input}
                                required
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button bsStyle="primary" type="submit">
                                Submit Claim
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Panel>
        );
    }

    _handleSubmit(event) {
        event.preventDefault();
        let claimBody = {
            name: this._name.value,
            email: this._email.value,
            policyId: this._policyId.value,
            claimType: this._claimType.value,
            claimAmount: this._claimAmount.value,
            incidentDate: this._incidentDate.refs.datetimepicker.firstChild.value
        }

        this.props.addClaim(claimBody);
    }
}
export default ClaimForm;
