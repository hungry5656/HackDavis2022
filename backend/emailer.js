const nodemailer = require('nodemailer');
var schedule = require('node-schedule');

function sendEmail(data) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'whhu02@gmail.com',
            pass: 'yzvydfoallxaazub',
        }
    });

    let mailOptions = {
        from: '"whhu02@gmail.com',
        to: data.email,
        subject: 'Vaccination reminder',
        html: data.content
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent；', info.response);
    });
}

let nickName, pet_type, vaccination_type;
nickName = 'Wenhao'
pet_type = 'cat'
vaccination_type = 'Rabies'

let data = {
    email: 'whhu@ucdavis.edu',
    content: ` <p style="text-indent: 2em;"> Dear ${nickName} </p>
    <p style="text-indent: 2em;">We’re so happy your ${pet_type} will be receiving ${vaccination_type} vaccination tomorrow.</p>
    <p style="text-indent: 2em;">Don't forget to bring pet to receive the vaccination</p>
    <p> </p>
    `
}

sendEmail(data) 