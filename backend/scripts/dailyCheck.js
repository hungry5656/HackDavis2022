import mongoose from 'mongoose';
import schedule from "node-schedule";
import Appointment from '../models/appts.model'
import updateDB from "./updateDB.js";
/*
Time check on daily basis
For reminder: (every day)
For every appt in appointments 
If nextapptdate - 7 days = today 
Notify 
Elseif nextapptdate = today 
Update data
Else
Nothing
*/

function dailyCheck(){
    let today = Date(); 
    let todayDateString = dateConvertTostr(today); 

    // Find all documents of type Appointment with nextApptDate = todayDateString
    Appointment.find({nextApptDate: todayDateString})
    .then((appt) => {
        const email = appt.email; 
    })
    .catch((err) => {
        console.log('Error: ' + err)
    })
}


export default dailyCheck;