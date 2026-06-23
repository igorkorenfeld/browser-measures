let running = true;

const outlineStyle = `
*:hover {
  outline: 2px solid rgba(0, 220, 250, .65);
  box-shadow: 0px 3px 12px rgba(125, 153, 170, .9);
}

.scrollActive {
  outline: 2px solid rgba(16, 166, 61, 0.78);
}

.marker {
  background-color: hsl(80deg, 80%, 80%);
  color: hsl(80deg, 90%, 10%);
  position: fixed;
  margin: 0px 0px;
  padding: 8px 4px;
  top: 0;
  right: 0;
}
`
const styleSheet = document.createElement('style');
styleSheet.textContent = outlineStyle
document.body.appendChild(styleSheet);


const marker = document.createElement('p');
let scrollTop = true;
marker.classList.add('marker');
updateMarker(scrollTop);
document.body.appendChild(marker);

document.addEventListener('click', handleClick);
document.addEventListener('keyup', handleKeypress);


function updateMarker(scrollMode) {
  marker.innerText = scrollMode ? 'Scroll top' : 'Scroll bottom';
}

function handleClick(e) {
  e.target.classList.add('scrollActive');
  e.target.scrollIntoView(scrollTop);

  setTimeout(() => {
    e.target.classList.remove('scrollActive');
  }, 750);
}


function handleKeypress(e) {
  if (e.code === 'KeyX') {
    styleSheet.remove();
    marker.remove();
    document.removeEventListener('click', handleClick);
    document.removeEventListener('keyup', handleKeypress);
  }

  if (e.code === 'KeyB') {
    scrollTop = false;
    updateMarker(scrollTop)
  }

  if (e.code === 'KeyT') {
    scrollTop = true;
    updateMarker(scrollTop)
  }
}

