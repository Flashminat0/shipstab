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
            vesselObj: '',
            isEditVesselCode: true
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
                        <Button className='btn btn-sm btn-info mr-1' outline onClick={() => this.handleEdit(row.ID)}>
                            <i className="fa fa-edit" />
                        </Button>
                        <Button className='btn btn-sm btn-dark' outline onClick={() => this.handleDelete(row.ID)}>
                            <i className="fa fa-trash" />
                        </Button>
                      </>
                    
                  )
                }
            },
            {
                name: 'Vessel Code',
                selector: 'VesselCode'
            },
            {
                name: 'Vessel Name',
                selector: 'VesselName'
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

        this.setState({
            vesselObj: dataObj,
            isEditVesselCode: false
        });

        this.setState({ isSearch: false, isAdd: true })

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    componentWillReceiveProps(nextProps) {
        if (!isEmpty(nextProps.vesselList)) {
            this.setState({
                data: nextProps.vesselList,
            });
        }
        if (!isEmpty(nextProps.recordSaveStatus)) {

            if(nextProps.recordSaveStatus.status === 999) {
                this.sweetAlertHandler({ title: "Error", text: nextProps.recordSaveStatus.message, type: 'error' })
            }
            else 
            {
                this.sweetAlertHandler({ title: "Success", text: nextProps.recordSaveStatus, type: 'success' })
                //this.clearValue();
                setTimeout(() => {
                    window.location.reload(false);
                }, 1800);
            }
        }
        if (!isEmpty(nextProps.recordUpdateStatus)) {
            if(nextProps.recordUpdateStatus.status === 999) {
                this.sweetAlertHandler({ title: "Error", text: nextProps.recordUpdateStatus.message, type: 'error' })
            }
            else 
            {
                this.sweetAlertHandler({ title: "Success", text: nextProps.recordUpdateStatus, type: 'success' })
                //this.clearValue();
                setTimeout(() => {
                    window.location.reload(false);
                }, 1800);
            }
        }
        if (!isEmpty(nextProps.error)) {
            this.sweetAlertHandler({ title: "Error", text: nextProps.error, type: 'error' })
        }
    }

    componentDidMount() {
        this.props.getAllVesselList();
    }

    handleAddVessel = (e) => {
        this.clearValue(e);
        this.setState({ isSearch: false, isAdd: true })
    }

    handleCloseAddVessel = (e) => {
        this.clearValue(e);
        this.setState({ isSearch: true, isAdd: false })
    }

    handleFormChange = (e, form, fieldName, innerFieldName) => {
        try {
            const { name, value } = e.target;
            if(name == 'configFile' || name == 'loadingConditionFile'){

                console.log(e.target.files)
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

    clearValue = (e) => {
        this.setState({
            vesselObj: {
                id: '',
                vesselName: '',
                vesselCode: '',
            },
            isEditVesselCode: true
            })
    
    }


    handleSubmit = async () => {

        console.log(this.state.vesselObj.loadingConditionFile)
        let LoadingConditionFile = '';
        let ConfigFile = '';

        if(this.state.vesselObj.loadingConditionFile != null){
            if(!isEmpty(this.state.vesselObj.loadingConditionFile.name)){
                LoadingConditionFile = this.state.vesselObj.loadingConditionFile
            }
        }
         
        if(this.state.vesselObj.configFile != null){
            if(!isEmpty(this.state.vesselObj.configFile.name)) {
                ConfigFile = this.state.vesselObj.configFile            
            }

        }

        if(isEmpty(this.state.vesselObj.id)){

            if(!isEmpty(this.state.vesselObj.vesselName) && !isEmpty(this.state.vesselObj.vesselCode) && this.state.vesselObj.loadingConditionFile != null && this.state.vesselObj.configFile != null)
            {
                Swal.showLoading();

                const formData = new FormData()
                formData.append('vesselName', this.state.vesselObj.vesselName)
                formData.append('vesselCode', this.state.vesselObj.vesselCode)
                formData.append('configFile', ConfigFile)
                formData.append('loadingConditionFile', LoadingConditionFile)
    
                this.props.saveSingleVessel(formData);
            }
            else
            {
                this.sweetAlertHandler({ title: "Error", text: 'Please fill all required fileds', type: 'error' })
            }

        }
        else{
                Swal.showLoading();

                const formData = new FormData()

                formData.append('id', this.state.vesselObj.id)
                formData.append('vesselName', this.state.vesselObj.vesselName)
                formData.append('vesselCode', this.state.vesselObj.vesselCode)
                formData.append('configFile', ConfigFile)
                formData.append('loadingConditionFile', LoadingConditionFile)

                this.props.updateSingleVessel(formData);
        }
    }

    render() {
        const { isSearch, isAdd, vesselObj, isEditVesselCode } = this.state;
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
                        <Card title='Search Vessel'>
                            <Form.Row>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Vessel Code</Form.Label>
                                    <Form.Control type="text" id="vesselCode" placeholder="Vessel Code" />
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Vessel Name</Form.Label>
                                    <Form.Control type="text" id="vesselName" placeholder="Vessel Name" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} md="12">
                                    <center>
                                        <Button type={"button"} style={{ minWidth: '200px' }} variant={'info'} className={'m-3'} disabled>Search</Button>
                                        <Button style={{ minWidth: '200px' }} variant={'dark'} className={'m-3'} disabled>Clear</Button>
                                    </center>
                                </Form.Group>
                            </Form.Row>
                        </Card>
                        }
                        {isAdd &&
                        <Card title='Manage Vessel'>
                            <Form.Row>
                                <Form.Group style={{display:'none'}}>
                                                <Form.Label>ID</Form.Label>
                                                <Form.Control type="text" id="id" name="id" onChange={(e) => this.handleFormChange(e, 'vesselObj')} value={vesselObj.id}/>
                                </Form.Group>
                                <Form.Group as={Col} md="3">
                                    <Form.Label>Vessel Code</Form.Label>
                                    <Form.Control type="text" id="vesselCode" name="vesselCode" placeholder="Vessel Code" onChange={(e) => this.handleFormChange(e, 'vesselObj')} value={vesselObj.vesselCode} disabled={!isEditVesselCode} />
                                </Form.Group>
                                <Form.Group as={Col} md="3">
                                    <Form.Label>Vessel Name</Form.Label>
                                    <Form.Control type="text" id="vesselName" name="vesselName" placeholder="Vessel Name" onChange={(e) => this.handleFormChange(e, 'vesselObj')} value={vesselObj.vesselName}/>
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
                                        <Button style={{ minWidth: '200px' }} variant={'dark'} className={'m-3'} onClick={(e) => this.handleCloseAddVessel(e)}>Cancel</Button>
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
                                <Button type={"button"} style={{ minWidth: '200px' }} variant={'info'} onClick={(e) => this.handleAddVessel(e)}>Add Vessel</Button>
                            </div>
                        </nav>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card title='Vessels List'>
                            <DataTable
                                noHeader
                                responsive
                                theme="default"
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