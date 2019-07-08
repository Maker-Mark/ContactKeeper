const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

//Setting up the express server
const app = express();

//Connect the database
connectDB();

//Init middleware
app.use(express.json({ extended: false })); //Now we can accept body data

//Define Routes
app.use("/api/users", require("./routes/users")); //All backend routes start with "/api"
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

//Serve static assets in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Express server running on ${PORT}`));
