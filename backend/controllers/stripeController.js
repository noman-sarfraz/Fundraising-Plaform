const { StatusCodes } = require("http-status-codes");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const cardPayment = async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "pkr",
  });

  res.status(StatusCodes.OK).json({
    clientSecret: paymentIntent.client_secret,
  });
};

module.exports = { cardPayment };
