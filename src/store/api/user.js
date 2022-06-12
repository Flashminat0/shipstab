import axios from 'axios';
import qs from 'querystring';

import {API_URL} from '../../util/api';
import {GET_USER_LIST, SAVE_RECORD_STATUS, UPDATE_RECORD_STATUS,  CLEAR_ALL_USER_DATA, ERROR} from '../actions';
import isEmpty from '../../util/isEmpty';

const APIPath = "Employee";

export const getUserList = userList => ({
    type: GET_USER_LIST,
    userList: userList
});

export const RecordSaveStatus = recordSaveStatus => ({
    type: SAVE_RECORD_STATUS,
    recordSaveStatus,
});

export const RecordUpdateStatus = recordUpdateStatus => ({
    type: UPDATE_RECORD_STATUS,
    recordUpdateStatus,
});

export const error = error => ({
    type: ERROR,
    error
});

export const clearAll = () => ({
    type: CLEAR_ALL_USER_DATA
});

const config = {
    headers: {
        //'Content-Type': 'application/x-www-form-urlencoded'
    }
}

export const getAllUserList = (data) => dispath => {

    dispath(getUserList([]));

    axios.get(API_URL + `${APIPath}/GetAllEmployees?${qs.stringify(data)}`, config)
    .then(res => {
        console.log(res.data);
        if(!isEmpty(res.data))
        {
            dispath(getUserList(res.data));
            dispath(clearAll());
        }
        else
        {
            dispath(error("Error fetching list of users"));
            dispath(clearAll());
        }
    })
    .catch(err => {
        if (err.response) {
            dispath(error(err.response.data.message || 'ERROR'));
            dispath(clearAll());
        } else {
            dispath(error('API Error. Please contact administrator.'));
            dispath(clearAll());
        }
    }); 

}

export const saveSingleUser = (data) => dispath => {
    axios.post(API_URL + `${APIPath}/AddEmployee`, data, config)
    .then(res => {
        if(res.data.status === 0){
            dispath(RecordSaveStatus(res.data.message)) 
            dispath(clearAll());
        }
        else {
            dispath(error(res.data.message)) 
            dispath(clearAll());
        }
    })
    .catch(err => {
        console.log(err)
        if (err.response) {
            dispath(error(err.response.data.message || 'ERROR'));
            dispath(clearAll());
        } else {
            dispath(error('API Error. Please contact administrator.'));
            dispath(clearAll());
        }
    });  
}

export const updateSingleUser = (data) => dispath => {
    axios.post(API_URL + `${APIPath}/UpdateEmployee`, data, config)
    .then(res => {
        if(res.data.status === 0){
            dispath(RecordUpdateStatus(res.data.message)) 
            dispath(clearAll());
        }
        else {
            dispath(error(res.data.message)) 
            dispath(clearAll());
        }
    })
    .catch(err => {
        if (err.response) {
            dispath(error(err.response.data.message || 'ERROR'));
            dispath(clearAll());
        } else {
            dispath(error('API Error. Please contact administrator.'));
            dispath(clearAll());
        }
    }); 
}

export const deletUser = (data) => dispath => {
    axios.post(API_URL + `${APIPath}/DeleteEmployee`, data, config)
        .then(res => {
            if(res.data == true){
                dispath(RecordUpdateStatus('User Data Deleted Successfully.')) 
                dispath(clearAll());
            }
            else {
                dispath(error('User Delete Request Error. Please contact administrator.'));
                dispath(clearAll());
            }
        })
        .catch(err => {
            if (err.response) {
                dispath(error(err.response.data.message || 'ERROR'));
                dispath(clearAll());
            } else {
                dispath(error('API Error. Please contact administrator.'));
                dispath(clearAll());
            }
        });   
}

export const clearError = () => dispath =>{
    dispath(error(''));
}