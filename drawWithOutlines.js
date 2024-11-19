let running = true;

let marks = [];

const outlineStyle = `
.keyOutline {
  outline: 2px solid rgba(0, 220, 250, .65);
  box-shadow: 0px 3px 12px rgba(125, 153, 170, .9);
}
`
const styleSheet = document.createElement("style");
styleSheet.textContent = outlineStyle
document.body.appendChild(styleSheet);

const elements = document.querySelectorAll("*");
elements.forEach((el)=> {
  el.addEventListener('mouseenter', addOutline);
  el.addEventListener('mouseleave', removeOutline);
});

function addOutline(e) {
  if(!running) return;
  e.target.classList.add("keyOutline"); 
}
function removeOutline(e) {
  if(!running) return;
  e.target.classList.remove("keyOutline"); 
}

function clearLines() {
  document.querySelectorAll(".keyOutline").forEach((el) => el.classList.remove("keyOutline"));
  marks.forEach((mark) => {
    if (mark.parentNode) {
      mark.parentNode.removeChild(mark);
    }
  });
} 

function handleKeypress(e) {
  if (e.code === 'KeyX')  {
    clearLines();
    document.removeEventListener("click", drawNearest);
    document.removeEventListener("keyup", handleKeypress);
    document.querySelectorAll("*").forEach((el) => {
      el.removeEventListener('mouseenter', addOutline);
      el.removeEventListener('mouseleave', removeOutline);
    });
    document.body.removeChild(styleSheet);
  }
  else if (e.code === 'KeyP') {
    running = !running; 
    if (!running) {
    document.querySelectorAll(".keyOutline").forEach((el) => el.classList.remove("keyOutline"));
    }
  }

  else if (e.code === 'KeyC') {
    clearLines();
  }
}

function drawNearest(e) {
  if (!running) return;
  e.preventDefault();
  let ex = e.clientX;
  let ey = e.clientY;
  let el = document.elementFromPoint(ex, ey)

  let rect = el.getBoundingClientRect();
  let vCropmark = document.createElement("div");
  let tCropmark = document.createElement("div");
  let bCropmark = document.createElement("div");
  marks.push(vCropmark, tCropmark, bCropmark);
  
  //Left keyline
  vCropmark.style.position = "absolute";
  vCropmark.style.top = `0`;
  vCropmark.style.left = `${rect.left + window.scrollX}px`;
  vCropmark.style.width = "1px";
  vCropmark.style.height = `${window.innerHeight}px`;
  vCropmark.style.borderLeft = "1px solid rgba(250, 0, 250, .5)";

  //Top keyline
  tCropmark.style.position = "absolute";
  tCropmark.style.top = `${rect.top + window.scrollY}px`;
  tCropmark.style.left = `0`;
  tCropmark.style.width = "100vw";
  tCropmark.style.height = "1px";
  tCropmark.style.borderTop = "1px solid rgba(250, 0, 250, .5)";

  //Bottom keyline
  bCropmark.style.position = "absolute";
  bCropmark.style.top = `${rect.bottom + window.scrollY}px`;
  bCropmark.style.left = `0`;
  bCropmark.style.width = "100vw";
  bCropmark.style.height = "1px";
  bCropmark.style.borderTop = "1px solid rgba(250, 0, 250, .5)";

  document.body.appendChild(vCropmark);
  document.body.appendChild(tCropmark);
  document.body.appendChild(bCropmark);
}

document.addEventListener("keyup", handleKeypress);
document.addEventListener("click", drawNearest);
