
import axios from 'axios';
import qs from 'querystring';

import {API_URL} from '../../util/api';
import {SAVE_USER_DETAILS, ERROR} from '../actions';
import isEmpty from '../../util/isEmpty';
import {setWithExpiry, removeKey} from '../../util/customSessionManager';

const APIPath = "Login";

export const saveUserDetails = userDetails => ({
    type: SAVE_USER_DETAILS,
    userDetails,
});

export const error = error => ({
    type: ERROR,
    error,
});

const config = {
    headers: {
        //'Content-Type': 'application/x-www-form-urlencoded'
    }
}

export const signInUser = (data) => dispath =>{

    axios.post(API_URL + `${APIPath}/GetToken`, data, config)
    .then(res => {
        if(!isEmpty(res.data.employee)){
            const user = { 
                _id: res.data.employee.id, 
                userName: res.data.employee.userName,
                firstName: res.data.employee.firstName, 
                middleName: res.data.employee.middleName,
                lastName: res.data.employee.lastName,
                userRole: res.data.employee.isActive ? 'Admin' : 'User'
            }

            setWithExpiry('userDetails',user)
            !isEmpty(res.data.token) ? setWithExpiry('authToken',res.data.token) : removeKey('authToken');
            dispath(saveUserDetails(user))
        }
        else{
            dispath(error(res.data.message));
            dispath(clearError());
        }     
    })
    .catch(err => {
        if (err.response) {
            dispath(error(err.response.data.message || 'ERROR'));
            dispath(clearError());
        } else {
            dispath(error('API Error. Please contact administrator.'));
            dispath(clearError());
        }
    });  
}

export const clearError = () => dispath =>{
    dispath(error(''));
}
