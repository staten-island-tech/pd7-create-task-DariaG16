const DOMSelectors = {
  saveClr: document.querySelector("#saveColor"),
  savedClrs: document.querySelector("#saved"),
  color: document.querySelector("#color"),
  size: document.querySelector("#size"),
  lblSize: document.querySelector("#brushSize"),
};
let amt = 0;
let brSize = 1;
let mouseX = null;
let mouseY = null;

DOMSelectors.color.addEventListener("input", () => input());
DOMSelectors.size.addEventListener("input", () => input());

function input() {
  colorPick = DOMSelectors.color.value;
  brSize = DOMSelectors.size.value;
  console.log(brSize);
  DOMSelectors.lblSize.innerHTML = `Brush Size: ${brSize} px`;
}

DOMSelectors.saveClr.addEventListener("click", () => {
  if (amt < 15) {
    DOMSelectors.savedClrs.insertAdjacentHTML(
      "beforeend",
      `<button style="background-color:${colorPick};" id="colors"></button>`
    );
    amt++;
    console.log("u did it");
  } else {
    console.log("you suck");
  }
});

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1500;
canvas.height = 948;

canvas.addEventListener("click", (e) => {
  if (mouseX == null || mouseY == null) {
    mouseX = e.clientX -= 406;
    mouseY = e.clientY += 7;
    return;
  }
  let mouseX2 = (e.clientX -= 406);
  let mouseY2 = (e.clientY -= 7);
  ctx.beginPath();
  ctx.lineWidth = brSize;
  ctx.strokeStyle = colorPick;
  ctx.moveTo(mouseX2, mouseY2);
  ctx.lineTo(mouseX, mouseY);
  ctx.stroke();
  // Update previous mouse position
  mouseX = mouseX2;
  mouseY = mouseY2;
});

//If user clicks shift, make lines (the funcion i currently have)
//make the lines smooth
//create brush library to choose from
