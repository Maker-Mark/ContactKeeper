const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) =>
  console.log(`Express server running on ${PORT}`)
);

//An endpoint to hit. Form of: app.ACTION(verb).
app.get("/", (req, res) => res.send("Hello"));
