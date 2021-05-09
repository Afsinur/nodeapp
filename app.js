var express = require("express");
var portNum = process.env.PORT || "1000";
var userID;
var socket = require("socket.io");

var app = express();
app.set("view engine", "ejs");

//Server setup

//Port setup
var server = app.listen(portNum, () => {
  console.log("listening stated..");
});

//setting static folder
app.use(express.static("./public"));

//socket setup
var io = socket(server);

io.on("connect", (socket) => {
  console.log("connected ID: " + socket.id);
  userID = socket.id;

  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});

//get dynamic server
app.get("/", (req, res) => {
  res.render("index", { userID });
});
