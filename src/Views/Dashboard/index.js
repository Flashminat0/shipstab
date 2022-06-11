import React, {Component} from 'react';
import {Row, Col, Card, Carousel, ProgressBar, Dropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import Aux from "../../hoc/_Aux";
import isEmpty from '../../util/isEmpty';
import {getWithExpiry, removeKey} from '../../util/customSessionManager';

class Index extends Component {

    state = {        
        isAdmin: false
    };

    componentDidMount() {
        const userDetails = getWithExpiry('userDetails');
        if(!isEmpty(userDetails))
        {
            if(userDetails.userRole === "Admin") {
                this.setState({
                    isAdmin: true
                })
            } 
        }
    }
    render() {
        const { isAdmin } = this.state;

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

                    {isAdmin &&
                        <Col xl={2} md={6}>
                            <Link to="/others/user">
                                <Card className='social-widget-card order-visitor-card'>
                                    <Card.Body className='bg-googleplus'>
                                        <span className="m-t-10">Manage</span>
                                        <h3 className="text-white m-0">User</h3>
                                        <i className="feather icon-user"/>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    }
                    {isAdmin &&
                        <Col xl={2} md={6}>
                            <Link to="/others/vessel">
                                <Card className='social-widget-card order-visitor-card'>
                                    <Card.Body className='bg-linkedin'>
                                        <span className="m-t-10">Manage</span>
                                        <h3 className="text-white m-0">Vessel</h3>
                                        <i className="fa fa-ship" />
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    }
                </Row>
            </Aux>
        );
    }
}

export default Index;