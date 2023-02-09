var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'Outlook',
    auth: {
        user: 'saquibmehmood@hotmail.com',
        pass: 'HQ4101056'
    }
});

var mailOptions = {
    from: 'saquibmehmood@hotmail.com',
    to: 'saquibmehmood@gmail.com',
    subject: 'Testing this Nodemailer',
    text: 'Hello Moron! It is pretty fucked up.'
}


transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
        console.log(error);
    } else {
        console.log('Email sent: ' +info.response)
    }
});