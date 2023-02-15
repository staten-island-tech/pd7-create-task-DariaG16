const DOMSelectors = {
  saveClr: document.querySelector("#saveColor"),
  savedClrs: document.querySelector("#saved"),
};
DOMSelectors.saveClr.addEventListener("click", (i) => {
  i === 0;
  if (i < 16) {
    DOMSelectors.savedClrs.insertAdjacentHTML(
      "beforeend",
      `
    <button id="colors"></button>`
    );
    i++;
  }
});
let mouseX = null;
let mouseY = null;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.lineWidth = 5; //ctx.lineWidth = ${the number from the slider}

canvas.width = 1500;
canvas.height = 948;

canvas.addEventListener("mousemove", (e) => {
  if (mouseX == null || mouseY == null) {
    mouseX = e.clientX -= 400;
    mouseY = e.clientY;
    return;
  }

  console.log("MouseX: " + e.clientX);
  console.log("MouseY: " + e.clientY);
  // Current mouse position
  let mouseX2 = (e.clientX -= 400);
  let mouseY2 = e.clientY;

  // Drawing a line from the previous mouse position to the current mouse position
  ctx.beginPath();
  ctx.moveTo(mouseX2, mouseY2);
  ctx.lineTo(mouseX, mouseY);
  ctx.stroke();

  // Update previous mouse position
  mouseX = mouseX2;
  mouseY = mouseY2;
});
