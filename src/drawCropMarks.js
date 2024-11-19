
let running = true;
const marks = [];

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
  vCropmark.style.height = "100vh";
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

function removeMarks(e) {
  if (e.code === 'KeyX')  {
   marks.forEach((mark) => document.body.removeChild(mark));
    document.removeEventListener("click", drawNearest);
    document.removeEventListener("keyup", removeMarks);
    }
  else if (e.code === 'KeyP') {
    running = !running; 
  }
}

document.addEventListener("click", drawNearest);
document.addEventListener("keyup", removeMarks);

