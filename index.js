var svg = `
  <?xml version="1.0" ?><svg viewBox="0 0 512 250" xmlns="http://www.w3.org/2000/svg"><title/><polyline points="112 352 48 288 112 224" style="fill:none;stroke:#000;stroke-linecap:square;stroke-miterlimit:10;stroke-width:32px"/><polyline points="64 288 464 288 464 160" style="fill:none;stroke:#000;stroke-linecap:square;stroke-miterlimit:10;stroke-width:32px"/></svg>
`;

let code = `
       11234567;
      console.log(a, "HELLO");`;

const lines = code.split("\n");

for (let line of lines) {
  var element = document.createElement("div");
  element.className = "word";

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
    element.appendChild(subEl);
  }

  if (line !== "") {
    var returnEl = document.createElement("span");
    returnEl.innerHTML = svg;
    returnEl.className = "letter return";
    element.appendChild(returnEl);
  }
  document.body.appendChild(element);
  subEl = document.createElement("span");
}
subEl.className = "letter";
element.appendChild(subEl);
document.body.appendChild(element);

var idx = 0;
var letters = document.getElementsByClassName("letter");
var keys = document.getElementsByClassName("keys");
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

  // next.classList.remove("active");
  // if (e.code == "Space") {
  //   let spaceKey = document.querySelector(".space_key");
  //   spaceKey.classList.add("active");
  //   return;
  // }
  var next = document.getElementsByClassName("letter");
  console.log(next[idx].innerText);
  letters[idx + 1].className += " current";
  keys[idx + 1].className += " active";
  letters[idx].className = letters[idx].className.replace(" current", "");
  keys[idx].className = keys[idx].className.replace(" active", " remove");

  // console.log(next);
  // if (next) next.classList.add("active");
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
