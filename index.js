var svg = `
  <?xml version="1.0" ?><svg viewBox="0 0 512 250" xmlns="http://www.w3.org/2000/svg"><title/><polyline points="112 352 48 288 112 224" style="fill:none;stroke:#000;stroke-linecap:square;stroke-miterlimit:10;stroke-width:32px"/><polyline points="64 288 464 288 464 160" style="fill:none;stroke:#000;stroke-linecap:square;stroke-miterlimit:10;stroke-width:32px"/></svg>
`;

alert("Press Enter to Continue");

let code = `
      const a = 10;
      console.log(a, "HELLO");`;
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
  var returnEl = document.createElement("span");
  returnEl.innerHTML = svg;
  returnEl.className = "letter return";
  el.appendChild(returnEl);
  document.body.appendChild(el);
  subEl = document.createElement("span");
}
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

  if (
    letters[idx].className == "letter return" ||
    letters[idx].className == "letter return current"
  ) {
    if (e.key !== "Enter") {
      return;
    }
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
    window.removeEventListener("keydown", onKeyPress);
    window.clearInterval(interval);
  }
});
