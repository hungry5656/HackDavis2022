import express from 'express'
import Event from '../models/appts.model.js'; 

const router = express.Router(); 

function getDetailsFromRequest(req) {
    const name = req.body.name;
    const owner = req.body.owner; 
    const attendees = req.body.attendees; 
    const location = {
        address : req.body.address,
        lat     : req.body.lat, 
        lon     : req.body.lon
    }
    const description = req.body.description;
    const date_time = req.body.date_time;

    return {name, owner, attendees, location, description, date_time};
}

// POST request (create)
router.route('/add_event').post((req, res) => { 
    const detailsObj = getDetailsFromRequest(req); 
    const newEvent = new Event(detailsObj);

    newEvent.save()
    .then(() => res.json(newEvent))
    .catch(err => res.status(400).json('Error: ' + err));
    return req, res;
});

// PUT request (update)
router.route('/update_event/:id').put((req, res) => {
    Event.findById(req.params.id)
    .then(event => {
        const detailsObj = getDetailsFromRequest(req); 
        //event = new Event(detailsObj); 
        event.overwrite(detailsObj); 
        event.save()
        .then(() => res.json(event))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
    return req, res; 
});

// GET by ID request (maybe remove before prod)
router.route('/get_id/:id').get((req, res) => {
    Event.findById(req.params.id)
        .then(event=>res.json(event))
        .catch(err=>res.status(400).json('Error: ' + err));
}); 

//GET by Attendee request
router.route('/get_attendee/:attendee').get((req, res) => {
    var query = {attendees: req.params.attendee};
    Event.find(query)
        .then(event=>res.json(event))
        .catch(err=>res.status(400).json('Error: ' + err));
}); 

//GET by Owner request
router.route('/get_owner/:owner').get((req, res) => {
    var query = {owner: req.params.owner};
    Event.find(query)
        .then(event=>res.json(event))
        .catch(err=>res.status(400).json('Error: ' + err));
}); 

// DELETE request
router.route('/delete/:id').delete((req, res) => {
    Event.findByIdAndDelete(req.params.id)
    .then(event => res.json(event))
    .catch(err => res.status(400).json('Error:' + err));
});

//module.exports = router;
export default router; 