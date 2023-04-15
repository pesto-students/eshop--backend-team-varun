const nodeMailer = require("nodemailer");

const receiveEmail = async(options)=>{
   const transporter = nodeMailer.createTransport({
       host: process.env.SMPT_HOST,
       port: process.env.SMPT_PORT,
       service: process.env.SMPT_SERVICE,
       auth:{
           user: process.env.SMPT_MAIL,
           pass: process.env.SMPT_PASSWORD,
       },

   });

   const mailOptions = {
  
       to:process.env.SMPT_MAIL,
       subject: ` Message from ${options.email}: ${options.subject}`,
       text: options.message,
   };

//    console.log(`
//    ${mailOptions.from}
//    ${mailOptions.subject}
//    ${mailOptions.text}
 
//    `)
   await transporter.sendMail(mailOptions);

};



module.exports = receiveEmail;