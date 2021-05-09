var socket = io.connect(`/`);
var matchDataName = [];
var _direction = "down";

//DOM
var username = document.getElementById("name"),
  message = document.getElementById("message"),
  send = document.getElementById("send"),
  messages = document.getElementById("messages"),
  typing = document.getElementById("typing"),
  chatContainer = document.getElementById("chatContainer");

var _top = chatContainer.scrollTop;

//scroll function
chatContainer.addEventListener("scroll", () => {
  var _cur_top = chatContainer.scrollTop;

  if (_top < _cur_top) {
    _direction = "down";
  } else {
    _direction = "up";
  }
  _top = _cur_top;
});

//handlers
send.addEventListener("click", () => {
  var io_id = userID;
  var nameValue = username.value || userID,
    messageValue = message.value;

  socket.emit("chat", {
    nameValue,
    messageValue,
    io_id,
  });

  message.value = "";
});

message.addEventListener("keyup", () => {
  var nameValueBroadcast = username.value;

  if (message.value != "") {
    socket.emit("typing", nameValueBroadcast);
  } else {
    socket.emit("typing", null);
  }
});

//listen for socket
socket.on("chat", ({ nameValue, messageValue, io_id }) => {
  if (io_id !== userID) {
    messages.innerHTML += `<p style="align-self:flex-start;background:#707070;"><span>${nameValue}:<br>${messageValue}</span></p>`;
  } else {
    messages.innerHTML += `<p style="align-self:flex-end;background:#444;color:#fff;text-align: right;"><span>you:<br>${messageValue}</span></p>`;
  }

  typing.innerHTML = "";
  matchDataName = [];

  if (_direction == "down") {
    typing.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }
});

socket.on("typing", (data) => {
  if (data != null) {
    if (matchDataName.length == 0) {
      typing.innerHTML = `<p><em>${data}</em> is tpying a message..</p>`;
      matchDataName.push(data);
    } else {
      if (!matchDataName.includes(data)) {
        typing.innerHTML += `<p><em>${data}</em> is tpying a message..</p>`;
        matchDataName.push(data);
      }
    }
  } else {
    typing.innerHTML = "";
    matchDataName = [];
  }
});
