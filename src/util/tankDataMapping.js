import isEmpty from "./isEmpty";

const tankDataMapping = (value) => {
    let dataObjArr = [];

    for(var data of value){
        let obj = {
            ID: data.ID,
            LoadingConditionID: data.LoadingConditionID,
            tankName: data.TankName,
            maxVolume: !isEmpty(data.MaxVolume) ? data.MaxVolume : 0,
            density: !isEmpty(data.Density) ? data.Density : '',
            sounding: !isEmpty(data.Sounding) ? data.Sounding : 0,
            fil: !isEmpty(data.Fil) ? data.Fil : 0,
            weight: !isEmpty(data.Weight) ? data.Weight : 0,
            location: !isEmpty(data.Location) ? data.Location : '',
            LCG: !isEmpty(data.LCG) ? data.LCG : 0,
            TCG: !isEmpty(data.TCG) ? data.TCG : 0,
            VCG: !isEmpty(data.VCG) ? data.VCG: 0
        }

        dataObjArr.push(obj);
    }

    return dataObjArr;
}

export default tankDataMapping;