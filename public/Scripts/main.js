var Name = prompt('What\'s Your Name?');
if (Name === "" || Name === null || Name === undefined) {
    Name = "Anonymous"; // Set a default name if the user doesn't provide one
}

var socket = io();
var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  SubmitText();
  SubmitImage();
});

function SubmitText() {
    if (input.value) {
        socket.emit("chat message", `${Name}: ${input.value}`);
        input.value = '';
    }
}

document.getElementById('file').addEventListener('change', function() {
  const reader = new FileReader();
  reader.onload = function() {
    const base64 = this.result.replace(/.*base64,/, '');
    socket.emit('image', base64);
  };
  reader.readAsDataURL(this.files[0]);

}, false);

socket.on("chat message", function (msg) {
    AddText(msg);
});

socket.on('image', function (image) {
    AddImage(image);
});

function AddImage(image) {
    image = `<img src="data:image/jpeg;base64,` + image + `\">`;
    var item = document.createElement('div');
    item.innerHTML = image;
    messages.appendChild(item);
    Bottom();
}

function AddText(msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    Bottom();
}

function Bottom() {
    window.scrollTo(0, document.body.scrollHeight);
}

let i = 0;
if (i == 0) {
    Bottom();
    i++;
}