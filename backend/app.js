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

// authenticators
const authenticateFundraiser = require("./middleware/Authentication/fundraiserAuthentication");
const authenticateDonor = require("./middleware/Authentication/donorAuthentication");
const authenticateAdmin = require("./middleware/Authentication/adminAuthentication");

// fileupload
const fileUpload = require("express-fileupload");

// import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const fundraiserRoutes = require("./routes/fundraiser");
const donorRoutes = require("./routes/donor");
const adminRoutes = require("./routes/adminRouter");
const bankRoutes = require("./routes/bankRoutes");
const campaignRoutes = require("./routes/campaignRoutes");
const uploadsRoutes = require("./routes/uploadsRoutes");

// error handlers
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// extra required packages
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// MAIN WORK

app.use(cors());
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

app.use("/api/v1/", authRoutes);
app.use("/api/v1/fundraisers", fundraiserRoutes);
app.use("/api/v1/donors", authenticateDonor, donorRoutes);
app.use("/api/v1/admins", authenticateAdmin, adminRoutes);
app.use("/api/v1/banks", bankRoutes);
app.use("/api/v1/campaigns", campaignRoutes);
app.use("/api/v1/uploads", uploadsRoutes);

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
