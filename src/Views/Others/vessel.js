import React, {Component} from 'react';
import { connect } from "react-redux";
import {Row, Col, Form, Button} from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import DataTable from 'react-data-table-component';
import isEmpty from '../../util/isEmpty';
import { getAllVesselList, saveSingleVessel, updateSingleVessel, deletVessel } from "../../store/api/vessel";
class vessel extends Component {
    constructor() {
        super();

        this.state = {
            data: [],
            isSearch: true,
            isAdd: false,
            vesselObj: ''
        }

        this.columns = [
            {
                name: 'ID',
                selector: 'ID',
                omit: true
            },
            {
                name: 'Actions',
                cell: row => {
                  return (
                      <>
                        <Button className='btn btn-sm btn-primary mr-1' outline onClick={() => this.handleEdit(row.ID)}>
                            <i className="fa fa-edit" />
                        </Button>
                        <Button className='btn btn-sm btn-danger' outline onClick={() => this.handleDelete(row.ID)}>
                            <i className="fa fa-trash" />
                        </Button>
                      </>
                    
                  )
                }
            },
            {
                name: 'Vessel Name',
                selector: 'VesselName'
            },
            {
                name: 'Vessel Code',
                selector: 'VesselCode'
            }
        ]
    }

    sweetAlertHandler = (alert) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: alert.title,
            text: alert.text,
            type: alert.type
        });
    };
    
    handleDelete = (id) => {
        const MySwal = withReactContent(Swal);

        MySwal.fire({
            title: 'Are you sure?',
            text: 'Once deleted, you will not be able to recover this Vessel!',
            type: 'warning',
            showCloseButton: true,
            showCancelButton: true
        }).then((willDelete) => {
            if (willDelete.value) {
                let deleteObj = this.state.data.find(c => c.ID === id)

                const data = {
                    ID: id
                };

                this.props.deletVessel(data);

                var index = this.state.data.indexOf(deleteObj);

                if (index > -1) { 
                    this.state.data.splice(index, 1);
                }

                this.setState({
                    data: this.state.data
                })
            } else {
                return MySwal.fire('', 'Your Vessel record is safe!', 'error');
            }
        }).finally(() => {
            this.setState({ isOpen: true })
        });
    }

    handleEdit = (id) => {
        let obj = this.state.data.find(c => c.ID === id);

        const dataObj = {
            id: id,
            vesselCode: obj.VesselCode,
            vesselName: obj.VesselName
        }

        console.log(dataObj)
        this.setState({
            vesselObj: dataObj
        });

        this.setState({ isSearch: false, isAdd: true })
    }

    componentWillReceiveProps(nextProps) {
        if (!isEmpty(nextProps.vesselList)) {
            this.setState({
                data: nextProps.vesselList,
            });
        }
        if (!isEmpty(nextProps.recordSaveStatus)) {
            this.sweetAlertHandler({ title: "Success", text: nextProps.recordSaveStatus, type: 'success' })

            // this.setState({ isSearch: true, isAdd: false })

            setTimeout(() => {
                window.location.reload(false);
            }, 1500);
        }
        if (!isEmpty(nextProps.recordUpdateStatus)) {
            this.sweetAlertHandler({ title: "Success", text: nextProps.recordUpdateStatus, type: 'success' })
            
            // this.setState({ isSearch: true, isAdd: false })

            setTimeout(() => {
                window.location.reload(false);
            }, 1500);
        }
        if (!isEmpty(nextProps.error)) {
            this.sweetAlertHandler({ title: "Error", text: nextProps.error, type: 'error' })
        }
    }

    componentDidMount() {
        this.props.getAllVesselList();
    }

    handleAddVessel = () => {
        this.setState({ isSearch: false, isAdd: true })
    }

    handleCloseAddVessel = () => {
        this.setState({ isSearch: true, isAdd: false })
    }

    handleFormChange = (e, form, fieldName, innerFieldName) => {
        try {
            const { name, value } = e.target;
            if(name == 'ConfigFile' || name == 'LoadingConditionFile'){
                this.setState({
                    [form]: {
                        ...this.state[form],
                        [name]: e.target.files[0]
                    }
                })
            }
            else{
            this.setState({
                [form]: {
                    ...this.state[form],
                    [name]: value
                }
                })
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    getBase64 = file => {
        return new Promise(resolve => {
          let baseURL = "";
          // Make new FileReader
          let reader = new FileReader();
    
          // Convert the file to base64 text
          reader.readAsDataURL(file);
    
          // on reader load somthing...
          reader.onload = () => {
            // Make a fileInfo Object
            console.log("Called", reader);
            baseURL = reader.result;
            console.log(baseURL);
            resolve(baseURL);
          };
        });
    };


    handleSubmit = async () => {

        console.log(this.state.vesselObj)
        let LoadingConditionFile = null;
        let ConfigFile = null;

        if(!isEmpty(this.state.vesselObj.loadingConditionFile)){
            LoadingConditionFile = await this.getBase64(this.state.vesselObj.loadingConditionFile)
        }
         
        if(!isEmpty(this.state.vesselObj.configFile)){
            ConfigFile = await this.getBase64(this.state.vesselObj.configFile)
        }

        if(isEmpty(this.state.vesselObj.id)){

            if(!isEmpty(this.state.vesselObj.vesselName) && !isEmpty(this.state.vesselObj.vesselCode) && !isEmpty(LoadingConditionFile) && !isEmpty(ConfigFile))
            {
                Swal.showLoading();

                const data = {
                    vesselName: this.state.vesselObj.vesselName,
                    vesselCode: this.state.vesselObj.vesselCode,
                    configFile: ConfigFile,
                    loadingConditionFile: LoadingConditionFile
                };
    
                this.props.saveSingleVessel(data);
            }
            else
            {
                this.sweetAlertHandler({ title: "Error", text: 'Please fill all required fileds', type: 'error' })
            }

        }
        else{
                Swal.showLoading();
                const data = {
                    id: this.state.vesselObj.id,
                    vesselName: this.state.vesselObj.vesselName,
                    vesselCode: this.state.vesselObj.vesselCode,
                    configFile: ConfigFile,
                    loadingConditionFile: LoadingConditionFile
                };
                this.props.updateSingleVessel(data);
        }
    }

    render() {
        const { isSearch, isAdd, vesselObj } = this.state;
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
                    <Col>
                        {isSearch &&
                        <Card title='Search Vessel' isOption>
                            <Form.Row>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Vessel Name</Form.Label>
                                    <Form.Control type="text" id="vesselName" placeholder="Vessel Name" />
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Vessel Code</Form.Label>
                                    <Form.Control type="text" id="vesselCode" placeholder="Vessel Code" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} md="12">
                                    <center>
                                        <Button type={"button"} style={{ minWidth: '200px' }} variant={'info'} className={'m-3'}>Search</Button>
                                        <Button style={{ minWidth: '200px' }} variant={'dark'} className={'m-3'}>Clear</Button>
                                    </center>
                                </Form.Group>
                            </Form.Row>
                        </Card>
                        }
                        {isAdd &&
                        <Card title='Manage Vessel' isOption>
                            <Form.Row>
                                <Form.Group style={{display:'none'}}>
                                                <Form.Label>ID</Form.Label>
                                                <Form.Control type="text" id="id" name="id" onChange={(e) => this.handleFormChange(e, 'vesselObj')} value={vesselObj.id}/>
                                </Form.Group>
                                <Form.Group as={Col} md="3">
                                    <Form.Label>Vessel Name</Form.Label>
                                    <Form.Control type="text" id="vesselName" name="vesselName" placeholder="Vessel Name" onChange={(e) => this.handleFormChange(e, 'vesselObj')} value={vesselObj.vesselName}/>
                                </Form.Group>
                                <Form.Group as={Col} md="3">
                                    <Form.Label>Vessel Code</Form.Label>
                                    <Form.Control type="text" id="vesselCode" name="vesselCode" placeholder="Vessel Code" onChange={(e) => this.handleFormChange(e, 'vesselObj')} value={vesselObj.vesselCode} />
                                </Form.Group>
                                <Form.Group as={Col} md="3">
                                    <Form.Label>Upload Config File</Form.Label>
                                    <Form.Control
                                        type="file"
                                        id="configFile"
                                        name="configFile"
                                        onChange={(e) => this.handleFormChange(e, 'vesselObj')}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="3">
                                    <Form.Label>Upload Loading Condition File</Form.Label>
                                    <Form.Control
                                        type="file"
                                        id="loadingConditionFile"
                                        name="loadingConditionFile"
                                        onChange={(e) => this.handleFormChange(e, 'vesselObj')}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} md="12">
                                    <center>
                                        <Button type={"button"} style={{ minWidth: '200px' }} variant={'info'} className={'m-3'} onClick={this.handleSubmit}>Save</Button>
                                        <Button style={{ minWidth: '200px' }} variant={'dark'} className={'m-3'} onClick={this.handleCloseAddVessel}>Close</Button>
                                    </center>
                                </Form.Group>
                            </Form.Row>
                        </Card>
                        }
                    </Col>
                </Row>
                <Row>
                    <Col xl={12}>
                        <nav className="navbar m-b-10 p-10">
                            <ul className="nav">
                                <li className="nav-item f-text active">
                                </li>
                                <li className="nav-item f-text active">

                                </li>
                            </ul>
                            <div className="nav-item nav-grid f-view">
                                <Button type={"button"} style={{ minWidth: '200px' }} variant={'info'} onClick={this.handleAddVessel}>Add Vessel</Button>
                            </div>
                        </nav>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card title='Vessels List' isOption>
                            <DataTable
                                noHeader
                                responsive
                                {...this.state}
                                columns={columns}
                                paginationPerPage={2}
                                className='react-dataTable'
                                //sortIcon={<ChevronDown size={10} />}
                                //paginationDefaultPage={this.state.currentPage + 1}
                                data={this.state.data}
                            />
                        </Card>
                        
                    </Col>
                </Row>
            </Aux>
        );
    }
}

const mapStateToProps = state => ({
    vesselList: state.vesselList,
    recordSaveStatus: state.recordSaveStatus,
    recordUpdateStatus: state.recordUpdateStatus,
    error: state.error
});

const mapDispatchToProps = dispath => ({
    getAllVesselList: (vesselList) => dispath(getAllVesselList(vesselList)),
    saveSingleVessel: (vesselObj) => dispath(saveSingleVessel(vesselObj)),
    updateSingleVessel: (vesselObj) => dispath(updateSingleVessel(vesselObj)),
    deletVessel: (data) => dispath(deletVessel(data))
});

export default connect(mapStateToProps, mapDispatchToProps) (vessel);