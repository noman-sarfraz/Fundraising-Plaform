const sendEmail = require("./sendEmail");

const sendCampaignStatusChangeEmail = async (
  name,
  email,
  role,
  origin
) => {
  const message = `Admin has reviewed your campaign. Click the following link to see the campaign.`;
  const html = `<h4>Hello, ${name}</h4><p>${message}</p>`;
  return sendEmail({ to: email, subject: "Campaign Status", html });
};

module.exports = sendCampaignStatusChangeEmail;