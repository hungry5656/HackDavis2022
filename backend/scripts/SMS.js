import schedule from 'node-schedule';

const accountSid = 'AC613a84670625eceacc958d8adace6c12';
const authToken = '7add8275886c867268f851abc640c94b';
//const client = require('twilio')(accountSid, authToken);
import twilio from 'twilio'; 
const client = twilio(accountSid, authToken); 
// let nickName, pet_name, vaccination_type, date, phone_number;
// nickName = 'Wenhao'
// pet_name = 'pepper'
// vaccination_type = 'Rabies'
// date = '2022/4/16';
// phone_number = '4258665228'
let SMSsender = {}; 

SMSsender.sendSMS = (sendTo, msgContent) => {
    let data = {
        content: msgContent
    }

    client.messages
    .create({
        body: data.content,
        from: '(986)345-3046',
        to: sendTo
    })
    .then(message => console.log(message.sid))
    .catch(err => console.log(err));
}

export default SMSsender;
