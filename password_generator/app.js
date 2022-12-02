const range = document.getElementById("range");
const rangeNumber = document.getElementById("range-text");

range.oninput = function () {
  rangeNumber.innerText = this.value;
};
