const sendEmail = require("./sendEmail");

const sendResetPasswordEmail = async (
  name,
  email,
  role,
  passwordToken,
  origin
) => {
  const message = `Click the following link to reset your password: localhost:5000/api/v1/verify-email</br>
  {
    "role":"${role}",
    "passwordToken":"${passwordToken}",
    "email":"${email}"
  }`;
  const html = `<h4>Hello, ${name}</h4><p>${message}</p>`;
  return sendEmail({ to: email, subject: "Reset Password", html });
};

module.exports = sendResetPasswordEmail;
