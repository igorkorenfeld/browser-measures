let running = true;
const fontSize = 12;

/* Each "mark" is a horizontal line
 * 
 */
let marks = [];
let labels = [];

createMarks();

function createMarks() {
  const vLine = document.createElement("div");

  vLine.style.position = "absolute";
  vLine.style.top = `0`;
  vLine.style.left = `0`;
  vLine.style.width = "1px";
  vLine.style.height = `${window.innerHeight}px`;
  vLine.style.borderLeft = "1px solid rgba(250, 0, 250, .5)";

  document.body.appendChild(vLine);
  marks.push(vLine);
  

}

/* Expects two marks a, b, and add the calculated distance to the screen 
 */ 
function calculateDistances(a, b) {
  // Vertical distance
  console.log(parseInt(a.style.left) - parseInt(b.style.left));
  const dx = parseInt(a.style.left) - parseInt(b.style.left);
  dxLabel = document.createElement("div");
  labels.push(dxLabel);
  dxLabel.appendChild(document.createTextNode(`${Math.abs(dx)}`));
  
  dxLabel.style.position = "absolute";
  
  // a.y < b.y , which means a is above b
  // if (dy < 0) {
  //   dyLabel.style.top = `${parseInt(a.style.top)}px` 
  //   // dyLabel.style.top = `${parseInt(b[0].style.top) - 16}px`;
  // }
  // else {
  //   dyLabel.style.top = `${parseInt(b.style.top)}px` 
  //   // dyLabel.style.top = `${parseInt(a[0].style.top) - 16}px`;
  // } 
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

  dxLabel.style.top = `${((labels.length - 1) * fontSize) % document.body.scrollHeight}px`;

  document.body.appendChild(dxLabel);
}

function updateLines(e) {
  //hLine
  marks[marks.length - 1].style.left = `${e.clientX}px`;
}

function handleClick() {
  createMarks();
  console.log("marks length:");
  console.log(marks.length);
  console.log(marks);
  if (marks.length > 2) {
    calculateDistances(marks[marks.length - 3], marks[marks.length - 2]);
  }
}

function handleKeypress(e) {
  if (e.code === 'KeyX')  {
    marks.forEach((mark) => {
      document.body.removeChild(mark);
    });
    marks = [];
    labels.forEach((label) => {
      document.body.removeChild(label);
    });
    labels = [];
    document.removeEventListener("mousemove", updateLines);
    document.removeEventListener("click", handleClick);
    document.removeEventListener("keyup", handleKeypress);
  }
  else if (e.code === 'KeyP') {
    running = !running; 
    if (!running) {
    document.querySelectorAll(".keyOutline").forEach((el) => el.classList.remove("keyOutline"));
    }
  }
}

document.addEventListener("mousemove", updateLines);
document.addEventListener("click", handleClick);
document.addEventListener("keyup", handleKeypress);
