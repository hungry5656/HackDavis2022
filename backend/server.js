import express from 'express';
import mongoose from 'mongoose'; 
import cors from 'cors';
import dotenv from 'dotenv'; 
import bodyParser from 'body-parser';
import schedule, { RecurrenceRule } from "node-schedule";

import Emailer from './scripts/emailer.js'; 
import apptsRouter from './routes/appts.routes.js';
import dailyCheck from "./scripts/dailyCheck.js"

dotenv.config(); //loads variables from env

const app = express();
const port = 5000;

app.use(cors());

// Enable pre-flight for the PUT and DELETE routes 
// IDK this article told me to 
// https://expressjs.com/en/resources/middleware/cors.html
app.options('/update/:id', cors())
app.options('/delete/:id', cors())

app.use(bodyParser.json());
app.use('/appts', apptsRouter); 

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

const uri = process.env.ATLAS_URI; //load mongodb uri
//connect to mongodb
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully.");
});

const emailUser = process.env.EMAIL_AUTH_USER;
const emailPass =  process.env.EMAIL_AUTH_PASS;
Emailer.setCredentials(emailUser, emailPass); 
// Final recurrence scheudling
const rule = new RecurrenceRule();
rule.day = 1;
/*
const job = schedule.scheduleJob(rule, function(){
    dailyCheck();
});
*/