let running = true;
let skipMeasure = false;
const fontSize = 12;

/* Each "mark" is a horizontal line to denote the vertical distance  */
let marks = [];
let labels = [];

createMarks();

function createMarks() {
  const hLine = document.createElement("div");

  hLine.style.position = "absolute";
  hLine.style.top = 0;
  hLine.style.left = 0;
  hLine.style.width = "100vw";
  hLine.style.height = "1px";
  hLine.style.borderTop = "1px solid rgba(250, 0, 250, .5)";

  document.body.appendChild(hLine);
  marks.push(hLine);
}

/* Expects two marks a, b, and add the calculated distance to the screen */
function calculateDistances(a, b) {
  if (skipMeasure) {
    skipMeasure = false;
    return;
  }
  // Vertical distance
  const dy = parseInt(a.style.top) - parseInt(b.style.top);
  dyLabel = document.createElement("div");
  labels.push(dyLabel);
  dyLabel.appendChild(document.createTextNode(`${Math.abs(dy)}`));

  dyLabel.style.position = "absolute";

  // a.y < b.y , which means a is above b
  if (dy < 0) {
    dyLabel.style.top = `${parseInt(a.style.top)}px`
  }
  else {
    dyLabel.style.top = `${parseInt(b.style.top)}px`
  }

  dyLabel.style.height = `${Math.abs(dy)}px`;
  dyLabel.style.verticalAlign = "middle";
  dyLabel.style.backgroundColor = "rgba(125, 16, 83, 0.75)";
  dyLabel.style.color = "rgba(242, 221, 242, 0.9)";
  dyLabel.style.display = "flex";
  dyLabel.style.alignItems = "center";
  dyLabel.style.fontFamily = "monospace, monospace";
  dyLabel.style.fontSize = `${fontSize}px`;
  dyLabel.style.left = `${((labels.length - 1) * fontSize * 2) % document.body.scrollWidth}px`;

  document.body.appendChild(dyLabel);
}

function updateLines(e) {
  if (!running) { return; }
  marks[marks.length - 1].style.top = `${e.clientY + window.scrollY}px`;
}

function handleClick() {
  if (!running) { return; }
  createMarks();
  if (marks.length > 2) {
    calculateDistances(marks[marks.length - 3], marks[marks.length - 2]);
  }
}

function clearLines() {
    marks.forEach((mark) => {
      document.body.removeChild(mark);
    });
    marks = [];
    labels.forEach((label) => {
      document.body.removeChild(label);
    });
    labels = [];
}

function handleKeypress(e) {
  if (e.code === 'KeyX')  {
    clearLines();
    document.removeEventListener("mousemove", updateLines);
    document.removeEventListener("click", handleClick);
    document.removeEventListener("keyup", handleKeypress);
  }
  else if (e.code === 'KeyC') {
    clearLines();
    createMarks();
  }
  else if (e.code === 'KeyP') {
    if (running) {
      document.body.removeChild(marks[marks.length - 1 ]);
      marks.pop();
    }
    else {
      createMarks();
    }
    running = !running;
  }
  else if (e.code === 'KeyS') {
    skipMeasure = true;
  }
}

document.addEventListener("mousemove", updateLines);
document.addEventListener("click", handleClick);
document.addEventListener("keyup", handleKeypress);
