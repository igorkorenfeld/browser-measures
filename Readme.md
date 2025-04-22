# Browser measures
This repo has a set of tools that will help measure distances and draw lines to check alignment on a webpage. The tools are intended to be used as bookmarklets or alternatively via the browser devtools JS console.

## Summary
1. [Draw Distance Lines](#draw-distance-lines) - Measure the vertical and horizontal distance between two points.
2. [Draw dy Lines](#draw-dy-lines) - Measure the vertical distance between two points.
2. [Draw dx Lines](#draw-dx-lines) - Measure the horizontal distance between two points.
3. [Draw with Outlines](#draw-with-outlines) - Highlight element, draw lines along the top, bottom, and left sides.
5. [Make Outlines](#make-outlines) - Add an outline around every element on the page.

## Draw Distance Lines
`drawDistanceLines` will add a vertical and horizontal lines to the the page based on the cursor position. When more than one set of lines is added, it will show the horizontal and vertical distance between the last two added marks.

### Keys
`x` - E**x**it the tool

`c` - **C**lear any existing lines and continue adding new lines

`p` - **P**ause the tool, will keep existing lines on the page but will not create a new line to place on click. Pause can be toggled on and off.

`s` - **S**kip calculating a distance, but allow to add a line. Once a line is added, the next distance will be calculated as normal, unless "s" is pressed again. 

`u` - **U**ndo the last set of lines and labels

### Bookmarklet code
```javascript
javascript:(function(){let e=!0,t=!1;const o=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight);let l=[],n=[];function d(){const e=document.createElement("div"),t=document.createElement("div");e.style.position="absolute",e.style.top="0",e.style.left="0",e.style.width="1px",e.style.height=`${o}px`,e.style.borderLeft="1px solid rgba(250, 0, 250, .5)",e.style.zIndex="9999",t.style.position="absolute",t.style.top=0,t.style.left=0,t.style.width="100vw",t.style.height="1px",t.style.borderTop="1px solid rgba(250, 0, 250, .5)",e.style.zIndex="9999",document.body.appendChild(e),document.body.appendChild(t),l.push([e,t])}function s(t){e&&(l[l.length-1][0].style.left=`${t.clientX}px`,l[l.length-1][1].style.top=`${t.clientY}px`)}function c(){e&&(d(),l.length>2&&function(e,o){if(t)return void(t=!1);const l={dx:parseInt(e[0].style.left)-parseInt(o[0].style.left),dy:parseInt(e[1].style.top)-parseInt(o[1].style.top)},d=document.createElement("div"),s=document.createElement("div");n.push([d,s]),d.appendChild(document.createTextNode(`${Math.abs(l.dx)}`)),s.appendChild(document.createTextNode(`${Math.abs(l.dy)}`)),d.style.position="absolute",s.style.position="absolute",l.dx<0?(d.style.left=e[0].style.left,s.style.left=e[0].style.left):(d.style.left=o[0].style.left,s.style.left=o[0].style.left),l.dy<0?(d.style.top=parseInt(o[1].style.top)-12-2+"px",s.style.top=`${parseInt(e[1].style.top)}px`):(d.style.top=parseInt(e[1].style.top)-12-2+"px",s.style.top=`${parseInt(o[1].style.top)}px`),d.style.width=`${Math.abs(l.dx)}px`,d.style.textAlign="center",d.style.backgroundColor="rgba(125, 16, 83, 0.75)",d.style.color="rgba(242, 221, 242, 0.9)",d.style.fontFamily="monospace, monospace",d.style.fontSize="12px",document.body.appendChild(d),s.style.height=`${Math.abs(l.dy)}px`,s.style.verticalAlign="middle",s.style.backgroundColor="rgba(125, 16, 83, 0.75)",s.style.color="rgba(242, 221, 242, 0.9)",s.style.display="flex",s.style.alignItems="center",s.style.fontFamily="monospace, monospace",s.style.fontSize="12px",document.body.appendChild(s)}(l[l.length-3],l[l.length-2]))}d(),document.addEventListener("mousemove",s),document.addEventListener("click",c),document.addEventListener("keyup",(function o(i){if("KeyX"===i.code)l.forEach((e=>{document.body.removeChild(e[0]),document.body.removeChild(e[1])})),l=[],n.forEach((e=>{document.body.removeChild(e[0]),document.body.removeChild(e[1])})),n=[],document.removeEventListener("mousemove",s),document.removeEventListener("click",c),document.removeEventListener("keyup",o);else if("KeyC"===i.code)l.forEach((e=>{document.body.removeChild(e[0]),document.body.removeChild(e[1])})),l=[],n.forEach((e=>{document.body.removeChild(e[0]),document.body.removeChild(e[1])})),n=[],d();else if("KeyP"===i.code){if(e){const e=l[l.length-1];document.body.removeChild(e[0]),document.body.removeChild(e[1]),l.pop()}else d();e=!e}else"KeyS"===i.code?t=!0:"KeyU"===i.code&&function(){if(l.length<2)return;const e=l[l.length-2];if(n.length>0){const t=n[n.length-1];e[0].getBoundingClientRect().left!=t[0].getBoundingClientRect().left&&e[0].getBoundingClientRect().left!=t[0].getBoundingClientRect().right||(document.body.removeChild(t[0]),document.body.removeChild(t[1]),n.pop())}document.body.removeChild(e[0]),document.body.removeChild(e[1]),currentMark=l[l.length-1],l=l.slice(0,-2),l.push(currentMark)}()}));})();
```

## Draw dy Lines
`drawDyLines` is similar to the `drawDistanceLines` but will only draw lines to denote the veritcal distance between clicks. It will also add the labels to note distance between those lines.

### Keys
`x` - E**x**it the tool

`c` - **C**lear any existing lines and continue adding new lines

`p` - **P**ause the tool, will keep existing lines on the page but will not create a new line to place on click. Pause can be toggled on and off.

`s` - **S**kip calculating a distance, but allow to add a line. Once a line is added, the next distance will be calculated as normal, unless "s" is pressed again. 

`u` - **U**ndo the last line and remove its corresponding label

### Bookmarklet code
```javascript
javascript:(function(){let e=!0,t=!1;let o=[],n=[];function l(){const e=document.createElement("div");e.style.position="absolute",e.style.top=0,e.style.left=0,e.style.width="100vw",e.style.height="1px",e.style.borderTop="1px solid rgba(250, 0, 250, .5)",e.style.zIndex="9999",document.body.appendChild(e),o.push(e)}function d(t){e&&(o[o.length-1].style.top=`${t.clientY+window.scrollY}px`)}function c(){e&&(l(),o.length>2&&function(e,o){if(t)return void(t=!1);const l=parseInt(e.style.top)-parseInt(o.style.top),d=document.createElement("div");n.push(d),d.appendChild(document.createTextNode(`${Math.abs(l)}`)),d.style.position="absolute",d.style.top=l<0?`${parseInt(e.style.top)}px`:`${parseInt(o.style.top)}px`,d.style.height=`${Math.abs(l)}px`,d.style.verticalAlign="middle",d.style.backgroundColor="rgba(125, 16, 83, 0.75)",d.style.color="rgba(242, 221, 242, 0.9)",d.style.display="flex",d.style.alignItems="center",d.style.fontFamily="monospace, monospace",d.style.fontSize="12px",d.style.left=12*(n.length-1)*2%document.body.scrollWidth+"px",document.body.appendChild(d)}(o[o.length-3],o[o.length-2]))}function i(){o.forEach((e=>{document.body.removeChild(e)})),o=[],n.forEach((e=>{document.body.removeChild(e)})),n=[]}l(),document.addEventListener("mousemove",d),document.addEventListener("click",c),document.addEventListener("keyup",(function s(r){"KeyX"===r.code?(i(),document.removeEventListener("mousemove",d),document.removeEventListener("click",c),document.removeEventListener("keyup",s)):"KeyC"===r.code?(i(),l()):"KeyP"===r.code?(e?(document.body.removeChild(o[o.length-1]),o.pop()):l(),e=!e):"KeyS"===r.code?t=!0:"KeyU"===r.code&&function(){if(o.length<2)return;const e=o[o.length-2];if(n.length>0){const t=n[n.length-1];e.getBoundingClientRect().top!=t.getBoundingClientRect().top&&e.getBoundingClientRect().top!=t.getBoundingClientRect().bottom||(document.body.removeChild(t),n.pop())}document.body.removeChild(e),currentMark=o[o.length-1],o=o.slice(0,-2),o.push(currentMark)}()}));})();
```
## Draw dx Lines
`drawDxLines` ise similar to the `drawDistanceLines` but will only draw the lines to denote teh horizontal distance between clicks. It will also add the labels to note distance between those lines.

### Keys
`x` - E**x**it the tool

`c` - **C**lear any existing lines and continue adding new lines

`p` - **P**ause the tool, will keep existing lines on the page but will not create a new line to place on click. Pause can be toggled on and off.

`s` - **S**kip calculating a distance, but allow to add a line. Once a line is added, the next distance will be calculated as normal, unless "s" is pressed again. 

`u` - **U**ndo the last line and remove its corresponding label


### Bookmarklet code
```javascript
javascript:(function(){let e=!0,t=!1;const n=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight);let o=[],l=[];function d(){const e=document.createElement("div");e.style.position="absolute",e.style.top="0",e.style.left="0",e.style.width="1px",e.style.height=`${n}px`,e.style.borderLeft="1px solid rgba(250, 0, 250, .5)",e.style.zIndex="9999",document.body.appendChild(e),o.push(e)}function c(t){e&&(o[o.length-1].style.left=`${t.clientX}px`)}function i(n){e&&(d(),o.length>2&&function(e,n,o){if(t)return void(t=!1);const d=parseInt(e.style.left)-parseInt(n.style.left),c=document.createElement("div");l.push(c),c.appendChild(document.createTextNode(`${Math.abs(d)}`)),c.style.position="absolute",c.style.left=d<0?e.style.left:n.style.left,c.style.width=`${Math.abs(d)}px`,c.style.textAlign="center",c.style.backgroundColor="rgba(125, 16, 83, 0.75)",c.style.color="rgba(242, 221, 242, 0.9)",c.style.fontFamily="monospace, monospace",c.style.fontSize="12px",c.style.top=`${o+window.scrollY}px`,document.body.appendChild(c)}(o[o.length-3],o[o.length-2],n.clientY))}function s(){o.forEach((e=>{document.body.removeChild(e)})),o=[],l.forEach((e=>{document.body.removeChild(e)})),l=[]}d(),document.addEventListener("mousemove",c),document.addEventListener("click",i),document.addEventListener("keyup",(function n(u){"KeyX"===u.code?(s(),document.removeEventListener("mousemove",c),document.removeEventListener("click",i),document.removeEventListener("keyup",n)):"KeyC"===u.code?(s(),d()):"KeyP"===u.code?(e?(document.body.removeChild(o[o.length-1]),o.pop()):d(),e=!e):"KeyS"===u.code?t=!0:"KeyU"===u.code&&function(){if(o.length<2)return;const e=o[o.length-2];if(l.length>0){const t=l[l.length-1];e.getBoundingClientRect().left!=t.getBoundingClientRect().left&&e.getBoundingClientRect().left!=t.getBoundingClientRect().right||(document.body.removeChild(t),l.pop())}document.body.removeChild(e),currentMark=o[o.length-1],o=o.slice(0,-2),o.push(currentMark)}()}));})();
```


## Draw with Outlines
`drawWithOutlines` will highlight the element that is currently under the cursor (along with with it's parent elements), while the element is being hovered. On click It will add a left vertical, as well as top and bottom horiziontal lines along the elements dimensions.

### Keys
`x` - E**x**it the tool

`c` - **C**lear any existing lines and continue adding new lines

`p` - **P**ause the tool but keep existing lines, clear all outlines. Pause can be toggled on and off

`u` - **U**ndo the last set of lines


### Bookmarklet code
```javascript
javascript:(function(){let e=!0,t=[];const o=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight),n=document.createElement("style");n.textContent="\n.keyOutline {\n  outline: 2px solid rgba(0, 220, 250, .65);\n  box-shadow: 0px 3px 12px rgba(125, 153, 170, .9);\n}\n",document.body.appendChild(n);function l(t){e&&t.target.classList.add("keyOutline")}function d(t){e&&t.target.classList.remove("keyOutline")}function i(){document.querySelectorAll(".keyOutline").forEach((e=>e.classList.remove("keyOutline"))),t.forEach((e=>{e.parentNode&&e.parentNode.removeChild(e)}))}function c(n){if(!e)return;n.preventDefault();let l=n.clientX,d=n.clientY,i=document.elementFromPoint(l,d).getBoundingClientRect(),c=document.createElement("div"),s=document.createElement("div"),r=document.createElement("div");t.push(c,s,r),c.style.position="absolute",c.style.top="0",c.style.left=`${i.left+window.scrollX}px`,c.style.width="1px",c.style.height=`${o}px`,c.style.borderLeft="1px solid rgba(250, 0, 250, .5)",s.style.position="absolute",s.style.top=`${i.top+window.scrollY}px`,s.style.left="0",s.style.width="100vw",s.style.height="1px",s.style.borderTop="1px solid rgba(250, 0, 250, .5)",r.style.position="absolute",r.style.top=`${i.bottom+window.scrollY}px`,r.style.left="0",r.style.width="100vw",r.style.height="1px",r.style.borderTop="1px solid rgba(250, 0, 250, .5)",document.body.appendChild(c),document.body.appendChild(s),document.body.appendChild(r)}document.querySelectorAll("*").forEach((e=>{e.addEventListener("mouseenter",l),e.addEventListener("mouseleave",d)})),document.addEventListener("keyup",(function o(s){"KeyX"===s.code?(i(),document.removeEventListener("click",c),document.removeEventListener("keyup",o),document.querySelectorAll("*").forEach((e=>{e.removeEventListener("mouseenter",l),e.removeEventListener("mouseleave",d)})),document.body.removeChild(n)):"KeyP"===s.code?(e=!e,e||document.querySelectorAll(".keyOutline").forEach((e=>e.classList.remove("keyOutline")))):"KeyC"===s.code?i():"KeyU"===s.code&&function(){if(!(t.length<3))for(let e=0;e<3;e++)document.body.removeChild(t[t.length-1]),t.pop()}()})),document.addEventListener("click",c);})();
```
## Make Outlines
`makeOutlines` will add an outline around every element on the page.

### Keys
`x` - E**x**it the tool

`p` - **P**ause the tool, removing the outlines. Pause can be toggled on and off – unpausing will restore the outlines

### Bookmarklet code
```
javascript:(function(){ let e=!0;const n=document.createElement("style");function t(){document.body.appendChild(n)}function o(){n.parentNode&&n.parentNode.removeChild(n)}n.textContent="\n* {\n  outline: 2px solid rgba(152, 234, 158, 0.65);\n}\n",document.addEventListener("keyup",(function n(d){"KeyX"===d.code?(o(),document.removeEventListener("keyup",n)):"KeyP"===d.code&&(e?o():t(),e=!e)})),t();})();
```
