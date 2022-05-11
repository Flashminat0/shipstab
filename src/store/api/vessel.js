import axios from 'axios';
import qs from 'querystring';

import {API_URL} from '../../util/api';
import {GET_VESSEL_LIST, CLEAR_ALL_VESSEL_DATA, ERROR} from '../actions';
import isEmpty from '../../util/isEmpty';

const APIPath = "Vessel";

export const getVesselList = vesselList => ({
    type: GET_VESSEL_LIST,
    vesselList: vesselList
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