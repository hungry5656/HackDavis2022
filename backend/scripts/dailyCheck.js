import mongoose from 'mongoose';
import schedule from "node-schedule";
import Appointment from '../models/appts.model.js'
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
    let today = new Date.now(); 
    let todayDateString = dateConvertToString(today); 
    let nextWeek = today.addDays(7);
    let nextWeekDateString = dateConvertToString(nextWeek); 

    // Find all documents of type Appointment with nextApptDate = todayDateString
    Appointment.find({nextApptDate: todayDateString}).array.forEach(
        (appt) => {
            updateDB(appt);
            console.log("UpdateDB ran"); 
        }
    );
    Appointment.find({nextApptDate: nextWeekDateString}).array.forEach(
        (appt) => {
            // Send reminder
            console.log("Reminder dispatched");    
        }
    )
}


export default dailyCheck;