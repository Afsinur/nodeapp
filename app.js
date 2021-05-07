var express = require("express");

var app = express();
app.set("view engine", "ejs");

app.listen(process.env.PORT, () => {
  console.log("listening..");
});

app.get("/", (req, res) => {
  var username = "afsinur";
  res.render("index", { username });
});
