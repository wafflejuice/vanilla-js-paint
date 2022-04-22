const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor");
const range = document.querySelector("#jsRange");
const modeBtn = document.querySelector("#jsMode");
const saveBtn = document.querySelector("#jsSave");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let is_painting = false;
let is_filling = false;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = colors[0].style.backgroundColor;
ctx.fillStyle = colors[0].style.backgroundColor;
ctx.lineWidth = 2.5;

function handleColorClick(event) {
    ctx.strokeStyle = event.target.style.backgroundColor;
    ctx.fillStyle = ctx.strokeStyle;
}

function startPainting() {
    is_painting = true;
    ctx.beginPath();
}

function stopPainting() {
    is_painting = false;
    ctx.closePath();
}

function onMouseMove(event) {
    const x = event.offsetX
    const y = event.offsetY

    if (is_painting) {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleRangeChange(event) {
    ctx.lineWidth = event.target.value;
}

function handleModeClick(event) {
    if (is_filling) {
        is_filling = false;
        modeBtn.innerText = "Fill";
    } else {
        is_filling = true;
        modeBtn.innerText = "Paint";
    }
}

function handleCanvasClick() {
    if (is_filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleContextMenu(event) {
    event.preventDefault();
}

function handleSaveClick(event) {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[EXPORT]";
    console.log(link);
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleContextMenu);
}

if (colors) {
    Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
}

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (modeBtn) {
    modeBtn.addEventListener("click", handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}