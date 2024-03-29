

var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
const creds = require('../config/nodemailer');

console.log('Welcome');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


var transport = {
  host: 'smtp.gmail.com',
  auth: {
    user: creds.USER,
    pass: creds.PASS
  }
}


var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messsaages');
  }
});


router.post('/send', (req, res, next) => {
  var name = req.body.name
  var email = req.body.email
  var message = req.body.message
  var content = `name: ${name} \n email: ${email} \n message: ${content} `

  var mail = {
    from: name,
    to: 'sticktothecode89@gmail.com',  //Change to email address that you want to receive messages on
    subject: 'New message received in MG Website',
    text: content
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })
})





module.exports = router;


