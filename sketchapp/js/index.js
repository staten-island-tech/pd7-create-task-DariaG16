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

function input() {
  //checks the values for the inputs i have when the function detects an input
  colorPick = DOMSelectors.color.value;
  brSize = DOMSelectors.size.value;
  DOMSelectors.lblSize.innerHTML = `Brush Size: ${brSize} px`;
}

DOMSelectors.erase.addEventListener("click", () => {
  //erase button
  colorPick = "#FFFFFF";
});

let saveColors = new Set();
DOMSelectors.saveClr.addEventListener("click", () => {
  if (saveColors.size < 16) {
    help();
  } else if (saveColors.size === 14) {
    //im probably gonna delete this, too complicated i believe. But it makes a select option after 15 colors have been saved for the opportunity to save more colors, and adds options... its kinda broken tho
    DOMSelectors.savedClrs.insertAdjacentHTML(
      "beforeend",
      `<label for="Saved Colors">More colors:</label>
      <select name="Saved Colors" id="clrSavedArray"> Saved Colors</select>`
    );
    savedClrsArray = document.querySelector("#clrSavedArray");
    savedClrsArray.insertAdjacentHTML(
      "beforeend",
      `<option style="background-color:${colorPick};" class="color" id="${colorPick}"></option>`
    );
  } else {
    savedClrsArray.insertAdjacentHTML(
      "beforeend",
      `<option style="background-color:${colorPick};" class="color" id="${colorPick}"></option>`
    );
  }
  saveColors.add(colorPick);
  //console.log(saveColors);
});

function help() {
  DOMSelectors.savedClrs.innerHTML = ""; //not really sure what this does
  saveColors.forEach((color) => {
    DOMSelectors.savedClrs.insertAdjacentHTML(
      "beforeend",
      `<button style="background-color:${color};" class="colors" id="${
        color.split("#")[1]
      }"></button>` //saves the colors into an array and into buttons
    );
    document
      .getElementById(color.split("#")[1])
      .addEventListener("click", () => {
        colorPick = color;
      }); // deleted the inserthtml thing cause i dont get why i'd need to make new html for each color??? idk i dont understand
  });
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
