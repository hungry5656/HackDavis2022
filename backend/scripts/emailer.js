import nodemailer from "nodemailer"; 
import schedule from "node-schedule"; 

function sendEmail(data) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'vaxremind@gmail.com',
            pass: 'yorltvywmztxutlf',
        }
    });

    let mailOptions = {
        from: 'vaxremind@gmail.com',
        to: data.email,
        subject: 'Vaccination Reminder',
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

export default sendEmail; 