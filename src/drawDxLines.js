let running = true;
let skipMeasure = false;
const fontSize = 12;
const docHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);

/* Each "mark" is a veritcal line to denote horizontal distances*/
let marks = [];
let labels = [];

createMarks();

function createMarks() {
  const vLine = document.createElement("div");

  vLine.style.position = "absolute";
  vLine.style.top = `0`;
  vLine.style.left = `0`;
  vLine.style.width = "1px";
  vLine.style.height = `${docHeight}px`;
  vLine.style.borderLeft = "1px solid rgba(250, 0, 250, .5)";
  vLine.style.zIndex = "9999";

  document.body.appendChild(vLine);
  marks.push(vLine);
}

/* Expects two marks a, b, and add the calculated distance to the screen
 * along with the clientY position to plot the label
 * */

function calculateDistances(a, b, clientY) {
  if (skipMeasure) {
    skipMeasure = false;
    return;
  }
  // Vertical distance
  const dx = parseInt(a.style.left) - parseInt(b.style.left);
  const dxLabel = document.createElement("div");
  labels.push(dxLabel);
  dxLabel.appendChild(document.createTextNode(`${Math.abs(dx)}`));

  dxLabel.style.position = "absolute";

  // a.x < b.x
  if (dx < 0) {
    dxLabel.style.left = a.style.left;
  }
  // a.x > b.x
  else {
    dxLabel.style.left = b.style.left;
  }

  dxLabel.style.width = `${Math.abs(dx)}px`;
  dxLabel.style.textAlign = "center";
  dxLabel.style.backgroundColor = "rgba(125, 16, 83, 0.75)"
  dxLabel.style.color = "rgba(242, 221, 242, 0.9)"
  dxLabel.style.fontFamily = "monospace, monospace";
  dxLabel.style.fontSize = `${fontSize}px`;

  dxLabel.style.top = `${clientY + window.scrollY}px`;

  document.body.appendChild(dxLabel);
}

function updateLines(e) {
  if (!running) { return; }
  marks[marks.length - 1].style.left = `${e.clientX}px`;
}

function handleClick(e) {
  if (!running) { return; }
  createMarks();
  if (marks.length > 2) {
    calculateDistances(marks[marks.length - 3], marks[marks.length - 2], e.clientY);
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

function undoLast() {
  // Need to have at least two marks (includig the one currenly being placed) to undo
  if (marks.length < 2) return;
  const targetMark = marks[marks.length - 2];
  if (labels.length > 0) {
    const targetLabel = labels[labels.length - 1];
    if ( (targetMark.getBoundingClientRect().left == targetLabel.getBoundingClientRect().left) ||
         (targetMark.getBoundingClientRect().left == targetLabel.getBoundingClientRect().right)
    ) { 
      document.body.removeChild(targetLabel);
      labels.pop(); 
    }
  }

  document.body.removeChild(targetMark);
  currentMark = marks[marks.length - 1]
  marks = marks.slice(0, -2)
  marks.push(currentMark)
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
      document.body.removeChild(marks[marks.length - 1]);
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
  else if (e.code === 'KeyU') {
    undoLast()
  }
}

document.addEventListener("mousemove", updateLines);
document.addEventListener("click", handleClick);
document.addEventListener("keyup", handleKeypress);
