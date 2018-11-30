var nodeMailer = require('nodemailer');

module.exports.email = (name,email,password) => { 
    let transporter = nodeMailer.createTransport({
      service: 'Gmail',
      auth: {
          user: 'yash.chapter247@gmail.com',
          pass: 'durgesh@90099'
      }
   });
   var mailOptions = {
      from: '"Rental Portal" <yash.chapter247@gmail.com>', // sender address
      to: email,// list of receivers
      subject: 'Email Verification for Rental Point', // Subject line
      html: "<h1>Welcome to RentalPoint.com</h1><br>You have successfully registered on application ,your login credentials are <br><br> Username: "+email+"<br>Password: "+password+"<h1>Click on link below to verify account</h1><br><br> http://localhost:3000/verify/"+email
    };
   
   transporter.sendMail(mailOptions, function(error, info){
      if(error)
      {
         return console.log(error);
      }
      else
      { 
         return console.log(info.response);
      }      
   }); 
}