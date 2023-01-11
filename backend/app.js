require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

// connectDB
const connectDB = require("./db/connect");

// authenticators
const authenticateFundraiser = require("./middleware/fundraiserAuthentication");
const authenticateDonor = require("./middleware/donorAuthentication");

// import routes
const authRoutes = require("./routes/auth");
const fundraiserRoutes = require("./routes/fundraiser");
const donorRoutes = require("./routes/donor");

// error handlers
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// extra required packages
const cors = require("cors");


// MAIN WORK

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Fundaising Platform API");
});

app.use("/api/v1/", authRoutes);
app.use("/api/v1/fundraisers", authenticateFundraiser, fundraiserRoutes); 
app.use("/api/v1/donors", authenticateDonor, donorRoutes);

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
