const express = require("express");
const connectDB = require("./config/db");

//Setting up the express server
const app = express();

//Connect the database
connectDB();

//Init middleware
app.use(express.json({ extended: false })); //Now we can accept body data

//An endpoint to hit. Form of: app.ACTION(verb).
app.get("/", (req, res) =>
  res.json({ msg: "Welcome to the contact keeper API" })
);

//Define Routes
app.use("/api/users", require("./routes/users")); //All backend routes start with "/api"
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) =>
  console.log(`Express server running on ${PORT}`)
);
