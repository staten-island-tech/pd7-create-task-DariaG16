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
let amt = 0;
let brSize = 1;
let mouseX = null;
let mouseY = null;
let makeLine = false;

DOMSelectors.color.addEventListener("input", () => input());
DOMSelectors.size.addEventListener("input", () => input());

function input() {
  colorPick = DOMSelectors.color.value;
  brSize = DOMSelectors.size.value;
  DOMSelectors.lblSize.innerHTML = `Brush Size: ${brSize} px`;
}
DOMSelectors.erase.addEventListener("click", () => {
  colorPick = "#FFFFFF";
});
DOMSelectors.saveClr.addEventListener("click", () => {
  if (amt < 15) {
    DOMSelectors.savedClrs.insertAdjacentHTML(
      "beforeend",
      `<button style="background-color:${colorPick};" class="colors"></button>`
    );
    amt++;
    console.log("u did it");
  } else {
    console.log("you suck");
  }
});
const color = document.querySelector("colors");

DOMSelectors.savedClrs.addEventListener("click", () => {
  console.log(color);
});

const draw = (e) => {
  if (!makeLine) {
    return;
  }
  {
    ctx.lineCap = `round`;
    ctx.lineWidth = brSize;
    ctx.strokeStyle = colorPick;
    let mouseX2 = e.clientX - canvas.offsetLeft;
    let mouseY2 = e.clientY;
    ctx.lineTo(mouseX2, mouseY2);
    ctx.stroke();
    // Update previous mouse position
  }
};

canvas.addEventListener("mousedown", (e) => {
  makeLine = true;
  mouseX = e.clientX; //figure this out
  mouseY = e.clientY;
});
canvas.addEventListener("mouseup", (e) => {
  makeLine = false;
  ctx.stroke();
  ctx.beginPath();
});

canvas.addEventListener("mousemove", draw);
//If user clicks shift, make lines (the funcion i currently have)
//make the lines smooth
//create brush library to choose from
