var nodemailer = require('nodemailer');
var settings=require('./settings.js');
// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: settings.mailOptions.service,
    auth: {
        user: settings.mailOptions.auth_user,
        pass: settings.mailOptions.auth_pass
    }
});

var mailOptions = {            //设置发送邮件选项
    from: settings.mailOptions.from, // sender address
    to: settings.mailOptions.to, // list of receivers
    subject: settings.mailOptions.subject, // Subject line
    text: '', // plaintext body
    html: '<b></b>' // html body
};


exports.sendMail=function(data){
    mailOptions.text=data;
    mailOptions.html='<b>'+data+'</b>';
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
};
