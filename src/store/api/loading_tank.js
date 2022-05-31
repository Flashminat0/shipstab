import axios from 'axios';
import qs from 'querystring';

import {API_URL} from '../../util/api';
import {GET_TANK_LIST, GET_FW_LIST, GET_LC_LIST, GET_TANK_DETAILS, SAVE_RECORD_STATUS, UPDATE_RECORD_STATUS, LC_DELETE_RECORD_STATUS, LC_COPY_RECORD_STATUS, CLEAR_ALL_TANK_DATA, ERROR} from '../actions';
import isEmpty from '../../util/isEmpty';
import tankDataMapping from '../../util/tankDataMapping';
import fwDataMapping from '../../util/fwDataMapping';

const APIPath = "LoadingCondition";
const TankDataAPIPath = "TankData";
const WeightDataAPIPath = "WeightData"

export const getTankList = tankList => ({
    type: GET_TANK_LIST,
    tankList: tankList,
});

export const getFWList = fwList => ({
    type: GET_FW_LIST,
    fwList: fwList,
});

export const getLCList = lcList => ({
    type: GET_LC_LIST,
    lcList: lcList,
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

export const RecordDeleteStatus = recordLCDeleteStatus => ({
    type: LC_DELETE_RECORD_STATUS,
    recordLCDeleteStatus,
});

export const RecordCopyStatus = recordCopyStatus => ({
    type: LC_COPY_RECORD_STATUS,
    recordCopyStatus,
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

    axios.get(API_URL + `${TankDataAPIPath}/GetAllByVesselId?VesselId=${data}`, config)
    .then(res => {
        if(!isEmpty(res.data))
        {
            let result = tankDataMapping(res.data);
            dispath(getTankList(result));
        }
        else
        {
            dispath(error("Error fetching list of Tank Data"))
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

export const getAllWeightList = (data) => dispath => {

    dispath(getFWList([]));

    axios.get(API_URL + `${WeightDataAPIPath}/GetAllByVesselId?VesselId=${data}`, config)
    .then(res => {
        if(!isEmpty(res.data))
        {
            let result = fwDataMapping(res.data);
            dispath(getFWList(result));
        }
        else
        {
            dispath(error("Error fetching list of Weight Data"))
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

export const getAllLCList = (data) => dispath => {

    dispath(getLCList([]));

    axios.get(API_URL + `${APIPath}/GetAllByVesselId?VesselId=${data}`, config)
    .then(res => {

        if(!isEmpty(res.data))
        {
            dispath(getLCList(res.data));
        }
        else
        {
            dispath(error("Error fetching list of Loading Conditions"))
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

export const getAllSavedTankData = (data) => dispath => {

    dispath(getTankList([]));

    axios.get(API_URL + `${TankDataAPIPath}/GetAllByLoadingConditionId?LoadingConditionID=${data}`, config)
    .then(res => {

        if(!isEmpty(res.data))
        {
            let result = tankDataMapping(res.data);
            dispath(getTankList(result));
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

export const saveTankDetail = (data) => dispath => {
    axios.post(API_URL + `${TankDataAPIPath}/AddTankData`, data, config)
        .then(res => {
            if(res.data == true){
                dispath(RecordSaveStatus('Tank Data Save Successfully.')) 
                dispath(clearAll());
            }
            else {
                dispath(error('Tank Data Save Request Error. Please contact administrator.'));
            }
        })
        .catch(err => {
            dispath(error(err.response.data.message || 'ERROR'));
        });   
}

export const updateTankDetail = (data) => dispath => {
    axios.post(API_URL + `${TankDataAPIPath}/UpdateTankData`, data, config)
    .then(res => {
        if(res.data == true){
            dispath(RecordUpdateStatus('Tank Data Update Successfully.')) 
            dispath(clearAll());
        }
        else {
            dispath(error('Tank Data Update Request Error. Please contact administrator.'));
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

export const deleteLCDetail = (data) => dispath => {
    axios.post(API_URL + `${APIPath}/DeleteLoadingCondition`, data, config)
        .then(res => {
            if(res.data == true){
                dispath(RecordDeleteStatus('Loading Condition Data Deleted Successfully.')) 
                dispath(clearAll());
            }
            else {
                dispath(error('Loading Condition Delete Request Error. Please contact administrator.'));
            }
        })
        .catch(err => {
            dispath(error(err.response.data.message || 'ERROR'));
        });   
}

export const lcCopyAndCreate = (data) => dispath => {
    axios.post(API_URL + `${APIPath}/LCCopyAndCreate`, data, config)
        .then(res => {
            if(res.data == true){
                dispath(RecordCopyStatus('Loading Condition Copy and Create Successfully.')) 
                dispath(clearAll());
            }
            else {
                dispath(error('Loading Condition Copy and Create Request Error. Please contact administrator.'));
            }
        })
        .catch(err => {
            dispath(error(err.response.data.message || 'ERROR'));
        });   
}

export const clearError = () => dispath =>{
    dispath(error(''));
}