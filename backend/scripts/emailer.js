import nodemailer from "nodemailer"; 
import schedule from "node-schedule";

let emailUser = null; 
let emailPass = null; 

function _sendEmail(data) {
    if (emailUser == null || emailPass == null) { 
        console.log("Please set email credentials first."); 
        return; 
    };

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: emailUser,
            pass: emailPass,
        }
    });

    let mailOptions = {
        from: "VetVax <" + emailUser + ">",
        to: data.sendTo,
        subject: data.subject,
        html: data.content
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent;', info.response);
    });
}

/*
let nickName, pet_type, vaccination_type;
nickName = 'Vaccination Reminder'
pet_type = 'cat'
vaccination_type = 'Rabies'

let data = {
    email: 'vaxremind@ucdavis.edu',
    content: ` <p style="text-indent: 2em;"> Dear ${nickName} </p>
    <p style="text-indent: 2em;">We’re so happy your ${pet_type} will be receiving ${vaccination_type} vaccination tomorrow.</p>
    <p style="text-indent: 2em;">Don't forget to bring pet to receive the vaccination</p>
    <p> </p>
    `
}

sendEmail(data) 
*/

let Emailer = {}
// We would like to remind you to make an appointment for you ${pet_type} to receive the ${vax_type} about a week from today. 
Emailer.sendEmail = (sendTo, subject, msgContent) => { 
    let data = {
        sendTo: sendTo,
        subject: subject, 
        content: msgContent
    }

    _sendEmail(data); 
}
Emailer.setCredentials = (user, pass) => {
    if (typeof(user) == "string") { emailUser = user; }
    if (typeof(pass) == "string") { emailPass = pass; }
    console.log("emailer.js setCredentials was called. Current credentials: " + emailUser + " " + emailPass);
}
export default Emailer; 