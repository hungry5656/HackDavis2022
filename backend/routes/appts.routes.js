import express from 'express'
import Appointment from '../models/appts.model.js';
import updateDB from '../scripts/updateDB.js';

const router = express.Router(); 

function getDetailsFromRequest(req) {
    const email = req.body.email; 
    const phoneNum = req.body.phoneNum; 
    const doseType = req.body.doseType; 
    const doseNum = req.body.doseNum; 
    const petType = req.body.petType;

    // One of these MUST be provided by the user
    // depending on if the first dose has been taken or not 
    // last appointment that occurred 
    // user provides this if first dose has happened
    const lastDate = req.body.lastApptDate; 

    // date of next appointment
    // not required, but exists 
    // user provides this 
    // if first dose hasn't happened yet
    const apptDate = req.body.nextApptDate; 
    
    // Detect invalid input
    if ((doseNum > 0 && lastDate == null) || (doseNum == 0 && apptDate == null) || doseNum < 0) { return null; }
    
    return { email, phoneNum, apptDate, lastDate, doseType, doseNum, petType};
}

// POST request (create)
router.route('/add').post((req, res) => { 
    const detailsObj = getDetailsFromRequest(req); 
    if (detailsObj === null) { 
        res.status(400).json('Invalid input'); 
        return req, res;
    } 
    const newAppt = new Appointment(detailsObj);

    newAppt.save()
    .then(() => res.json(newAppt))
    .catch(err => res.status(400).json('Error: ' + err));

    return req, res;
});

// TESTING PUT request (run updatedb by object id)
router.route('/update/:id').put((req, res) => {
    Appointment.findById(req.params.id).then(
        appt => {
            console.log("Found appt")
            updateDB(appt); 
            res.json(appt); 
        }
    ).catch(err => res.status(400).json('Error: ' + err))
    return req, res
})

/*
// PUT request (update)
router.route('/update/:id').put((req, res) => {
    Appointment.findById(req.params.id)
    .then(appt => {
        const detailsObj = getDetailsFromRequest(req);
        appt.overwrite(detailsObj); 
        appt.save()
        .then(() => res.json(appt))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
    return req, res; 
});

// GET by ID request (maybe remove before prod)
router.route('/get/:id').get((req, res) => {
    Appointment.findById(req.params.id)
        .then((appt)=>res.json(appt))
        .catch((err)=>res.status(400).json('Error: ' + err));
});
*/

// DELETE request
router.route('/delete/:id').delete((req, res) => {
    Appointment.findByIdAndDelete(req.params.id)
    .then((appt) => res.json(appt))
    .catch(err => res.status(400).json('Error:' + err));
});


export default router; 