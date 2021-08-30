const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

// Load env configuration
dotenv.config();

//Listening to port
app.listen(process.env.PORT || PORT, () => {
  console.log("Node.js Server is running on port 5000");
});

// Connect to mongodb database with environment connection
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => console.log("Connected to DB")
);

// Makes the app able to recognize json data from request body..
app.use(express.json());
app.use(methodOverride());

app.set("view engine", "ejs");
// Import model
const { User } = require("./routes/model/User");

//list the data
app.get("/", async (req, res) => {
  const allUser = await User.find();
  res.render("contact", { allUser: allUser });
});

//Get the data
app.get("/", (req, res) => {
  res.send("Welcome to Node.js Home page.");
});

// Import route modules
const userRoutes = require("./routes/users");

app.use("/contact", userRoutes);
