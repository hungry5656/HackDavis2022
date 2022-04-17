import mongoose from 'mongoose';

import vaccineJSON from "../Data/vaccine.js"; 
//let vaccineJSON = require("../Data/vaccine.json"); 
/*fetch("../Data/vaccine.json")
.then((response) => {
    vaccineJSON = response.json(); 
});*/

function updateAppt(appt, obj) {
    let returnValue = null; 
    console.log(obj); // Debug
    appt.overwrite(obj);
    appt.save()
    .then((updatedAppt) => {
        console.log("Updated appointment successfully")
        returnValue = updatedAppt; 
    }).catch((err) => console.log("Something went wrong, " + err));
    return returnValue;
}

// Runs on the scheduled day of the appointment
function updateDB(appt){
    let obj = appt; // Implicitly cast appt to obj 
    console.log(obj); // Debug

    obj.doseNum++; // We are now reminding for the (n + 1)th dose

    if (obj.doseNum == 1) {
        appt = updateAppt(appt, obj);
        return appt; 
    }
    
    // Only do this if doseNum > 1 
    // Otherwise lastApptDate = nextApptDate at the end of updateDB
    if (obj.nextApptDate == null){    
        // Higher order dose, need to calculate next date
        let vaccineVec = vaccineJSON[obj.petType][obj.doseType]["O16W"]["Vac"];
        let currentNum = obj.doseNum;
        for (let i = 0; i < vaccineVec.length; i++){
            if (vaccineVec[i][1] == 0){
                let days = vaccineVec[i][0] * 7 + 1;
                obj.nextApptDate = obj.lastApptDate.addDays(days);
                //appt = updateAppt(appt, obj); 
                //return appt;
                break;
            }
            if (currentNum - vaccineVec[i][1] < 0){
                let days = vaccineVec[i][0] * 7 + 1;
                obj.nextApptDate = obj.lastApptDate.addDays(days);
                //appt = updateAppt(appt, obj); 
                //return appt;
                break;
            } else {
                currentNum -= vaccineVec[i][1];
            }
        }
    } else {
        obj.lastApptDate = obj.nextApptDate;
        // Higher order dose, need to calculate next date
        let vaccineVec = vaccineJSON[obj.petType][obj.doseType]["O16W"]["Vac"];
        let currentNum = obj.doseNum;
        for (let i = 0; i < vaccineVec.length; i++){
            if (vaccineVec[i][1] == 0){
                let days = vaccineVec[i][0] * 7 + 1;
                obj.nextApptDate = obj.nextApptDate.addDays(days);
                //appt = updateAppt(appt, obj); 
                //return appt;
                break;
            }
            if (currentNum - vaccineVec[i][1] < 0){
                let days = vaccineVec[i][0] * 7 + 1;
                obj.nextApptDate = obj.nextApptDate.addDays(days);
                //appt = updateAppt(appt, obj); 
                //return appt;
                break;
            } else {
                currentNum -= vaccineVec[i][1];
            }
        }
    }
    
    appt = updateAppt(appt, obj); 
    return appt;
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function dateConvertToString(day0){
    let year = day0.getFullYear();
    let months = day0.getMonth() + 1;
    let days = day0.getDate() + 1;
    let retVal = year + '-' + months + '-' + days;
    return retVal;
}

export default updateDB;