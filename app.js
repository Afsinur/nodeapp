var express = require("express");

var app = express();
app.set("view engine", "ejs");

var porT = process.env.PORT || "1000";
app.listen(porT, () => {
  console.log(`listening on port ${porT}..`);
});

app.get("/", (req, res) => {
  var username = "Test_from_pc";
  res.render("index", { username });
});
