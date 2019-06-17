

const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(sendgrid_key);

exports.send = async(to, subject, body)=> {
    sendgrid.send({
        to: to,
        from: 'rabelogabriel72@gmail.com',
        subject: subject,
        html: body
    });
}