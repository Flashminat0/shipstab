import axios from 'axios';
import qs from 'querystring';

import {API_URL} from '../../util/api';
import {GET_FW_LIST, DELETE_RECORD_STATUS, CLEAR_ALL_FW_DATA, ERROR} from '../actions';
import isEmpty from '../../util/isEmpty';
import fwDataMapping from '../../util/fwDataMapping';
import moment from "moment";

const APIPath = "WeightData";

export const getFWList = fwList => ({
    type: GET_FW_LIST,
    fwList: fwList,
});

export const RecordDeleteStatus = recordDeleteStatus => ({
    type: DELETE_RECORD_STATUS,
    recordDeleteStatus,
});

export const error = error => ({
    type: ERROR,
    error,
});

export const clearAll = () => ({
    type: CLEAR_ALL_FW_DATA,
});

const config = {
    headers: {
        //'Content-Type': 'application/x-www-form-urlencoded'
    }
}


export const getAllFWList = (data) => dispath => {

    dispath(getFWList([]));

    let dataObjs = data;

    let obj = {
        ID: "New" + moment().unix(),
        itemName: "",
        weight: "",
        LCG: "",
        TCG: "",
        VCG: "",
        AFTLocation: "",
        fordLocation: ""
    }

    dataObjs.push(obj);

    dispath(getFWList(dataObjs));
    // axios.get(API_URL + `${APIPath}?${qs.stringify(data)}`, config)
    // .then(res => {

    //     if(!isEmpty(res.data.status) && res.data.status != "Fail" )
    //     {
    //         console.log(res.data.result);
    //         dispath(getTankList(res.data.result));
    //     }
    //     else if(!isEmpty(res.data.status) && res.data.status == "Fail" )
    //     {
    //         dispath(error(res.data.message))
    //     }
    //     else
    //     {
    //         dispath(error("Error fetching list of tanks"))
    //     }
    // })
    // .catch(err => {
    //     if (err.response) {
    //         dispath(error(err.response.data.message || 'ERROR'));
    //     } else {
    //         dispath(error('API Error. Please contact administrator.'));
    //     }
    // }); 
}

export const getAllSavedFWData = (data) => dispath => {

    dispath(getFWList([]));

    axios.get(API_URL + `${APIPath}/GetAllByLoadingConditionId?LoadingConditionID=${data}`, config)
    .then(res => {

        if(!isEmpty(res.data))
        {
            let result = fwDataMapping(res.data);
            dispath(getFWList(result));
        }
        else
        {
            dispath(error("Error fetching list of Saved Tank Data"))
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

export const deleteFWDetail = (data) => dispath => {
    axios.post(API_URL + `${APIPath}/DeleteWeightData`, data, config)
        .then(res => {
            if(res.data == true){
                dispath(RecordDeleteStatus('Fixed Weight Data Delete Successfully.')) 
                dispath(clearAll());
            }
            else {
                dispath(error('Fixed Weight Data Delete Request Error. Please contact administrator.'));
            }
        })
        .catch(err => {
            dispath(error(err.response.data.message || 'ERROR'));
        });   
}
