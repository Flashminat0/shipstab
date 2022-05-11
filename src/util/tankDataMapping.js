const tankDataMapping = (value) => {
    let dataObjArr = [];

    for(var data of value){
        let obj = {
            ID: data.ID,
            LoadingConditionID: data.LoadingConditionID,
            tankName: data.TankName,
            maxVolume: data.MaxVolume,
            density: data.Density,
            sounding: data.Sounding,
            fil: data.Fil,
            weight: data.Weight,
            location: data.Location,
            LCG: data.LCG,
            TCG: data.TCG,
            VCG: data.VCG
        }

        dataObjArr.push(obj);
    }

    return dataObjArr;
}

export default tankDataMapping;