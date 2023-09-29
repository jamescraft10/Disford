var Name = prompt('Whats Your Name?');
if (Name == "" || Name == null || Name == undefined) { Name = prompt('Whats Your Name?'); }

var socket = io();

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

form.addEventListener('submit', function (e) {
  if (Name == "" || Name == null || Name == undefined) { Name = prompt('Whats Your Name?'); }
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", `${Name}: ${input.value}`);
    input.value = '';
  }
});

socket.on("chat message", function (msg) {
  AddText(msg);
});

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
if(i == 0) {
  Bottom();
  i++;
}