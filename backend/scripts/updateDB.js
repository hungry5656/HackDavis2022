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

function updateDB(appt){
    // update to the next dose in mongoDB
    
    /*// Convert appt into an obj
    let obj = {
        "doseNum": appt.doseNum,
        "lastApptDate": Date(appt.lastApptDate), 
        "nextApptDate": Date(appt.nextApptDate), 
    }*/
    let obj = appt; // implicitly cast appt to obj (?) 
    console.log(obj); 
    obj.doseNum++; // We are now reminding for the (n + 1)th dose
    obj.lastApptDate = obj.nextApptDate; 

    if (obj.doseNum == 1){
        // want to notify of the first appointment
        appt = updateAppt(appt, obj); 
        return appt;
    } else {

    }

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