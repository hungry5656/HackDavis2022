import express from 'express';
import mongoose from 'mongoose'; 
import cors from 'cors';
import dotenv from 'dotenv'; 
import eventsRouter from './routes/appts.routes.js';
import bodyParser from 'body-parser'; 

const app = express();
const port = 5000;

const vaccines = {
    "Dog": {
        "Rabies":{
            "U16W": {

            },
            "O16W": {
    
            }
        }
    },
    "Cat": {

    }
}

dotenv.config(); //loads variables from env
app.use(cors());

// Enable pre-flight for the PUT and DELETE routes 
// IDK this article told me to 
// https://expressjs.com/en/resources/middleware/cors.html
app.options('/update/:id', cors())
app.options('/delete/:id', cors())

app.use(bodyParser.json());
app.use('/appts', eventsRouter); 

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