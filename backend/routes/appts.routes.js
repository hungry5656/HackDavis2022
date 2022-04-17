import express from 'express'
import Appointment from '../models/appts.model.js';

const router = express.Router(); 

function getDetailsFromRequest(req) {
    const email = req.body.email; 
    const phoneNum = req.body.phoneNum; 
    const apptDate = req.body.apptDate; // next appointment to notify for
    const lastDate = req.body.lastDate; // last appointment that occurred 
    const doseType = req.body.doseType; 
    const doseNum = req.body.doseNum; 

    return { email, phoneNum, apptDate, lastDate, doseType, doseNum };
}

// POST request (create)
router.route('/add').post((req, res) => { 
    const detailsObj = getDetailsFromRequest(req); 
    const newAppt = new Appointment(detailsObj);

    newAppt.save()
    .then(() => res.json(newAppt))
    .catch(err => res.status(400).json('Error: ' + err));
    return req, res;
});

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

// DELETE request
router.route('/delete/:id').delete((req, res) => {
    Appointment.findByIdAndDelete(req.params.id)
    .then((appt) => res.json(appt))
    .catch(err => res.status(400).json('Error:' + err));
});


export default router; 