import axios from 'axios';
import qs from 'querystring';

import {API_URL} from '../../util/api';
import {GET_TANK_LIST, GET_TANK_DETAILS, SAVE_RECORD_STATUS, UPDATE_RECORD_STATUS, CLEAR_ALL_TANK_DATA, ERROR} from '../actions';
import isEmpty from '../../util/isEmpty';

export const getTankList = tankList => ({
    type: GET_TANK_LIST,
    tankList: tankList,
});

export const getTankDetails = getTankDetails => ({
    type: GET_TANK_DETAILS,
    getTankDetails,
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
    error,
});

export const clearAll = () => ({
    type: CLEAR_ALL_TANK_DATA,
});

const config = {
    headers: {
        //'Content-Type': 'application/x-www-form-urlencoded'
    }
}

export const getAllTankList = (data) => dispath => {

    dispath(getTankList([]));

    let dataObjs = [
        {
            tankName: "Fresh Water",
            maxVolume: "",
            density: "",
            sounding: "",
            fil: "",
            weight: "",
            location: "",
            LCG: "",
            TCG: "",
            VCG: ""
        },
        {
            tankName: "No. 1 FW Tank (P)",
            maxVolume: "500",
            density: "1",
            sounding: "",
            fil: "100",
            weight: "0",
            location: "P",
            LCG: "0",
            TCG: "0",
            VCG: "0"
        },
        {
            tankName: "No. 2 FW Tank (P)",
            maxVolume: "500",
            density: "1",
            sounding: "",
            fil: "100",
            weight: "0",
            location: "P",
            LCG: "0",
            TCG: "0",
            VCG: "0"
        },
        {
            tankName: "No. 3 FW Tank (P)",
            maxVolume: "500",
            density: "1",
            sounding: "",
            fil: "100",
            weight: "0",
            location: "P",
            LCG: "0",
            TCG: "0",
            VCG: "0"
        },
        {
            tankName: "No. 4 FW Tank (P)",
            maxVolume: "500",
            density: "1",
            sounding: "",
            fil: "100",
            weight: "0",
            location: "P",
            LCG: "0",
            TCG: "0",
            VCG: "0"
        },
        {
            tankName: "No. 5 FW Tank (P)",
            maxVolume: "500",
            density: "1",
            sounding: "",
            fil: "100",
            weight: "0",
            location: "P",
            LCG: "0",
            TCG: "0",
            VCG: "0"
        },
        {
            tankName: "No. 6 FW Tank (P)",
            maxVolume: "500",
            density: "1",
            sounding: "",
            fil: "100",
            weight: "0",
            location: "P",
            LCG: "0",
            TCG: "0",
            VCG: "0"
        },
        {
            tankName: "No. 7 FW Tank (P)",
            maxVolume: "500",
            density: "1",
            sounding: "",
            fil: "100",
            weight: "0",
            location: "P",
            LCG: "0",
            TCG: "0",
            VCG: "0"
        },
        {
            tankName: "No. 8 FW Tank (P)",
            maxVolume: "500",
            density: "1",
            sounding: "",
            fil: "100",
            weight: "0",
            location: "P",
            LCG: "0",
            TCG: "0",
            VCG: "0"
        },
        {
            tankName: "No. 9 FW Tank (P)",
            maxVolume: "500",
            density: "1",
            sounding: "",
            fil: "100",
            weight: "0",
            location: "P",
            LCG: "0",
            TCG: "0",
            VCG: "0"
        },
        {
            tankName: "No. 10 FW Tank (P)",
            maxVolume: "500",
            density: "1",
            sounding: "",
            fil: "100",
            weight: "0",
            location: "P",
            LCG: "0",
            TCG: "0",
            VCG: "0"
        }
    ];

    dispath(getTankList(dataObjs));
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

// export const getTankDetailsByID = (id) => dispath => {
//     axios.get(API_URL + `${APIPath}/${id}`)
//     .then(res => {
//         if(!isEmpty(res.data.status) && res.data.status != "Fail" )
//         {
//             dispath(getTankDetails(res.data.result));
//         }
//         else if(!isEmpty(res.data.status) && res.data.status == "Fail" )
//         {
//             dispath(error(res.data.message))
//         }
//         else
//         {
//             dispath(error("Error making tank fetch request. Please try again."))
//         }
//     })
//     .catch(err => {
//         if (err.response) {
//             dispath(error(err.response.data.message || 'ERROR'));
//         } else {
//             dispath(error('API Error. Please contact administrator.'));
//         }
//     });
// }

// export const saveSingleTankDetail = (data) => dispath => {
//     axios.post(API_URL + APIPath, data, config)
//     .then(res => {
//         !isEmpty(res.data.message) ? dispath(RecordSaveStatus(res.data.message)) : dispath(error(res.data.message));
//         dispath(clearAll());
//     })
//     .catch(err => {
//         dispath(error(err.response.data.message || 'ERROR'));
//     });  
// }

// export const updateTankDetail = (data) => dispath => {
//     axios.put(API_URL + `${APIPath}`, data, config)
//     .then(res => {
//         !isEmpty(res.data.message) ? dispath(RecordUpdateStatus(res.data.message)) : dispath(error(res.data.message));
//         dispath(clearAll());
//     })
//     .catch(err => {
//         if (err.response) {
//             dispath(error(err.response.data.message || 'ERROR'));
//         } else {
//             dispath(error('API Error. Please contact administrator.'));
//         }
//     }); 
// }

export const clearError = () => dispath =>{
    dispath(error(''));
}