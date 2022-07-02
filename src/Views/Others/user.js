import React, {Component} from 'react';
import {connect} from "react-redux";
import {Row, Col, Form, Button} from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import DataTable from 'react-data-table-component';
import isEmpty from '../../util/isEmpty';
import {getAllUserList, saveSingleUser, updateSingleUser, deletUser} from "../../store/api/user";
import {getAllVesselList} from "../../store/api/vessel";

class user extends Component {
    constructor() {
        super();

        this.state = {
            data: [],
            isSearch: true,
            isAdd: false,
            userObj: '',
            isEditUserCode: true,
            isSystemUser: false,
            vesselList: [],
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
                            <Button className='btn btn-sm btn-info mr-1' outline
                                    onClick={() => this.handleEdit(row.ID)}>
                                <i className="fa fa-edit"/>
                            </Button>
                            <Button className='btn btn-sm btn-dark' outline onClick={() => this.handleDelete(row.ID)}>
                                <i className="fa fa-trash"/>
                            </Button>
                        </>

                    )
                }
            },
            {
                name: 'User Code',
                selector: 'EmployeeNumber'
            },
            {
                name: 'Full Name',
                selector: 'FullName'
            },
            {
                name: 'Username',
                selector: 'UserName'
            },
            {
                name: 'User Role',
                cell: row => {
                    return (
                        <>{row.IsAdmin === true ? <span className="badge badge-info">Admin</span> :
                            <span className="badge badge-dark">User</span>}</>
                    )
                }
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
            text: 'Once deleted, you will not be able to recover this user!',
            type: 'warning',
            showCloseButton: true,
            showCancelButton: true
        }).then((willDelete) => {
            if (willDelete.value) {
                let deleteObj = this.state.data.find(c => c.ID === id)

                const data = {
                    ID: id
                };

                this.props.deletUser(data);

                var index = this.state.data.indexOf(deleteObj);

                if (index > -1) {
                    this.state.data.splice(index, 1);
                }

                this.setState({
                    data: this.state.data
                })
            } else {
                return MySwal.fire('', 'Your user record is safe!', 'info');
            }
        }).finally(() => {
            this.setState({isOpen: true})
        });
    }

    handleEdit = (id) => {
        let obj = this.state.data.find(c => c.ID === id);

        let dataObj = {
            ID: id,
            EmployeeNumber: obj.EmployeeNumber,
            FirstName: obj.FirstName,
            MiddleName: obj.MiddleName,
            LastName: obj.LastName
        }

        if (obj.IsUser) {

            this.setState({
                isSystemUser: true
            })

            dataObj = {
                ...dataObj,
                UserName: obj.UserName,
                UserRole: obj.IsAdmin === true ? "Admin" : "User"
            }
        }

        this.setState({
            userObj: dataObj,
            isEditUserCode: false
        });

        this.setState({isSearch: false, isAdd: true})

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    componentWillReceiveProps(nextProps) {
        if (!isEmpty(nextProps.userList)) {
            this.setState({
                data: nextProps.userList,
            });
        }
        if (!isEmpty(nextProps.recordSaveStatus)) {
            this.sweetAlertHandler({title: "Success", text: nextProps.recordSaveStatus, type: 'success'})
            //this.clearValue();
            setTimeout(() => {
                window.location.reload(false);
            }, 1800);
        }
        if (!isEmpty(nextProps.vesselList)) {
            this.setState({
                vesselList: nextProps.vesselList,
            });
        }
        if (!isEmpty(nextProps.recordUpdateStatus)) {
            this.sweetAlertHandler({title: "Success", text: nextProps.recordUpdateStatus, type: 'success'})
            //this.clearValue();
            setTimeout(() => {
                window.location.reload(false);
            }, 1800);
        }
        if (!isEmpty(nextProps.error)) {
            this.sweetAlertHandler({title: "Error", text: nextProps.error, type: 'error'})
        }
    }

    componentDidMount() {
        this.props.getAllUserList();
        this.props.getAllVesselList();
    }

    handleAddUser = (e) => {
        this.clearValue(e);
        this.setState({isSearch: false, isAdd: true})
    }

    handleIsSystemUser = (e) => {
        this.setState({isSystemUser: true})
    }

    handleIsNormalUser = (e) => {
        this.setState({isSystemUser: false})
    }

    handleCloseAddUser = (e) => {
        this.clearValue(e);
        this.setState({isSearch: true, isAdd: false, isSystemUser: false})
    }

    handleFormChange = (e, form, fieldName, innerFieldName) => {
        try {
            const {name, value} = e.target;
            this.setState({
                [form]: {
                    ...this.state[form],
                    [name]: value
                }
            })
        } catch (err) {
            console.log(err);
        }
    }

    clearValue = (e) => {
        this.setState({
            userObj: {
                ID: '',
                EmployeeNumber: '',
                FirstName: '',
                MiddleName: '',
                LastName: '',
                UserName: '',
                Password: '',
                ConfPassword: '',
                UserRole: '',
                Vessel :''
            },
            isEditUserCode: true,
            isSystemUser: false
        })

    }




    handleSubmit = async () => {

        if (isEmpty(this.state.userObj.ID)) {

            if (!isEmpty(this.state.userObj.EmployeeNumber)) {
                Swal.showLoading();

                const formData = new FormData()
                formData.append('EmployeeNumber', this.state.userObj.EmployeeNumber)
                formData.append('FirstName', this.state.userObj.FirstName)
                formData.append('MiddleName', this.state.userObj.MiddleName)
                formData.append('LastName', this.state.userObj.LastName)
                formData.append('IsUser', this.state.isSystemUser ? true : false)
                formData.append('IsLocked', false)
                formData.append('IsActive', true)
                formData.append('Vessel', this.state.userObj.Vessel)

                if (this.state.isSystemUser && !isEmpty(this.state.userObj.Password) && !isEmpty(this.state.userObj.ConfPassword)) {
                    formData.append('UserName', this.state.userObj.UserName)
                    formData.append('Password', this.state.userObj.Password)
                    formData.append('IsAdmin', this.state.userObj.UserRole === "Admin" ? true : false)

                    if (this.state.userObj.Password === this.state.userObj.ConfPassword) {
                        this.props.saveSingleUser(formData);
                    } else {
                        this.sweetAlertHandler({
                            title: "Error",
                            text: 'Confirm password not match with password',
                            type: 'error'
                        })
                    }
                } else if (this.state.isSystemUser) {
                    this.sweetAlertHandler({
                        title: "Error",
                        text: 'Please enter password and confirm password',
                        type: 'error'
                    })
                } else {
                    this.props.saveSingleUser(formData);
                }

            } else {
                this.sweetAlertHandler({title: "Error", text: 'Please fill all required fileds', type: 'error'})
            }

        } else {
            Swal.showLoading();

            const formData = new FormData()

            formData.append('ID', this.state.userObj.ID)
            formData.append('EmployeeNumber', this.state.userObj.EmployeeNumber)
            formData.append('FirstName', this.state.userObj.FirstName)
            formData.append('MiddleName', this.state.userObj.MiddleName)
            formData.append('LastName', this.state.userObj.LastName)
            formData.append('IsUser', this.state.isSystemUser ? true : false)
            formData.append('IsLocked', false)
            formData.append('IsActive', true)
            formData.append('Vessel', this.state.userObj.Vessel)

            if (this.state.isSystemUser) {
                formData.append('UserName', this.state.userObj.UserName)
                formData.append('IsAdmin', this.state.userObj.UserRole === "Admin" ? true : false)
                if (!isEmpty(this.state.userObj.Password) && !isEmpty(this.state.userObj.ConfPassword)) {
                    formData.append('Password', this.state.userObj.Password)

                    if (this.state.userObj.Password === this.state.userObj.ConfPassword) {
                        this.props.updateSingleUser(formData);
                    } else {
                        this.sweetAlertHandler({
                            title: "Error",
                            text: 'Confirm password not match with password',
                            type: 'error'
                        })
                    }
                } else {
                    this.props.updateSingleUser(formData);
                }
            } else {
                this.props.updateSingleUser(formData);
            }
        }


    }


    render() {
        const {isSearch, isAdd, userObj, isEditUserCode, isSystemUser , vesselList , Vessel} = this.state;
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
                            <Card title='Search User'>
                                <Form.Row>
                                    <Form.Group as={Col} md="3">
                                        <Form.Label>User Code</Form.Label>
                                        <Form.Control type="text" id="EmployeeNumber" placeholder="User Code"/>
                                    </Form.Group>
                                    <Form.Group as={Col} md="3">
                                        <Form.Label>User Name</Form.Label>
                                        <Form.Control type="text" id="UserName" placeholder="User Name"/>
                                    </Form.Group>
                                    <Form.Group as={Col} md="3">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control type="text" id="FullName" placeholder="Full Name"/>
                                    </Form.Group>
                                    <Form.Group as={Col} md="3">
                                        <Form.Label>User Role</Form.Label>
                                        <Form.Control type="text" id="IsAdmin" placeholder="User Role"/>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} md="12">
                                        <center>
                                            <Button type={"button"} style={{minWidth: '200px'}} variant={'info'}
                                                    className={'m-3'} disabled>Search</Button>
                                            <Button style={{minWidth: '200px'}} variant={'dark'} className={'m-3'}
                                                    disabled>Clear</Button>
                                        </center>
                                    </Form.Group>
                                </Form.Row>
                            </Card>
                        }
                        {isAdd &&
                            <Card title='Manage User'>
                                <Form.Row>
                                    <Form.Group style={{display: 'none'}}>
                                        <Form.Label>ID</Form.Label>
                                        <Form.Control type="text" id="ID" name="ID"
                                                      onChange={(e) => this.handleFormChange(e, 'userObj')}
                                                      value={userObj.ID}/>
                                    </Form.Group>
                                    <Form.Group as={Col} md="3">
                                        <Form.Label>User Code</Form.Label>
                                        <Form.Control type="text" id="EmployeeNumber" name="EmployeeNumber"
                                                      placeholder="User Code"
                                                      onChange={(e) => this.handleFormChange(e, 'userObj')}
                                                      value={userObj.EmployeeNumber} disabled={!isEditUserCode}/>
                                    </Form.Group>
                                    <Form.Group as={Col} md="3">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="text" id="FirstName" name="FirstName"
                                                      placeholder="First Name"
                                                      onChange={(e) => this.handleFormChange(e, 'userObj')}
                                                      value={userObj.FirstName}/>
                                    </Form.Group>
                                    <Form.Group as={Col} md="3">
                                        <Form.Label>Middle Name</Form.Label>
                                        <Form.Control type="text" id="MiddleName" name="MiddleName"
                                                      placeholder="Middle Name"
                                                      onChange={(e) => this.handleFormChange(e, 'userObj')}
                                                      value={userObj.MiddleName}/>
                                    </Form.Group>
                                    <Form.Group as={Col} md="3">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" id="LastName" name="LastName" placeholder="Last Name"
                                                      onChange={(e) => this.handleFormChange(e, 'userObj')}
                                                      value={userObj.LastName}/>
                                    </Form.Group>
                                    {!isSystemUser &&
                                        <Button className='btn btn-sm btn-info'
                                                onClick={(e) => this.handleIsSystemUser(e)}>Is System User</Button>
                                    }
                                    {isSystemUser &&
                                        <Button className='btn btn-sm btn-dark'
                                                onClick={(e) => this.handleIsNormalUser(e)}>Is Normal User</Button>
                                    }
                                </Form.Row>
                                {isSystemUser &&
                                    <>
                                        <hr/>
                                        <Form.Row>
                                            <Form.Group as={Col} md="3">
                                                <Form.Label>Username</Form.Label>
                                                <Form.Control type="text" id="UserName" name="UserName"
                                                              placeholder="Username"
                                                              onChange={(e) => this.handleFormChange(e, 'userObj')}
                                                              value={userObj.UserName}/>
                                            </Form.Group>
                                            <Form.Group as={Col} md="3">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" id="Password" name="Password"
                                                              placeholder="Password"
                                                              onChange={(e) => this.handleFormChange(e, 'userObj')}/>
                                            </Form.Group>
                                            <Form.Group as={Col} md="3">
                                                <Form.Label>Confirm Password</Form.Label>
                                                <Form.Control type="password" id="ConfPassword" name="ConfPassword"
                                                              placeholder="Confirm Password"
                                                              onChange={(e) => this.handleFormChange(e, 'userObj')}/>
                                            </Form.Group>
                                            <Form.Group as={Col} md="3">
                                                <Form.Label>User Role</Form.Label>
                                                <select className="form-control add_task_todo"
                                                        onChange={(e) => this.handleFormChange(e, 'userObj')}
                                                        name="UserRole" id="UserRole" value={userObj.UserRole}>
                                                    <option value=''>Select User Role</option>
                                                    <option value='Admin'>Admin</option>
                                                    <option value='User'>User</option>
                                                </select>
                                            </Form.Group>
                                            <Form.Group as={Col} md="3">
                                                <Form.Label>Vessel</Form.Label>
                                                <select className="form-control add_task_todo"
                                                        onChange={(e) => this.handleFormChange(e, 'userObj')}
                                                        name="Vessel" id="Vessel" value={userObj.vesselName}>
                                                    {/*onClick={this.handleLoadVessel}*/}
                                                    <option value=''>Select Vessel Name</option>
                                                    {!isEmpty(vesselList) && vesselList.map((vessel, key) => {
                                                        return <option key={key}
                                                                       value={vessel.ID}>{vessel.VesselName}</option>;
                                                    })}
                                                </select>
                                            </Form.Group>
                                        </Form.Row>
                                    </>
                                }
                                <Form.Row>
                                    <Form.Group as={Col} md="12">
                                        <center>
                                            <Button type={"button"} style={{minWidth: '200px'}} variant={'info'}
                                                    className={'m-3'} onClick={this.handleSubmit}>Save</Button>
                                            <Button style={{minWidth: '200px'}} variant={'dark'} className={'m-3'}
                                                    onClick={(e) => this.handleCloseAddUser(e)}>Cancel</Button>
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
                                <Button type={"button"} style={{minWidth: '200px'}} variant={'info'}
                                        onClick={(e) => this.handleAddUser(e)}>Add User</Button>
                            </div>
                        </nav>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card title='Users List'>
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
    userList: state.userList,
    recordSaveStatus: state.recordSaveStatus,
    recordUpdateStatus: state.recordUpdateStatus,
    error: state.error,
    vesselList: state.vesselList,
});

const mapDispatchToProps = dispath => ({
    getAllUserList: (userList) => dispath(getAllUserList(userList)),
    saveSingleUser: (userObj) => dispath(saveSingleUser(userObj)),
    updateSingleUser: (userObj) => dispath(updateSingleUser(userObj)),
    deletUser: (data) => dispath(deletUser(data)),
    getAllVesselList: (vesselList) => dispath(getAllVesselList(vesselList)),

});


export default connect(mapStateToProps, mapDispatchToProps)(user);