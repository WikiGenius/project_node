const nodemailer = require('nodemailer');
require('dotenv').config({ path: '../../config/config.env' });

module.exports.sendEmail = async options => {
  // Create a transporter using SMTP (Simple Mail Transfer Protocol)

  const transporter = nodemailer.createTransport({
    host: process.env.FROM_EMAIL_HOST,
    port: process.env.FROM_EMAIL_PORT,
    auth: {
      user: process.env.FROM_EMAIL_USERNAME,
      pass: process.env.FROM_EMAIL_PASS
    }
  });
  // Setup email data
  const mailOptions = {
    from: process.env.FROM_EMAIL_HOST,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html
  };
  // Send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);
  console.log('Message sent: %s', info.messageId);
};
