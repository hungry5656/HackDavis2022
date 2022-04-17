import vaccineData from '../Data/vaccine.json';
import mongoose from 'mongoose';

function updateDB(obj){
    // update to the next dose in mongoDB
    const vaccineJSON = vaccineData;
    obj.doseNum++;
    obj.lastApptDate = obj.nextApptDate;

    if (obj.doseNum == 1){
        // want to remind on the first appointment
        return;
    }
    let vaccineVec = vaccineJSON[petType][doseType]["O16W"]["Vac"];
    let currentNum = obj.doseNum;
    for (let i = 0; i < vaccineVec.length; i++){
        if (vaccineVec[i][1] == 0){
            obj.nextApptDate = obj.nextApptDate.addDays(vaccineVec[i][0] * 7);
            console.log("wow");
            return;
        }
        if (currentNum - vaccineVec[i][1] < 0){
            let days = vaccineVec[i][0] * 7;
            obj.nextApptDate = obj.nextApptDate.addDays(days);
            console.log(days);
            return;
        } else {
            currentNum -= vaccineVec[i][1];
        }
    }
    return;
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function DateConvertToStr(day0){
    let year = day0.getFullYear();
    let months = day0.getMonth() + 1;
    let days = day0.getDate() + 1;
    let retVal = year + '-' + months + '-' + days;
    return retVal;
}

export default updateDB;