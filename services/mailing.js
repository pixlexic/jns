'use strict';
const nodemailer = require('nodemailer');
const Helpers = require('../services/helpers');

const mailing = {};

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: process.env.mailHost,
    port: process.env.mailPort,
    secure: Helpers.parseBool(process.env.mailSecure), // true for 465, false for other ports
    auth: {
        user: process.env.mailUser, // generated ethereal user
        pass: process.env.mailPass // generated ethereal password
    }
});



mailing.testSend = function(){
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Fred Foo 👻" <' + process.env.mailUser + '>', // sender address
        to: 'jones@allesonathletic.com ', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});


}

module.exports = mailing;