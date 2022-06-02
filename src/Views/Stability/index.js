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
import { getAllTankList, saveTankDetail, getAllLCList, getAllSavedTankData, updateTankDetail, deleteLCDetail, lcCopyAndCreate, getAllWeightList } from "../../store/api/loading_tank";
import { getAllVesselList } from "../../store/api/vessel";
import { getAllFWList, getAllSavedFWData, deleteFWDetail} from "../../store/api/fixed_weight";
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
            fixedWeightsData: [],
            vesselList: [],
            lcList: [],
            loadingConName: 'New Loading Condition'
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
                minWidth: '5px'
            },
            {
                name: 'Sounding',
                selector: 'sounding',
                minWidth: '5px'
            },
            {
                name: 'Fil',
                selector: 'fil',
                minWidth: '5px',
                cell: row => {
                  return (
                    <div>
                         {row.fil != "" ? <input type='text' value={row.fil} name='fil' onChange={(e) => this.handleChange(e, 'form', row.tankName, row.maxVolume)} className='type-2' style={{ display:'block', width:'100%', margin:'0 0', padding:'5px'}}/> : ''}
                    </div>
                  )
                }
            },
            {
                name: 'Weight',
                selector: 'weight',
                minWidth: '5px',
                cell: row => {
                  return (
                    <div>
                         {row.weight != "" ? <input type='text' disabled={true} value={row.weight} name='weight' onChange={(e) => this.handleChange(e, 'form', row.tankName, row.maxVolume)} className='type-2' style={{ display:'block', width:'100%', margin:'0 0', padding:'5px'}}/> : ''}
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
                minWidth: '5px'
            },
            {
                name: 'TCG',
                selector: 'TCG',
                minWidth: '5px'
            },
            {
                name: 'VCG',
                selector: 'VCG',
                minWidth: '5px'
            }
        ]

        this.columnsFW = [
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
                name: 'Item Name',
                selector: 'itemName',
                minWidth: '120px',
                cell: row => {
                  return (
                    <div>
                         <input type='text' value={row.itemName} name='itemName' onChange={(e) => this.handleFWChange(e, 'form', row.ID)} className='type-2' style={{ display:'block', width:'100%', margin:'0 0', padding:'5px'}}/>
                    </div>
                  )
                }
            },
            {
                name: 'Weight',
                selector: 'weight',
                minWidth: '35px',
                cell: row => {
                  return (
                    <div>
                         <input type='text' value={row.weight} name='weight' onChange={(e) => this.handleFWChange(e, 'form', row.ID)} className='type-2' style={{ display:'block', width:'100%', margin:'0 0', padding:'5px'}}/>
                    </div>
                  )
                }
            },
            {
                name: 'LCG',
                selector: 'LCG',
                minWidth: '5px',
                cell: row => {
                  return (
                    <div>
                         <input type='text' value={row.LCG} name='LCG' onChange={(e) => this.handleFWChange(e, 'form', row.ID)} className='type-2' style={{ display:'block', width:'100%', margin:'0 0', padding:'5px'}}/>
                    </div>
                  )
                }
            },
            {
                name: 'TCG',
                selector: 'TCG',
                minWidth: '5px',
                cell: row => {
                  return (
                    <div>
                         <input type='text' value={row.TCG} name='TCG' onChange={(e) => this.handleFWChange(e, 'form', row.ID)} className='type-2' style={{ display:'block', width:'100%', margin:'0 0', padding:'5px'}}/>
                    </div>
                  )
                }
            },
            {
                name: 'VCG',
                selector: 'VCG',
                minWidth: '5px',
                cell: row => {
                  return (
                    <div>
                         <input type='text' value={row.VCG} name='VCG' onChange={(e) => this.handleFWChange(e, 'form', row.ID)} className='type-2' style={{ display:'block', width:'100%', margin:'0 0', padding:'5px'}}/>
                    </div>
                  )
                }
            },
            {
                name: 'AFT Location',
                selector: 'AFTLocation',
                minWidth: '5px',
                cell: row => {
                  return (
                    <div>
                         <input type='text' value={row.AFTLocation} name='AFTLocation' onChange={(e) => this.handleFWChange(e, 'form', row.ID)} className='type-2' style={{ display:'block', width:'100%', margin:'0 0', padding:'5px'}}/>
                    </div>
                  )
                }
            },
            {
                name: 'FORD Location',
                selector: 'fordLocation',
                minWidth: '5px',
                cell: row => {
                  return (
                    <div>
                         <input type='text' value={row.fordLocation} name='fordLocation' onChange={(e) => this.handleFWChange(e, 'form', row.ID)} className='type-2' style={{ display:'block', width:'100%', margin:'0 0', padding:'5px'}}/>
                    </div>
                  )
                }
            },
            {
                name: 'Action',
                minWidth: '5px',
                cell: row => {
                  return (
                    <Button className='btn btn-sm btn-danger' outline onClick={() => this.deleteRow(row.ID)}>
                        <i className="fa fa-trash" />
                    </Button>
                  )
                }
            }
        ]

        this.columnsLC = [
            {
                name: 'ID',
                selector: 'ID',
                omit: true
            },
            {
                maxWidth: '5px',
                cell: row => {
                  return (
                      <>
                        <Button className='btn btn-sm btn-primary mr-1' outline onClick={() => this.copyLC(row.ID)}>
                            <i className="fa fa-copy" />
                        </Button>
                        <Button className='btn btn-sm btn-danger' outline onClick={(e) => this.deleteLCRow(e, row.ID)}>
                            <i className="fa fa-trash" />
                        </Button>
                      </>
                    
                  )
                }
            },
            {
                selector: 'LoadingConditionName',
                cell: row => {
                    return (
                        <>
                          <div onClick={() => this.handleLoadSavedData(row.ID)}>
                              {row.LoadingConditionName}
                          </div>
                        </>
                      
                    )
                },
                conditionalCellStyles: [
                    {
                        when: row => row.LoadingConditionName != null,
                        classNames: ['cell-3-undefined']
                    }
                ]
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
        if (!isEmpty(nextProps.fwList)) {
            this.setState({
                fixedWeightsData: nextProps.fwList,
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
        if (!isEmpty(nextProps.recordCopyStatus)) { 
            
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

    copyLC = (key) => {
        this.setState({ isOpen: false })

        const MySwal = withReactContent(Swal);
        MySwal.fire({
            text: 'Enter New Loading Condition Name:',
            input: 'text',
        }).then((result) => {
            if (result.value) {
                const data = {
                    ID: key,
                    loadingConditionName: result.value
                }

                this.props.lcCopyAndCreate(data);
            } else {
                return MySwal.fire('Invalid!', 'Please Enter Loading Condition Name', 'error');
            }
        }).finally(() => {
            Swal.fire({
                title: 'Please Wait..!',
                html: 'New Loading Condition Creating...',
                timer: 1500,
                timerProgressBar: true,
                onBeforeOpen: () => {
                    Swal.showLoading()
                },
                onClose: () => {
                    //this.sweetAlertHandler({ title: "Successfully!", text: nextProps.recordCopyStatus, type: 'success' })
                    this.handleOpenModal(); 
                }
                }).then((result) => {
            
                })
        });
    }
    
    deleteLCRow = (e, key) => {
        this.setState({ isOpen: false })
        const MySwal = withReactContent(Swal);

        MySwal.fire({
            title: 'Are you sure?',
            text: 'Once deleted, you will not be able to recover this Loading Condition file!',
            type: 'warning',
            showCloseButton: true,
            showCancelButton: true
        }).then((willDelete) => {
            if (willDelete.value) {
                let deleteObj = this.state.lcList.find(c => c.ID === key)

                const data = {
                    ID: key
                };

                this.props.deleteLCDetail(data);

                var index = this.state.lcList.indexOf(deleteObj);

                if (index > -1) { 
                    this.state.lcList.splice(index, 1);
                }

                this.setState({
                    lcList: this.state.lcList
                })
            } else {
                return MySwal.fire('', 'Your Loading Condition file is safe!', 'error');
            }
        }).finally(() => {
            this.setState({ isOpen: true })
        });

        
    }
    
    deleteRow = (key) => {

        let deleteObj = this.state.fixedWeightsData.find(c => c.ID === key)

        const data = {
            ID: key
        }
        if(!isNaN(key)){
            this.props.deleteFWDetail(data);
        }

        var index = this.state.fixedWeightsData.indexOf(deleteObj);

        if (index > -1) { 
            this.state.fixedWeightsData.splice(index, 1);
        }

        this.setState({
            fixedWeightsData: this.state.fixedWeightsData
        })
    }

    handleChange = (e, form, filed, maxVol) => {

        this.state.data.find(c => c.tankName === filed).fil = e.target.value
        this.state.data.find(c => c.tankName === filed).weight = (maxVol * e.target.value / 100).toString();
 
        this.setState({
            data: this.state.data
        })
    }

    handleFWChange = (e, form, filed) => {
        if (e.target.name == 'itemName'){
            this.state.fixedWeightsData.find(c => c.ID === filed).itemName = e.target.value
        } else if (e.target.name == 'weight') {
            this.state.fixedWeightsData.find(c => c.ID === filed).weight = e.target.value
        } else if (e.target.name == 'LCG') {
            this.state.fixedWeightsData.find(c => c.ID === filed).LCG = e.target.value
        } else if (e.target.name == 'TCG') {
            this.state.fixedWeightsData.find(c => c.ID === filed).TCG = e.target.value
        } else if (e.target.name == 'VCG') {
            this.state.fixedWeightsData.find(c => c.ID === filed).VCG = e.target.value
        } else if (e.target.name == 'AFTLocation') {
            this.state.fixedWeightsData.find(c => c.ID === filed).AFTLocation = e.target.value
        } else if (e.target.name == 'fordLocation') {
            this.state.fixedWeightsData.find(c => c.ID === filed).fordLocation = e.target.value
        }

        this.setState({
            fixedWeightsData: this.state.fixedWeightsData
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

            this.props.getAllTankList(this.state.dataObj.vesselName);
            this.props.getAllWeightList(this.state.dataObj.vesselName);
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

        this.state.fixedWeightsData.forEach(element => {
            delete element.ID
        });

        let loadingConData = {
            vesselID: this.state.dataObj.vesselName,
            loadingConditionName: this.state.dataObj.LCName,
            isActive: true,
            tankData: this.state.data,
            weightData: this.state.fixedWeightsData
        }

        this.props.saveTankDetail(loadingConData);
        this.props.getAllTankList(this.state.dataObj.vesselName);
        this.props.getAllWeightList(this.state.dataObj.vesselName);
    }

    handleSaveModal = () => {

        if(!isEmpty(this.state.dataObj.lcID)) {

            this.state.fixedWeightsData.forEach(element => {
                const ID = element.ID;
                
                if(isNaN(ID)){
                    delete element.ID
                }
            });
            let loadingConData = {
                ID: this.state.dataObj.lcID,
                isActive: true,
                TankData: this.state.data,
                weightData: this.state.fixedWeightsData
            }

            this.props.updateTankDetail(loadingConData);

            this.state.dataObj.lcID = ''
            this.setState({ loadingConName: 'New Loading Condition'})
            this.props.getAllTankList();
            this.setState({ fixedWeightsData: [] })
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

    handleLoadSavedData = (id) => {

        this.state.dataObj.lcID = id

        if(this.state.dataObj != ''){
            this.props.getAllSavedTankData(this.state.dataObj.lcID);
            this.props.getAllSavedFWData(this.state.dataObj.lcID);           
            this.setState({ loadingConName: this.state.lcList.find(c => c.ID === parseInt(this.state.dataObj.lcID)).LoadingConditionName })
            this.setState({ isOpen: false })
        }
        else{
            this.sweetAlertHandler({title: 'Request Failed!', type: 'error', text: 'Please Select Loading Condtion!'})
        }
    }

    handleAddRow = () => {
        this.props.getAllFWList(this.state.fixedWeightsData)
    }

    render() {
        const { listOpen, isSolve, vesselList, isSave, isOpen, lcList, loadingConName, defaultTab } = this.state;

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

        const columnsFW = this.columnsFW.map(col => {
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

        const columnsLC = this.columnsLC.map(col => {
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
                                    <>
                                    <Tabs defaultActiveKey="tank" className="mb-3" onSelect={this.handleSelect}>
                                        <Tab eventKey="tank" title="Tank" style={{minHeight: '390px'}}>
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
                                           
                                        </Tab>
                                        <Tab eventKey="fixedWeights" title="Fixed Weights" style={{minHeight: '390px'}}>
                                            <Button variant='outline-primary' size='sm' className='mr-1' onClick={this.handleAddRow}>Add Fixed Weight</Button>
                                            <DataTable
                                                noHeader
                                                responsive
                                                {...this.state}
                                                columns={columnsFW}
                                                paginationPerPage={2}
                                                className='react-dataTable'
                                                //paginationDefaultPage={this.state.currentPage + 1}
                                                fixedHeader
                                                fixedHeaderScrollHeight="406px"
                                                data={this.state.fixedWeightsData}
                                            />
                                        </Tab>
                                    </Tabs>
                                     <h5 className='mt-3'>Loading Condtion - {loadingConName}</h5>
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

                                                     <DataTable
                                                        noHeader
                                                        responsive
                                                        {...this.state}
                                                        columns={columnsLC}
                                                        paginationPerPage={2}
                                                        className='react-dataTable'
                                                        //paginationDefaultPage={this.state.currentPage + 1}
                                                        fixedHeader
                                                        fixedHeaderScrollHeight="300px"
                                                        data={lcList}
                                                    />

                                                     {/* <select className="form-control add_task_todo" onChange={(e) => this.handleFormChange(e, 'dataObj')} name="lcID" id="lcID">
                                                         <option value=''>Loading Condition</option>
                                                         {!isEmpty(lcList) && lcList.map((lc, key) => {
                                                             return <option key={key} value={lc.ID}>{lc.LoadingConditionName}</option>;
                                                         })}
                                                     </select> */}
                                                 </Form.Group>
                                             </Form>
                                         </Modal.Body>
                                         <Modal.Footer>
                                             <Button variant="secondary" onClick={this.handleOpenModalClose}>Close</Button>
                                             {/* <Button variant="primary" onClick={this.handleLoadSavedData}>Load Data</Button> */}
                                         </Modal.Footer>
                                     </Modal>
                                     </>
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
    recordUpdateStatus: state.recordUpdateStatus,
    fwList: state.fwList,
    recordDeleteStatus: state.recordDeleteStatus,
    recordLCDeleteStatus: state.recordLCDeleteStatus,
    recordCopyStatus: state.recordCopyStatus
});

const mapDispatchToProps = dispath => ({
    getAllTankList: (tankList) => dispath(getAllTankList(tankList)),
    getAllVesselList: (vesselList) => dispath(getAllVesselList(vesselList)),
    saveTankDetail: (loadingConData) => dispath(saveTankDetail(loadingConData)),
    getAllLCList: (lcList) => dispath(getAllLCList(lcList)),
    getAllSavedTankData: (tankList) => dispath(getAllSavedTankData(tankList)),
    updateTankDetail: (data) => dispath(updateTankDetail(data)),
    getAllFWList: (data) => dispath(getAllFWList(data)),
    getAllSavedFWData: (data) => dispath(getAllSavedFWData(data)),
    deleteFWDetail: (data) => dispath(deleteFWDetail(data)),
    deleteLCDetail: (data) => dispath(deleteLCDetail(data)),
    lcCopyAndCreate: (data) => dispath(lcCopyAndCreate(data)),
    getAllWeightList: (data) => dispath(getAllWeightList(data))
});

export default connect(mapStateToProps, mapDispatchToProps) (Index);