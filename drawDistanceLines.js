let running = true;

let lines = [];

createLines();

function createLines() {
  const vLine = document.createElement("div");
  const hLine = document.createElement("div");

  vLine.style.position = "absolute";
  vLine.style.top = `0`;
  vLine.style.left = `0`;
  vLine.style.width = "1px";
  vLine.style.height = `${document.body.scrollHeight}px`;
  vLine.style.borderLeft = "1px solid rgba(250, 0, 250, .5)";

  hLine.style.position = "absolute";
  hLine.style.top = 0;
  hLine.style.left = 0;
  hLine.style.width = "100vw";
  hLine.style.height = "1px";
  hLine.style.borderTop = "1px solid rgba(250, 0, 250, .5)";

  document.body.appendChild(vLine);
  document.body.appendChild(hLine);
  lines.push([vLine, hLine]);
}

function updateLines(e) {
  //vLine
  lines[lines.length - 1][0].style.left = `${e.clientX}px`;
  
  //hLine
  lines[lines.length - 1][1].style.top = `${e.clientY}px`;
  console.log(e.clientX, e.clientY);
}

function handleClick() {
  createLines();
}

document.addEventListener("mousemove", updateLines);
document.addEventListener("click", handleClick);
