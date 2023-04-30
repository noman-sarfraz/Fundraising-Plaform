const sendEmail = require("./sendEmail");

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const message = `Click the following link to verify your email: localhost:5000/api/v1/verify-email
  {
    "verificationToken":"${verificationToken}",
    "email":"${email}"
  }`;
  const html = `<h4>Hello, ${name}</h4><p>${message}</p>`;
  return sendEmail({ to: email, subject: "Email Verification", html });
};

module.exports = sendVerificationEmail;
