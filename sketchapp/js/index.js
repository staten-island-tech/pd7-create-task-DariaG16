const DOMSelectors = {
  saveClr: document.getElementById("#saveColor"),
};

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.style.width = 1500;
canvas.style.height = 948;

canvas.addEventListener("mousemove", (e) => {
  let mouseX = e.clientX;
  let mouseY = e.clientY;
  console.log("Mouse X: " + e.clientX);
  console.log("Mouse Y: " + e.clientY);
  ctx.beginPath();
  ctx.lineTo(mouseX, mouseY);
  ctx.stroke();
});
