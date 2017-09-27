import React, {Component} from 'react';
import ClaimForm from './ClaimForm.jsx';
import Claim from './Claim.jsx';
import {Grid, Row, Col, PageHeader, Jumbotron, Button} from 'react-bootstrap';
import $ from 'jquery';
import uuid from 'react-native-uuid';
import {HashRouter as Router, Route, Link, Redirect} from 'react-router-dom';


class AppBox extends Component {
    constructor() {
        super();

        this.state = {
            claimList: [],
            claimSubmited: false,
            isLoggedIn: false
        }

        this.addClaim = this.addClaim.bind(this);
        this.authentication = this.authentication.bind(this);
        this.updateClaim = this.updateClaim.bind(this);
    }

    render() {
        const claims = this.getClaims();
        return (
            <Router>
                <Grid>
                    <Link to="">
                        <Button>Home</Button>
                    </Link>
                    <Link to="dashboard">
                        <Button>Dashboard</Button>
                    </Link>

                    <PageHeader>Insurance Claims</PageHeader>
                    <Row className="show-grid">
                        <Route exact={true} path="/" render={() => (
                            <Col xs={12} md={8} mdOffset={2}>
                                <ClaimForm addClaim={this.addClaim}/>
                            </Col>
                        )}/>
                        {this.claimSubmited()}
                        <Route path="/claimSubmited" render={() => (
                            <Col xs={12} md={8} mdOffset={2}>
                                <Jumbotron>
                                    <h3>Your Claim has been Submited</h3>
                                    <Link to="">
                                        <p>Go back to form</p>
                                    </Link>
                                </Jumbotron>
                            </Col>
                        )}/>
                        <Route path="/dashboard" render={() => (
                            <Col xs={12} md={8} mdOffset={2}>
                                {this.state.isLoggedIn && claims || this.needAuth()}
                            </Col>
                        )}/>
                    </Row>
                </Grid>
            </Router>
        );
    }

    componentWillMount() {
        this.fetchClaims();
    }

    needAuth() {
        return (
            <Jumbotron>
                <h3>You need to be logged in to access this page</h3>
                <Button bsStyle='primary' onClick={this.authentication}>Log In</Button>
            </Jumbotron>
        )
    }

    authentication() {
        this.setState({isLoggedIn: !this.state.isLoggedIn});
    }

    claimSubmited() {
        if (this.state.claimSubmited) {
            return (
                <Redirect to='/claimSubmited'/>
            )
        }
    }

    getClaims() {
        return this.state.claimList.map((claim) => {
            return (
                <Claim
                    {...claim}
                    key={claim.id}
                    updateClaim={this.updateClaim}
                />
            )
        })
    }

    fetchClaims() {
        $.ajax({
            method: 'GET',
            url: 'api/claimList',
            success: (claimList) => {
                this.setState({claimList});
            }
        });
    }

    addClaim(claimBody) {
        let claim = claimBody;
        claim.id = uuid.v1();
        claim.status = 'new';

        $.ajax({
            method: 'POST',
            url: '/api/claimList',
            data: claim,
            success: (newComment => {
                this.setState({claimList: this.state.claimList.concat([newComment])});
                this.setState({claimSubmited: true})
            })
        })
    }

    updateClaim(id, status) {
        $.ajax({
            method: 'PATCH',
            url: `/api/claimList/${id}`,
            data: {'status': status},
            success: (() => {
                this.fetchClaims();
            })
        })
    }
}
export default AppBox;
