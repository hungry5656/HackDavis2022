import vaccineData from '../Data/vaccine.json';
import mongoose from 'mongoose';

function updateDB(){
    // update to the next dose in mongoDB
    let email; // no need
    let phoneNum; // no need
    let lastApptDate;
    let nextApptDate;
    let doseType;
    let doseNum;
    let petType;
    const vaccineJSON = JSON.parse(vaccineData);

    doseNum++;
    nextApptDate = lastApptDate;

    if (doseNum == 1){
        // want to remind on the first appointment
        return;
    }
    vaccineVec = vaccineJSON[petType][doseType]["O16W"]["Vac"];

    let currentNum = doseNum;
    for (let i = 0; i < vaccineVec.length; i++){
        if (vaccineVec[i][1] == 0){
            nextApptDate = lastApptDate + vaccineVec[i][0] * 7;
        }
        if (currentNum - vaccineVec[i][1] < 0){
            nextApptDate = lastApptDate + vaccineVec[i][0] * 7;
        } else {
            currentNum -= vaccineVec[i][1];
        }
    }
}

export default updateDB;