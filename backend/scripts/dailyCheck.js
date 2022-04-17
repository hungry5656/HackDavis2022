import mongoose from 'mongoose';
import schedule from "node-schedule";
import Appointment from '../models/appts.model.js'
import updateDB from "./updateDB.js";
import Emailer from "./emailer.js"; 
import SMSsender from './SMS.js';

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
            Emailer.sendEmail(
                appt.email, 
                "Vaccination Reminder", 
                ` <p style="text-indent: 2em;"> Dear ${appt.userName} </p>
                <p style="text-indent: 2em;">We're so happy your ${appt.petType} ${appt.petName} will be receiving ${appt.doseType} vaccination tomorrow.</p>
                <p style="text-indent: 2em;">Don't forget to bring pet to receive the vaccination</p>
                <p> </p>
                `
            );
            console.log("Reminder dispatched");
            SMSsender.sendSMS(
                appt.phoneNum,
                ` Hi, this is a vaccination reminder: ${appt.userName} on ${appt.nextApptDate}. ${appt.doseType} vaccination. Don't forget to bring your ${appt.petType} ${appt.petName} to receive the vaccination.
                `
            )  
        }
    )
}


export default dailyCheck;