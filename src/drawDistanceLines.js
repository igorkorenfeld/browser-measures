let running = true;
let skipMeasure = false;
const fontSize = 12;
const docHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);

/* Each "mark" is a an array of 2 div that create a intersecting lines.
 * The [0] is the vertical line and the [1] is the horiztonal line
 * */
let marks = [];
let labels = [];

createMarks();

function createMarks() {
  const vLine = document.createElement("div");
  const hLine = document.createElement("div");

  vLine.style.position = "absolute";
  vLine.style.top = `0`;
  vLine.style.left = `0`;
  vLine.style.width = "1px";
  vLine.style.height = `${docHeight}px`;
  vLine.style.borderLeft = "1px solid rgba(250, 0, 250, .5)";
  vLine.style.zIndex='9999'

  hLine.style.position = "absolute";
  hLine.style.top = 0;
  hLine.style.left = 0;
  hLine.style.width = "100vw";
  hLine.style.height = "1px";
  hLine.style.borderTop = "1px solid rgba(250, 0, 250, .5)";
  vLine.style.zIndex='9999'

  document.body.appendChild(vLine);
  document.body.appendChild(hLine);
  marks.push([vLine, hLine]);
}

/* Expects two marks a, b. Returns an object with two properties
 * dx - horizontal distance
 * dy - veritcal distance
 */
function calculateDistances(a, b) {
  if (skipMeasure) {
    skipMeasure = false;
    return;
  }
  const distances = {
    dx: parseInt(a[0].style.left) - parseInt(b[0].style.left),
    dy: parseInt(a[1].style.top) - parseInt(b[1].style.top)
  };
  const dxLabel = document.createElement("div");
  const dyLabel = document.createElement("div");
  labels.push([dxLabel, dyLabel]);
  dxLabel.appendChild(document.createTextNode(`${Math.abs(distances.dx)}`));
  dyLabel.appendChild(document.createTextNode(`${Math.abs(distances.dy)}`));

  dxLabel.style.position = "absolute";
  dyLabel.style.position = "absolute";

  // a.x < b.x
  if (distances.dx < 0) {
    dxLabel.style.left = a[0].style.left;
    dyLabel.style.left = a[0].style.left;
  }
  // a.x > b.x
  else {
    dxLabel.style.left = b[0].style.left;
    dyLabel.style.left = b[0].style.left;
  }
  // a.y < b.y , which means a is above b
  if (distances.dy < 0) {
    dxLabel.style.top = `${parseInt(b[1].style.top) - fontSize - 2}px`;
    dyLabel.style.top = `${parseInt(a[1].style.top)}px`
    // dyLabel.style.top = `${parseInt(b[0].style.top) - 16}px`;
  }
  else {
    dxLabel.style.top = `${parseInt(a[1].style.top) - fontSize - 2}px`;
    dyLabel.style.top = `${parseInt(b[1].style.top)}px`
    // dyLabel.style.top = `${parseInt(a[0].style.top) - 16}px`;
  }
  // dxLabel.style.width = `${Math.abs(distances.dx)}`;
  dxLabel.style.width = `${Math.abs(distances.dx)}px`;
  dxLabel.style.textAlign = "center";
  dxLabel.style.backgroundColor = "rgba(125, 16, 83, 0.75)"
  dxLabel.style.color = "rgba(242, 221, 242, 0.9)"
  dxLabel.style.fontFamily = "monospace, monospace";
  dxLabel.style.fontSize = `${fontSize}px`;

  document.body.appendChild(dxLabel);


  dyLabel.style.height = `${Math.abs(distances.dy)}px`;
  dyLabel.style.verticalAlign = "middle";
  dyLabel.style.backgroundColor = "rgba(125, 16, 83, 0.75)";
  dyLabel.style.color = "rgba(242, 221, 242, 0.9)";
  dyLabel.style.display = "flex";
  dyLabel.style.alignItems = "center";
  dyLabel.style.fontFamily = "monospace, monospace";
  dyLabel.style.fontSize = `${fontSize}px`;

  document.body.appendChild(dyLabel);
}

function updateLines(e) {
  if (!running) { return; }
  //vLine
  marks[marks.length - 1][0].style.left = `${e.clientX}px`;

  //hLine
  marks[marks.length - 1][1].style.top = `${e.clientY}px`;
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
      document.body.removeChild(mark[0]);
      document.body.removeChild(mark[1]);
    });
    marks = [];
    labels.forEach((label) => {
      document.body.removeChild(label[0]);
      document.body.removeChild(label[1]);
    });
    labels = [];
}

function undoLast() {
  // Need to have at least two marks (including the one currenly being placed) to undo
  if (marks.length < 2) return;
  const targetMark = marks[marks.length - 2];
  if (labels.length > 0) {
    const targetLabel = labels[labels.length - 1];
    if ( (targetMark[0].getBoundingClientRect().left == targetLabel[0].getBoundingClientRect().left) ||
         (targetMark[0].getBoundingClientRect().left == targetLabel[0].getBoundingClientRect().right)
    ) {
      document.body.removeChild(targetLabel[0]);
      document.body.removeChild(targetLabel[1]);
      labels.pop();
    }
  }

  document.body.removeChild(targetMark[0]);
  document.body.removeChild(targetMark[1]);
  currentMark = marks[marks.length - 1]
  marks = marks.slice(0, -2)
  marks.push(currentMark)
}

function handleKeypress(e) {
  if (e.code === 'KeyX')  {
    marks.forEach((mark) => {
      document.body.removeChild(mark[0]);
      document.body.removeChild(mark[1]);
    });
    marks = [];
    labels.forEach((label) => {
      document.body.removeChild(label[0]);
      document.body.removeChild(label[1]);
    });
    labels = [];
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
      const el = marks[marks.length - 1];
      document.body.removeChild(el[0]);
      document.body.removeChild(el[1]);
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
    undoLast();
  }
}

document.addEventListener("mousemove", updateLines);
document.addEventListener("click", handleClick);
document.addEventListener("keyup", handleKeypress);

