const sendEmail = require("./sendEmail");

const sendResetPasswordEmail = async ({
  name,
  email,
  passwordToken,
  origin,
}) => {
  const link = `${origin}/reset-password?passwordToken=${passwordToken}&email=${email}`;
  const message = `Click the following link to reset your password: <a clicktracking="off" href="${link}">Reset Password</a>`;

  const html = `<h4>Hello, ${name}</h4><p>${message}</p>`;
  return sendEmail({ to: email, subject: "Reset Password", html });
};

module.exports = sendResetPasswordEmail;
