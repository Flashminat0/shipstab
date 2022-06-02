import isEmpty from "./isEmpty";
const fwDataMapping = (value) => {
    let dataObjArr = [];

    for(var data of value){
        let obj = {
            ID: data.ID,
            LoadingConditionID: data.LoadingConditionID,
            itemName: data.ItemName,
            weight: !isEmpty(data.Weight) ? data.Weight : '0',
            location: !isEmpty(data.Location) ? data.Location : '',
            LCG: !isEmpty(data.LCG) ? data.LCG : '0',
            TCG: !isEmpty(data.TCG) ? data.TCG : '0',
            VCG: !isEmpty(data.VCG) ? data.VCG : '0',
            AFTLocation: !isEmpty(data.AFTLocation) ? data.AFTLocation : '',
            fordLocation: !isEmpty(data.FORDLocation) ? data.FORDLocation : ''
        }

        dataObjArr.push(obj);
    }

    return dataObjArr;
}

export default fwDataMapping;