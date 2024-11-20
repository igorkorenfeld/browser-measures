const running = true;
const outlineStyle = `
* {
  outline: 2px solid rgba(152, 234, 158, 0.65);
}
`
const styleSheet = document.createElement("style");
styleSheet.textContent = outlineStyle;

function addOutlines() {
  document.body.appendChild(styleSheet);
}

function removeOutlines() {
  document.body.removeChild(styleSheet);
}

function handleKeypress(e) {
  if (e.code === 'KeyX')  {
    removeOutlines();
    document.removeEventListener("keyup", handleKeypress);
  }

  else if (e.code === 'KeyP') {
    if (running) {
      removeOutlines();
    }
    else {
      addOutlines();
    }
  }
}

document.addEventListener("keyup", handleKeypress);
addOutlines();
