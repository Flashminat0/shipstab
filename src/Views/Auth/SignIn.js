import React from 'react';
import { connect } from "react-redux";
import {NavLink} from 'react-router-dom';

import './../../assets/scss/style.scss';
import Aux from "../../hoc/_Aux";
import Breadcrumb from "../../App/layout/AdminLayout/Breadcrumb";

import authLogo from '../../assets/images/auth/auth-logo.png';
import authLogoDark from '../../assets/images/auth/auth-logo-dark.png';

import { signInUser,clearError } from "../../store/api/auth";
import isEmpty from '../../util/isEmpty';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

class SignIn extends React.Component {
    state = {        
        isLoggedIn: false,
        isError: false,
        auth:{
            userName: "",
            password: "",
            saveCreds: false,
        }
    };

    sweetAlertHandler = (alert) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: alert.title,
            text: alert.text,
            type: alert.type
        });
    };

    componentDidMount() {
        var token = null;

        if(!isEmpty(localStorage.getItem('authToken')))
        {
            this.props.history.push(`/`);
        }
    }

    componentWillReceiveProps(nextProps) {

        if(!isEmpty(nextProps.loggedInUserDetails))
        {
            //let timerInterval
            Swal.fire({
            title: 'Login Succesful',
            html: 'Redirecting you to the Dashboard...',
            icon: 'info',
            timer: 1500,
            timerProgressBar: true,
            onBeforeOpen: () => {
                Swal.showLoading()
            },
            onClose: () => {
                this.props.history.push(`/`);
                // clearInterval(timerInterval)
            }
            }).then((result) => {
                /* Read more about handling dismissals below */
                // if (result.dismiss === Swal.DismissReason.timer) {
                //     console.log('I was closed by the timer')
                // }
            })
        }
        
        if (!isEmpty(nextProps.error)) {
            //console.log(nextProps.error)
            this.sweetAlertHandler({ title: "Login Error", text: nextProps.error, type: 'error' })
            this.props.clearError();
        }

    }

    handleFormChange = (e, form) => {
        const { name, value, type, checked } = e.target;

        this.setState({
            [form]: {
                ...this.state[form],
                [name]: value
            }
        })
    }

    handleSignIn = (e) => {
        e.preventDefault();

        var dataToSend = this.state.auth;

        delete dataToSend.saveCreds;

        this.props.signInUser(dataToSend);

        //this.props.history.push(`/`);
        // return  <Redirect  to="/signup/script" />
    }

    render () {
        return(
            <Aux>
                <Breadcrumb/>
                <div className="auth-wrapper align-items-stretch aut-bg-img">
                    <div className="flex-grow-1">
                        <div className="h-100 d-md-flex align-items-center auth-side-img">
                            <div className="col-sm-10 auth-content w-auto">
                                <img src={authLogo} alt="" className="img-fluid" />
                                <h1 className="text-white my-4">Welcome Back!</h1>
                                <h4 className="text-white font-weight-normal">Signin to your account and get explore the Able Pro Dashboard Template.<br/>Do not forget to play with live customizer</h4>
                            </div>
                        </div>
                        <div className="auth-side-form">
                            <div className=" auth-content">
                                <form onSubmit={this.handleSignIn}>
                                    <img src={authLogoDark} alt="" className="img-fluid mb-4 d-block d-xl-none d-lg-none" />
                                    <h3 className="mb-4 f-w-400">Signin</h3>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="User Name" onChange={(e) => this.handleFormChange(e, 'auth')} name="userName" value={this.state.auth.userName} />
                                    </div>
                                    <div className="input-group mb-4">
                                        <input type="password" className="form-control" placeholder="Password" onChange={(e) => this.handleFormChange(e, 'auth')} name="password" value={this.state.auth.password} />
                                    </div>
                                    <div className="form-group text-left mt-2">
                                        {/* <div className="checkbox checkbox-primary d-inline">
                                            <input type="checkbox" name="checkbox-p-1" id="checkbox-p-1" checked="" />
                                            <label htmlFor="checkbox-p-1" className="cr">Save credentials</label>
                                        </div> */}
                                    </div>
                                    <button type="submit" className="btn btn-block btn-primary mb-0">Signin</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => ({

    loggedInUserDetails: state.loggedInUserDetails,
    error: state.error,
});

const mapDispatchToProps = dispath => ({

    signInUser: (data) => dispath(signInUser(data)),
    clearError: () => dispath(clearError()),

});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);