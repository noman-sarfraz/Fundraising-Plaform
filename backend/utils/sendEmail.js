const sgMail = require('@sendgrid/mail')

const sendEmail = async ({ to, subject, html }) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const message = {
    from: 'fyp195@gmail.com', // sender address
    to,
    subject,
    html,
  }
  return sgMail.send(message);
};

module.exports = sendEmail;
