import React from 'react';
import Chart from "react-apexcharts";
import {
    Row,
    Col,
    Card,
    InputGroup,
    FormControl,
    Button,
    Table,
    Tabs,
    Tab,
    Alert
} from 'react-bootstrap';

import Aux from "../../hoc/_Aux";

import saleChart from '../../Demo/Dashboard/chart/sale-chart';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;
class Index extends React.Component {
    constructor() {
        super();
    }

    state = {
        listOpen: false,
        dataObj: '',
        isSolve: false
    };

    sweetAlertHandler = (alert) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: alert.title,
            text: alert.text,
            type: alert.type
        });
    };

    handleFormChange = (e, form, fieldName, innerFieldName) => {
        try {
                const { name, value } = e.target;
                this.setState({
                    [form]: {
                        ...this.state[form],
                        [name]: value
                    }
                    })
        }
        catch (err) {
            console.log(err);
        }
    }

    handleLoadVessel = (e) => {
        e.preventDefault();
        
        if(this.state.dataObj != ''){
            this.setState({
                listOpen: true
            });
        }
        else{
            this.sweetAlertHandler({title: 'Request Failed!', type: 'error', text: 'Please Select Vessel!'})
        }

    }

    handleSolve = (e) => {
        e.preventDefault();
        this.setState({
            isSolve: true
        });
    }

    render() {
        const { listOpen, isSolve } = this.state;
        return (
            <Aux>
                <Row>
                    <Col xl={12} className='filter-bar'>
                        <nav className="navbar m-b-10 p-10">
                            <ul className="nav">
                                <li className="nav-item f-text active">
                                    <a className="nav-link text-secondary">Load Vessel: <span className="sr-only">(current)</span></a>
                                </li>
                                <li className="nav-item f-text active">
                                    <div className="input-group">
                                        <select className="form-control add_task_todo" onChange={(e) => this.handleFormChange(e, 'dataObj')} name="vesselName" id="vesselName">
                                            <option value=''>Select Vessel Name</option>
                                            <option value='CS CALVINA'>CS CALVINA</option>
                                            <option value='CS CAPRICE'>CS CAPRICE</option>
                                            <option value='CSB BRILLIANT'>CSB BRILLIANT</option>
                                        </select>
                                        <div className="input-group-append">
                                            <button className="btn btn-primary btn-msg-send" type="button" onClick={this.handleLoadVessel}><i className="fa fa-ship" /></button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div className="nav-item nav-grid f-view" style={{ display: 'none' }}>
                                <span className="m-r-15">Configuration File: </span>
                                <button type="button" className="btn btn-primary btn-icon m-0 mr-1" data-toggle="tooltip" data-placement="top" title="File">
                                    <i className="fa fa-file-excel-o" />
                                </button>
                                <button type="button" className="btn btn-primary btn-icon m-0 mr-1" data-toggle="tooltip" data-placement="top" title="Edit">
                                    <i className="fa fa-pencil-square-o" />
                                </button>
                                <button type="button" className="btn btn-primary btn-icon m-0" data-toggle="tooltip" data-placement="top" title="View">
                                    <i className="fa fa-eye" />
                                </button>
                            </div>
                        </nav>
                    </Col>
                    <Col xl={6}>
                        <Card>
                            <Card.Body style={{ 'min-height': '462px' }}>
                                {listOpen &&
                                    <Tabs defaultActiveKey="tank" className="mb-3">
                                        <Tab eventKey="tank" title="Tank">
                                            <Table size="sm" striped hover responsive bordered className="table table-condensed" style={{ height: '238px', 'overflow-y': 'scroll', width: '100%', display: 'block' }}>
                                                <thead>
                                                    <tr>
                                                        <th>Tank Name</th>
                                                        <th>Max Volume</th>
                                                        <th>Density</th>
                                                        <th>Sounding</th>
                                                        <th>Fil</th>
                                                        <th>Weight</th>
                                                        <th>Location</th>
                                                        <th>LCG</th>
                                                        <th>TCG</th>
                                                        <th>VCG</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th>Fresh Water</th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                    </tr>
                                                    <tr>
                                                        <th>No. 1 FW Tank (P)</th>
                                                        <th>500</th>
                                                        <th>1</th>
                                                        <th></th>
                                                        <th>100</th>
                                                        <th>500</th>
                                                        <th>P</th>
                                                        <th>0</th>
                                                        <th>0</th>
                                                        <th>0</th>
                                                    </tr>
                                                    <tr>
                                                        <th>No. 1 FW Tank (S)</th>
                                                        <th>500</th>
                                                        <th>1</th>
                                                        <th></th>
                                                        <th>100</th>
                                                        <th>500</th>
                                                        <th>P</th>
                                                        <th>0</th>
                                                        <th>0</th>
                                                        <th>0</th>
                                                    </tr>
                                                    <tr>
                                                        <th>No. 2 FW Tank (P)</th>
                                                        <th>300</th>
                                                        <th>1</th>
                                                        <th></th>
                                                        <th>100</th>
                                                        <th>300</th>
                                                        <th>P</th>
                                                        <th>0</th>
                                                        <th>0</th>
                                                        <th>0</th>
                                                    </tr>
                                                    <tr>
                                                        <th>No. 2 FW Tank (S)</th>
                                                        <th>300</th>
                                                        <th>1</th>
                                                        <th></th>
                                                        <th>100</th>
                                                        <th>300</th>
                                                        <th>P</th>
                                                        <th>0</th>
                                                        <th>0</th>
                                                        <th>0</th>
                                                    </tr>
                                                    <tr>
                                                        <th>No. 3 FW Tank (P)</th>
                                                        <th>300</th>
                                                        <th>1</th>
                                                        <th></th>
                                                        <th>100</th>
                                                        <th>400</th>
                                                        <th>P</th>
                                                        <th>0</th>
                                                        <th>0</th>
                                                        <th>0</th>
                                                    </tr>
                                                    <tr>
                                                        <th>No. 3 FW Tank (S)</th>
                                                        <th>300</th>
                                                        <th>1</th>
                                                        <th></th>
                                                        <th>100</th>
                                                        <th>400</th>
                                                        <th>P</th>
                                                        <th>0</th>
                                                        <th>0</th>
                                                        <th>0</th>
                                                    </tr>

                                                    <tr>
                                                        <th>Ballast</th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                    </tr>
                                                    <tr>
                                                        <th>No. 1 Ballast Tank (P)</th>
                                                        <th>500</th>
                                                        <th>1</th>
                                                        <th></th>
                                                        <th>100</th>
                                                        <th>500</th>
                                                        <th>P</th>
                                                        <th>0</th>
                                                        <th>0</th>
                                                        <th>0</th>
                                                    </tr>
                                                    <tr>
                                                        <th>No. 1 Ballast Tank (S)</th>
                                                        <th>500</th>
                                                        <th>1</th>
                                                        <th></th>
                                                        <th>100</th>
                                                        <th>500</th>
                                                        <th>P</th>
                                                        <th>0</th>
                                                        <th>0</th>
                                                        <th>0</th>
                                                    </tr>
                                                    <tr>
                                                        <th>No. 2 Ballast Tank (P)</th>
                                                        <th>300</th>
                                                        <th>1</th>
                                                        <th></th>
                                                        <th>100</th>
                                                        <th>300</th>
                                                        <th>P</th>
                                                        <th>0</th>
                                                        <th>0</th>
                                                        <th>0</th>
                                                    </tr>
                                                    <tr>
                                                        <th>No. 2 Ballast Tank (S)</th>
                                                        <th>300</th>
                                                        <th>1</th>
                                                        <th></th>
                                                        <th>100</th>
                                                        <th>300</th>
                                                        <th>P</th>
                                                        <th>0</th>
                                                        <th>0</th>
                                                        <th>0</th>
                                                    </tr>
                                                    <tr>
                                                        <th>No. 3 Ballast Tank (P)</th>
                                                        <th>300</th>
                                                        <th>1</th>
                                                        <th></th>
                                                        <th>100</th>
                                                        <th>400</th>
                                                        <th>P</th>
                                                        <th>0</th>
                                                        <th>0</th>
                                                        <th>0</th>
                                                    </tr>
                                                    <tr>
                                                        <th>No. 3 Ballast Tank (S)</th>
                                                        <th>300</th>
                                                        <th>1</th>
                                                        <th></th>
                                                        <th>100</th>
                                                        <th>400</th>
                                                        <th>P</th>
                                                        <th>0</th>
                                                        <th>0</th>
                                                        <th>0</th>
                                                    </tr>
                                                </tbody>
                                            </Table>

                                            <h5 className='mt-3'>Loading Condtion</h5>
                                            <hr />
                                            <div className="form-group fill">
                                                <Button variant='outline-primary' size='sm' className='mr-1'>Save</Button>
                                                <Button variant='outline-secondary' size='sm' className='mr-1'>Open</Button>
                                                <Button variant='primary' size='sm' onClick={this.handleSolve}>Solve</Button>
                                            </div>
                                        </Tab>
                                        <Tab eventKey="fixedWeights" title="Fixed Weights">
                                            <Table size="sm" striped hover responsive bordered className="table table-condensed" style={{ height: '238px', 'overflow-y': 'scroll', width: '100%', display: 'block' }}>
                                                <thead>
                                                    <tr>
                                                        <th>Item Name</th>
                                                        <th>Weight</th>
                                                        <th>LCG</th>
                                                        <th>TCG</th>
                                                        <th>VCG</th>
                                                        <th>AFT Location</th>
                                                        <th>FORD Location</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th>wt1</th>
                                                        <th>1000.00</th>
                                                        <th>0.000</th>
                                                        <th>5.000</th>
                                                        <th>10.000</th>
                                                        <th>-10.000</th>
                                                        <th>10.000</th>
                                                    </tr>
                                                    <tr>
                                                        <th>wt2</th>
                                                        <th>4000.00</th>
                                                        <th>30.000</th>
                                                        <th>0.000</th>
                                                        <th>10.000</th>
                                                        <th>-10.000</th>
                                                        <th>10.000</th>
                                                    </tr>

                                                </tbody>
                                            </Table>

                                            <h5 className='mt-3'>Loading Condtion</h5>
                                            <hr />
                                            <div className="form-group fill">
                                                <Button variant='outline-primary' size='sm' className='mr-1'>Save</Button>
                                                <Button variant='outline-secondary' size='sm' className='mr-1'>Open</Button>
                                                <Button variant='primary' size='sm' className='mr-3' onClick={this.handleSolve}>Solve</Button>

                                                <Button variant='outline-secondary' size='sm' className='mr-1' style={{ float: 'right' }}>Delete Weight</Button>
                                                <Button variant='outline-secondary' size='sm' className='mr-1' style={{ float: 'right' }}>Add Weight</Button>

                                            </div>
                                        </Tab>
                                    </Tabs>
                                }
                                {!listOpen &&
                                    <Alert variant="warning" className='mb-auto'>
                                        No Data to display
                                    </Alert>
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={6}>
                        <Card style={{ 'min-height': '462px' }}>
                            {isSolve &&
                            <Card.Header>
                                <h5>GZ Graph</h5>
                            </Card.Header>
                            }
                            <Card.Body>
                                {isSolve &&
                                <>
                                <Chart {...saleChart} />
                                <Row>
                                    <Col xl={6}>
                                        <Table size="sm" striped hover responsive bordered className="table table-condensed" style={{ height: '180px', 'overflow-y': 'scroll', width: '100%', display: 'block' }}>
                                            <thead>
                                                <tr>
                                                    <th>LCG</th>
                                                    <th>TCG</th>
                                                    <th>VCG</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>0</th>
                                                    <th>0</th>
                                                    <th>0</th>
                                                </tr>
                                                <tr>
                                                    <th>0</th>
                                                    <th>0</th>
                                                    <th>0</th>
                                                </tr>
                                                <tr>
                                                    <th>0</th>
                                                    <th>0</th>
                                                    <th>0</th>
                                                </tr>
                                                <tr>
                                                    <th>0</th>
                                                    <th>0</th>
                                                    <th>0</th>
                                                </tr>
                                                <tr>
                                                    <th>0</th>
                                                    <th>0</th>
                                                    <th>0</th>
                                                </tr>
                                                <tr>
                                                    <th>0</th>
                                                    <th>0</th>
                                                    <th>0</th>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Col>
                                    <Col xl={6}>
                                        <Table size="sm" striped hover responsive bordered className="table table-condensed" style={{ height: '180px', 'overflow-y': 'scroll', width: '100%', display: 'block' }}>
                                            <thead>
                                                <tr>
                                                    <th>LCG</th>
                                                    <th>TCG</th>
                                                    <th>VCG</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>0</th>
                                                    <th>0</th>
                                                    <th>0</th>
                                                </tr>
                                                <tr>
                                                    <th>0</th>
                                                    <th>0</th>
                                                    <th>0</th>
                                                </tr>
                                                <tr>
                                                    <th>0</th>
                                                    <th>0</th>
                                                    <th>0</th>
                                                </tr>
                                                <tr>
                                                    <th>0</th>
                                                    <th>0</th>
                                                    <th>0</th>
                                                </tr>
                                                <tr>
                                                    <th>0</th>
                                                    <th>0</th>
                                                    <th>0</th>
                                                </tr>
                                                <tr>
                                                    <th>0</th>
                                                    <th>0</th>
                                                    <th>0</th>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                                </>
                                }
                                {!isSolve &&
                                    <Alert variant="warning" className='mb-auto'>
                                        No Data to display
                                    </Alert>
                                }
                            </Card.Body>
 
                        </Card>

                        {/* <Card>
                            <Card.Body>

                            </Card.Body>
                        </Card> */}
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default Index;