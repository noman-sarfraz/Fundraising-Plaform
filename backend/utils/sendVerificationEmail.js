const sendEmail = require("./sendEmail");

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const link = `${origin}/verify-email?verificationToken=${verificationToken}&email=${email}`;
  const message = `Click the following link to verify your email: <a clicktracking="off" href="${link}">Verify Email</a>`;

  const html = `<h4>Hello, ${name}</h4><p>${message}</p>`;
  return sendEmail({ to: email, subject: "Email Verification", html });
};

module.exports = sendVerificationEmail;
