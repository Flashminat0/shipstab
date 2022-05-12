import React from 'react';
import { connect } from "react-redux";
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
    Alert,
    Modal,
    Form
} from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';

import Aux from "../../hoc/_Aux";

import saleChart from '../../Demo/Dashboard/chart/sale-chart';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import DataTable from 'react-data-table-component';
import isEmpty from '../../util/isEmpty';
import { getAllTankList, saveTankDetail, getAllLCList, getAllSavedTankData, updateTankDetail } from "../../store/api/loading_tank";
import { getAllVesselList } from "../../store/api/vessel";
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;
class Index extends React.Component {
    constructor() {
        super();

        this.state = {
            editingKey: '',
            form: '',
            data: [],
            vesselList: [],
            lcList: []
        }

        this.columns = [
            {
                name: 'ID',
                selector: 'ID',
                omit: true
            },
            {
                name: 'LoadingConditionID',
                selector: 'LoadingConditionID',
                omit: true
            },
            {
                name: 'Tank Name',
                selector: 'tankName',
                minWidth: '150px',
            },
            {
                name: 'Max Volume',
                selector: 'maxVolume',
                minWidth: '20px'
            },
            {
                name: 'Density',
                selector: 'density',
                maxWidth: '20px'
            },
            {
                name: 'Sounding',
                selector: 'sounding',
                maxWidth: '20px'
            },
            {
                name: 'Fil',
                selector: 'fil',
                maxWidth: '20px'
            },
            {
                name: 'Weight',
                selector: 'weight',
                minWidth: '5px',
                cell: row => {
                  return (
                    <div>
                         {row.weight != "" ? <input type='text' value={row.weight} name='weight' onChange={(e) => this.handleChange(e, 'form', row.tankName)} className='type-2' style={{ display:'block', width:'100%', margin:'0 0', padding:'5px'}}/> : ''}
                    </div>
                  )
                }
            },
            {
                name: 'Location',
                selector: 'location',
                minWidth: '5px'
            },
            {
                name: 'LCG',
                selector: 'LCG',
                Width: '20px'
            },
            {
                name: 'TCG',
                selector: 'TCG',
                maxWidth: '5px'
            },
            {
                name: 'VCG',
                selector: 'VCG',
                maxWidth: '20px'
            }
        ]
    }

    state = {
        listOpen: false,
        dataObj: '',
        isSolve: false,
        isSave: false,
        isOpen: false
    };

    componentWillReceiveProps(nextProps) {
        if (!isEmpty(nextProps.tankList)) {
            this.setState({
                data: nextProps.tankList,
            });
        }
        if (!isEmpty(nextProps.lcList)) {
            this.setState({
                lcList: nextProps.lcList,
            });
        }
        if (!isEmpty(nextProps.vesselList)) {
            this.setState({
                vesselList: nextProps.vesselList,
            });
        }
        if (!isEmpty(nextProps.recordSaveStatus)) {
            this.setState({ isSave: false })
            this.sweetAlertHandler({ title: "Saved Successfully!", text: nextProps.recordSaveStatus, type: 'success' })
        }
        if (!isEmpty(nextProps.recordUpdateStatus)) {
            this.sweetAlertHandler({ title: "Update Successfully!", text: nextProps.recordUpdateStatus, type: 'success' })
        }
    }

    componentDidMount() {
        this.props.getAllVesselList();
    }

    isEditing = (record) => {
        if (record.id === this.state.editingKey) {
          return true
        }
    }

    edit = (key) => {
        this.setState({ editingKey: key })
      }

    handleChange = (e, form, filed) => {

        
        // this.edit(filed);

        //   this.setState({
        //     [form]: {
        //       [e.target.name]: e.target.value
        //     }
        //   })

        this.state.data.find(c => c.tankName === filed).weight = e.target.value
 
        this.setState({
            data: this.state.data
        })
      }

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

            this.props.getAllTankList();

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

    handleSave = () => {
        console.log(this.state.dataObj);
        let loadingConData = {
            vesselID: this.state.dataObj.vesselName,
            loadingConditionName: this.state.dataObj.LCName,
            isActive: true,
            TankData: this.state.data
        }

        this.props.saveTankDetail(loadingConData);

    }

    handleSaveModal = () => {

        if(!isEmpty(this.state.dataObj.lcID)) {
            this.props.updateTankDetail(this.state.data);

            this.state.dataObj.lcID = ''

            this.props.getAllTankList();
        }
        else {
            this.setState({ isSave: true })
        }

    }

    handleSaveModalClose = () => {

        this.setState({ isSave: false })
    }

    handleOpenModal = () => {
        this.props.getAllLCList(this.state.dataObj.vesselName)
        this.setState({ isOpen: true })
    }

    handleOpenModalClose = () => {

        this.setState({ isOpen: false })
    }

    handleLoadSavedData = () => {
        if(this.state.dataObj != ''){

            this.props.getAllSavedTankData(this.state.dataObj.lcID);
            this.setState({ isOpen: false })
        }
        else{
            this.sweetAlertHandler({title: 'Request Failed!', type: 'error', text: 'Please Select Loading Condtion!'})
        }
    }
    render() {
        const { listOpen, isSolve, vesselList, isSave, isOpen, lcList } = this.state;

        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editing: this.isEditing(record)
                })
            }
        })

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
                                            {!isEmpty(vesselList) && vesselList.map((vessel, key) => {
                                                return <option key={key} value={vessel.ID}>{vessel.VesselName}</option>;
                                            })}
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
                            <Card.Body style={{ minHeight: '630px' }}>
                                {listOpen &&
                                    <Tabs defaultActiveKey="tank" className="mb-3">
                                        <Tab eventKey="tank" title="Tank">
                                            <DataTable
                                                noHeader
                                                responsive
                                                {...this.state}
                                                columns={columns}
                                                paginationPerPage={2}
                                                className='react-dataTable'
                                                //sortIcon={<ChevronDown size={10} />}
                                                //paginationDefaultPage={this.state.currentPage + 1}
                                                fixedHeader
                                                fixedHeaderScrollHeight="406px"
                                                data={this.state.data}
                                            />
                                            <h5 className='mt-3'>Loading Condtion</h5>
                                            <hr />
                                            <div className="form-group fill">
                                                <Button variant='outline-primary' size='sm' className='mr-1' onClick={this.handleSaveModal}>Save</Button>
                                                <Button variant='outline-secondary' size='sm' className='mr-1' onClick={this.handleOpenModal}>Open</Button>
                                                <Button variant='primary' size='sm' onClick={this.handleSolve}>Solve</Button>
                                            </div>
                                            <Modal show={isSave} onHide={this.handleSaveModalClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title as="h5">Save Loading Condtions</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Form>
                                                        <Form.Group controlId="formBasicLCName">
                                                            <Form.Label>Loading Condition Name:</Form.Label>
                                                            <Form.Control type="text" name="LCName" onChange={(e) => this.handleFormChange(e, 'dataObj')} placeholder="Enter Loading Condition Name" />
                                                        </Form.Group>
                                                    </Form>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={this.handleSaveModalClose}>Close</Button>
                                                    <Button variant="primary" onClick={this.handleSave}>Save Changes</Button>
                                                </Modal.Footer>
                                            </Modal>
                                            <Modal show={isOpen} onHide={this.handleOpenModalClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title as="h5">Open Loading Condtions</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Form>
                                                        <Form.Group controlId="formBasicLCName">
                                                            <Form.Label>Select Loading Condition:</Form.Label>
                                                            <select className="form-control add_task_todo" onChange={(e) => this.handleFormChange(e, 'dataObj')} name="lcID" id="lcID">
                                                                <option value=''>Loading Condition</option>
                                                                {!isEmpty(lcList) && lcList.map((lc, key) => {
                                                                    return <option key={key} value={lc.ID}>{lc.LoadingConditionName}</option>;
                                                                })}
                                                            </select>
                                                        </Form.Group>
                                                    </Form>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={this.handleOpenModalClose}>Close</Button>
                                                    <Button variant="primary" onClick={this.handleLoadSavedData}>Load Data</Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </Tab>
                                        <Tab eventKey="fixedWeights" title="Fixed Weights">
                                            <Table size="sm" striped hover responsive bordered className="table table-condensed" style={{ height: '406px', overflowY: 'scroll', width: '100%', display: 'block' }}>
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
                                                <Button variant='outline-primary' size='sm' className='mr-1' onClick={this.handleSave}>Save</Button>
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
                                        There are no records to display
                                    </Alert>
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={6}>
                        <Card style={{ minHeight: '630px' }}>
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
                                        <Table size="sm" striped hover responsive bordered className="table table-condensed" style={{ height: '180px', overflowY: 'scroll', width: '100%', display: 'block' }}>
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
                                        <Table size="sm" striped hover responsive bordered className="table table-condensed" style={{ height: '180px', overflowY: 'scroll', width: '100%', display: 'block' }}>
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
                                       There are no records to display
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

const mapStateToProps = state => ({
    tankList: state.tankList,
    vesselList: state.vesselList,
    recordSaveStatus: state.recordSaveStatus,
    lcList: state.lcList,
    recordUpdateStatus: state.recordUpdateStatus
});

const mapDispatchToProps = dispath => ({
    getAllTankList: (tankList) => dispath(getAllTankList(tankList)),
    getAllVesselList: (vesselList) => dispath(getAllVesselList(vesselList)),
    saveTankDetail: (loadingConData) => dispath(saveTankDetail(loadingConData)),
    getAllLCList: (lcList) => dispath(getAllLCList(lcList)),
    getAllSavedTankData: (tankList) => dispath(getAllSavedTankData(tankList)),
    updateTankDetail: (data) => dispath(updateTankDetail(data))
});

export default connect(mapStateToProps, mapDispatchToProps) (Index);