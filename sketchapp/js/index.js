const DOMSelectors = {
  saveClr: document.querySelector("#saveColor"),
  savedClrs: document.querySelector("#saved"),
  color: document.querySelector("#color"),
};
function works() {
  console.log(``);
}
DOMSelectors.saveClr.addEventListener("click", works());
let colorPick = DOMSelectors.color.value;

DOMSelectors.saveClr.addEventListener("click", (i) => {
  i = 0;
  if (i < 16) {
    DOMSelectors.savedClrs.insertAdjacentHTML(
      "beforeend",
      `
      
    <button style="background-color:${colorPick};" id="colors"></button>`
    );
    i++;
    console.log("u did it");
  } else {
    console.log("you suck");
  }
});
let mouseX = null;
let mouseY = null;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.lineWidth = 5; //ctx.lineWidth = ${the number from the slider}

canvas.width = 1500;
canvas.height = 948;

canvas.addEventListener("click", (e) => {
  if (mouseX == null || mouseY == null) {
    mouseX = e.clientX -= 406;
    mouseY = e.clientY += 7;
    return;
  }
  // Current mouse position
  let mouseX2 = (e.clientX -= 406);
  let mouseY2 = (e.clientY -= 7);

  // Drawing a line from the previous mouse position to the current mouse position
  ctx.beginPath();
  ctx.moveTo(mouseX2, mouseY2);
  ctx.lineTo(mouseX, mouseY);
  ctx.stroke();

  // Update previous mouse position
  mouseX = mouseX2;
  mouseY = mouseY2;
});
