import axios from 'axios';
import qs from 'querystring';

import {API_URL} from '../../util/api';
import {GET_VESSEL_LIST, SAVE_RECORD_STATUS, UPDATE_RECORD_STATUS,  CLEAR_ALL_VESSEL_DATA, ERROR} from '../actions';
import isEmpty from '../../util/isEmpty';

const APIPath = "Vessel";

export const getVesselList = vesselList => ({
    type: GET_VESSEL_LIST,
    vesselList: vesselList
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
    type: CLEAR_ALL_VESSEL_DATA
});

const config = {
    headers: {
        //'Content-Type': 'application/x-www-form-urlencoded'
    }
}

export const getAllVesselList = (data) => dispath => {

    dispath(getVesselList([]));

    axios.get(API_URL + `${APIPath}/GetAllVessels?${qs.stringify(data)}`, config)
    .then(res => {
        console.log(res.data);
        if(!isEmpty(res.data))
        {
            console.log(res.data);
            dispath(getVesselList(res.data));
        }
        else
        {
            dispath(error("Error fetching list of vessels"))
        }
    })
    .catch(err => {
        if (err.response) {
            dispath(error(err.response.data.message || 'ERROR'));
        } else {
            dispath(error('API Error. Please contact administrator.'));
        }
    }); 

}

export const saveSingleVessel = (data) => dispath => {
    axios.post(API_URL + `${APIPath}/AddVessel`, data, config)
    .then(res => {
        if(res.data.status === 0){
            dispath(RecordSaveStatus(res.data.message)) 
            dispath(clearAll());
        }
        else {
            dispath(RecordSaveStatus(res.data)) 
            dispath(clearAll());
        }
    })
    .catch(err => {
        console.log(err)
        if (err.response) {
            dispath(error(err.response.data.message || 'ERROR'));
        } else {
            dispath(error('API Error. Please contact administrator.'));
        }
    });  
}

export const updateSingleVessel = (data) => dispath => {
    axios.post(API_URL + `${APIPath}/UpdateVessel`, data, config)
    .then(res => {
        if(res.data.status === 0){
            dispath(RecordUpdateStatus(res.data.message)) 
            dispath(clearAll());
        }
        else {
            dispath(RecordUpdateStatus(res.data)) 
            dispath(clearAll());
        }
    })
    .catch(err => {
        if (err.response) {
            dispath(error(err.response.data.message || 'ERROR'));
        } else {
            dispath(error('API Error. Please contact administrator.'));
        }
    }); 
}

export const deletVessel = (data) => dispath => {
    axios.post(API_URL + `${APIPath}/DeleteVessel`, data, config)
        .then(res => {
            if(res.data == true){
                dispath(RecordUpdateStatus('Vessel Data Deleted Successfully.')) 
                dispath(clearAll());
            }
            else {
                dispath(error('Vessel Delete Request Error. Please contact administrator.'));
            }
        })
        .catch(err => {
            if (err.response) {
                dispath(error(err.response.data.message || 'ERROR'));
            } else {
                dispath(error('API Error. Please contact administrator.'));
            }
        });   
}

export const clearError = () => dispath =>{
    dispath(error(''));
}