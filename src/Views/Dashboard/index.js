import React, {Component} from 'react';
import {Row, Col, Card, Carousel, ProgressBar, Dropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import Aux from "../../hoc/_Aux";

class Index extends Component {
    render() {
        return (
            <Aux>
                <Row>
                    <Col xl={2} md={6}>
                        <Link to="/stability">
                        <Card className='social-widget-card order-visitor-card'>
                            <Card.Body className='bg-facebook'>
                                <span className="m-t-10">Vessel</span>
                                <h3 className="text-white m-0">Stability</h3>
                                <i className="feather icon-activity"/>
                            </Card.Body>
                        </Card>
                        </Link>
                    </Col>

                    <Col xl={2} md={6}>
                        <Card className='social-widget-card order-visitor-card'>
                            <Card.Body className='bg-googleplus'>
                                <span className="m-t-10">Manage</span>
                                <h3 className="text-white m-0">User</h3>
                                <i className="feather icon-user"/>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xl={2} md={6}>
                        <Card className='social-widget-card order-visitor-card'>
                            <Card.Body className='bg-linkedin'>
                                <span className="m-t-10">Manage</span>
                                <h3 className="text-white m-0">Vessel</h3>
                                <i className="fa fa-ship"/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default Index;