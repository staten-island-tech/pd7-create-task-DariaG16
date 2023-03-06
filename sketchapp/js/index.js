import "../styles/styles.css";
const DOMSelectors = {
  saveClr: document.querySelector("#saveColor"),
  savedClrs: document.querySelector("#saved"),
  color: document.querySelector("#color"),
  size: document.querySelector("#size"),
  erase: document.querySelector("#erase"),
  lblSize: document.querySelector("#brushSize"),
};
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
let mouseX = null,
  mouseY = null,
  amt = 0,
  brSize = 1,
  makeLine = false,
  colorPick = "#000000",
  savedClrsArray;

DOMSelectors.color.addEventListener("input", () => input());
DOMSelectors.size.addEventListener("input", () => input());
DOMSelectors.erase.addEventListener("click", () => {
  colorPick = "#FFFFFF";
});
function input() {
  colorPick = DOMSelectors.color.value;
  brSize = DOMSelectors.size.value;
  DOMSelectors.lblSize.innerHTML = `Brush Size: ${brSize} px`;
}
let saveColors = new Set();
DOMSelectors.saveClr.addEventListener("click", () => {
  saveColors.add(colorPick);
  getColors(saveColors.size);
});
function getColors(i) {
  if (i < 16) {
    DOMSelectors.savedClrs.innerHTML = ""; //clears the innerHTML to refresh the html displayed
    saveColors.forEach((color) => {
      console.log(color.split("#")[1]);
      DOMSelectors.savedClrs.insertAdjacentHTML(
        "beforeend",
        `<button style="background-color:${color};" class="colors" id="${
          color.split("#")[1]
        }"></button>` //saves the colors background color of the buttons
      );
      document
        .getElementById(color.split("#")[1])
        .addEventListener("click", () => {
          colorPick = color;
        });
    });
  } else {
    DOMSelectors.savedClrs.insertAdjacentHTML(
      "beforeend",
      `<p id="noColorsLeft">You have filled out all the color slots!</p>`
    );
  }
}
const draw = (e) => {
  if (!makeLine) {
    return;
  }
  ctx.lineCap = `round`;
  ctx.lineWidth = brSize;
  ctx.strokeStyle = colorPick;
  let mouseX2 = e.clientX - canvas.offsetLeft;
  let mouseY2 = e.clientY;
  ctx.lineTo(mouseX2, mouseY2);
  ctx.stroke();
}; // i know i have to fix this bogdan its just complicated so im procrastinating
canvas.addEventListener("mousedown", (e) => {
  makeLine = true;
  mouseX = e.clientX;
  mouseY = e.clientY;
});
canvas.addEventListener("mouseup", (e) => {
  makeLine = false;
  ctx.stroke();
  ctx.beginPath();
});
canvas.addEventListener("mousemove", draw);
