var schedule = require('node-schedule');

const accountSid = 'AC613a84670625eceacc958d8adace6c12';
const authToken = '15cda1e40e6473681279429f21cd1dff';
const client = require('twilio')(accountSid, authToken);


let nickName, pet_name, vaccination_type, date, phone_number;
nickName = 'Wenhao'
pet_name = 'pepper'
vaccination_type = 'Rabies'
date = '2022/4/16';
phone_number = '4258665228'



let data = {
    content: `Hi, this is a vaccination reminder: ${nickName} on ${date}. ${vaccination_type} vaccination. Don't forget to bring ${pet_name} to receive the vaccination.
    `
}
client.messages
    .create({
        body: data.content,
        from: '(986)345-3046',
        to: phone_number
    })
    .then(message => console.log(message.sid))
    .catch(err => console.log(err));

