const fwDataMapping = (value) => {
    let dataObjArr = [];

    for(var data of value){
        let obj = {
            ID: data.ID,
            LoadingConditionID: data.LoadingConditionID,
            itemName: data.ItemName,
            weight: data.Weight,
            location: data.Location,
            LCG: data.LCG,
            TCG: data.TCG,
            VCG: data.VCG,
            AFTLocation: data.AFTLocation,
            fordLocation: data.FORDLocation
        }

        dataObjArr.push(obj);
    }

    return dataObjArr;
}

export default fwDataMapping;