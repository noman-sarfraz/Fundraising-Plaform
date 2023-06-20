require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

// connectDB
const connectDB = require("./db/connect");

// connect cloudinary
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// fileupload
const fileUpload = require("express-fileupload");

// import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const campaignRoutes = require("./routes/campaignRoutes");
const donationRoutes = require("./routes/donationRoutes");
const uploadsRoutes = require("./routes/uploadsRoutes");
// const stripeRoutes = require("./routes/stripeRoutes");
const accountRoutes = require("./routes/accountRoutes");

// error handlers
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// extra required packages
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// authenticator
const {
  authenticateUser,
  authorizePermissions,
} = require("./middleware/authenticate-user");

// MAIN WORK

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/", (req, res) => {
  res.send("Fundaising Platform API");
});

// routes
app.use("/api/v1/", authRoutes);
app.use("/api/v1/users", authenticateUser, userRoutes);
app.use("/api/v1/categories", authenticateUser, categoryRoutes);
app.use("/api/v1/donations", authenticateUser, donationRoutes);
app.use("/api/v1/uploads", authenticateUser, uploadsRoutes);
// app.use("/api/v1/stripe", authenticateUser, stripeRoutes);
app.use("/api/v1/campaigns", campaignRoutes);
app.use("/api/v1/accounts", authenticateUser, accountRoutes);

// using middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
