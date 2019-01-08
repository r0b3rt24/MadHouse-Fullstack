const express = require("express");
const mongoose = require("mongoose");
const app = express();
const mainRoute = express.Router();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;
const userRoute = require("./routes/userRoute");

mainRoute.get("", (req, res) => {
  res.send("This is the home of Madhouse");
});

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Setting up router for the user
app.use("/user", userRoute);
app.use("/", mainRoute);

// Setting up port for the host
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
