const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const app = express()
require('dotenv').config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false }))

var transport = {
 host: process.env.HOST,
 auth: {
   user: process.env.EMAIL,
   pass: process.env.PASSWORD
 }
}
var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
 if (error) {
   console.log(error);
 } else {
   console.log('Server is ready to take messages');
 }
});
app.post('/send', (req, res, next) => {
 var name = req.body.name
 var email = req.body.email
 var message = req.body.message
 var address = req.body.address
 var content = `name: ${name} \n email: ${email} \n message: ${message} \n address: ${address}`

 var mail = {
   from: name,
   to: process.env.EMAIL,  //Change to email address that you want to receive messages on
   subject: 'New Message from Contact Form',
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
const PORT = process.env.PORT

app.listen(PORT, ()=>{
   console.log(`Server listen on port ${PORT}`);
})