function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
var selectFrom = "asdfjkl;".split("");
for (var i = 0; i < 50; i++) {
  var el = document.createElement("div");
  el.className = "word";
  var len = Math.floor(Math.random() * 4) + 2;
  for (var j = 0; j < len; j++) {
    var subEl = document.createElement("span");
    subEl.className = "letter";
    subEl.innerHTML = pick(selectFrom);
    el.appendChild(subEl);
  }
  subEl = document.createElement("span");
  subEl.className = "letter";
  subEl.innerHTML = " ";
  el.appendChild(subEl);
  document.body.appendChild(el);
}
var idx = 0;
var letters = document.getElementsByClassName("letter");
var interval;

window.addEventListener("keypress", function tp(e) {
  var correct = false;
  if (interval === undefined) {
    interval = window.setInterval(function () {
      var time = document.getElementsByClassName("time")[0];
      time.innerHTML = Number(time.innerHTML) + 1;
    }, 1000);
  }
  letters[idx + 1].className += " current";
  letters[idx].className = letters[idx].className.replace(" current", "");
  if (letters[idx].innerHTML !== String.fromCharCode(e.which).toLowerCase()) {
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

  if (Number(idx + 1) >= Number(letters.length)) {
    console.log(idx);
    console.log(letters.length);
    window.removeEventListener("keydown", tp);
    window.clearInterval(interval);
  }
});
