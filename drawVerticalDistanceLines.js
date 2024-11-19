let running = true;
const fontSize = 12;

/* Each "mark" is a horizontal line
 * 
 */
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

/* Expects two marks a, b, and add the calculated distance to the screen 
 */ 
function calculateDistances(a, b) {
  // Vertical distance
  console.log(parseInt(a.style.top) - parseInt(b.style.top));
  const dy = parseInt(a.style.top) - parseInt(b.style.top);
  dyLabel = document.createElement("div");
  labels.push(dyLabel);
  dyLabel.appendChild(document.createTextNode(`${Math.abs(dy)}`));
  
  dyLabel.style.position = "absolute";
  
  // a.y < b.y , which means a is above b
  if (dy < 0) {
    dyLabel.style.top = `${parseInt(a.style.top)}px` 
    // dyLabel.style.top = `${parseInt(b[0].style.top) - 16}px`;
  }
  else {
    dyLabel.style.top = `${parseInt(b.style.top)}px` 
    // dyLabel.style.top = `${parseInt(a[0].style.top) - 16}px`;
  } 

  dyLabel.style.height = `${Math.abs(dy)}px`;
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
  //hLine
  marks[marks.length - 1].style.top = `${e.clientY}px`;
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
