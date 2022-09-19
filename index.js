let code = `
      const a = 10;
      console.log(a, "HELLO");
      `;

const lines = code.split("\n");
for (let line of lines) {
  var el = document.createElement("div");
  el.className = "word";
  let isLeadingSpace = true;
  for (let j = 0; j < line.length; j++) {
    var subEl = document.createElement("span");
    if (line[j] == " " && isLeadingSpace) {
      subEl.innerHTML = "&nbsp";
      subEl.className = "space";
    } else {
      isLeadingSpace = false;
      subEl.innerHTML = line[j];
      subEl.className = "letter";
    }
    el.appendChild(subEl);
  }
  document.body.appendChild(el);
}
subEl = document.createElement("span");
subEl.className = "letter";
el.appendChild(subEl);
document.body.appendChild(el);

var idx = 0;
var letters = document.getElementsByClassName("letter");
var interval;

window.addEventListener("keypress", function onKeyPress(e) {
  var correct = false;
  if (interval === undefined) {
    interval = window.setInterval(function () {
      var time = document.getElementsByClassName("time")[0];
      time.innerHTML = Number(time.innerHTML) + 1;
    }, 1000);
  }
  letters[idx + 1].className += " current";
  letters[idx].className = letters[idx].className.replace(" current", "");
  if (letters[idx].innerHTML !== String.fromCharCode(e.which)) {
    letters[idx].className += " wrong";
  } else {
    correct = true;
    letters[idx].className += " correct";
  }
  document.getElementsByClassName("errors")[0].innerHTML = Array.prototype.slice
    .call(document.getElementsByClassName("wrong"), 0)
    .reduce(function (a, b) {
      return a + 1;
    }, 0);
  idx++;

  if (idx + 1 >= letters.length) {
    window.removeEventListener("keydown", tp);
    window.clearInterval(interval);
  }
});
