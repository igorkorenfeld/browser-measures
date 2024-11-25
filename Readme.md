# Browser measure
This repo has a set of tools that will help measure distances and draw lines to check alignment on a webpage. The tools are intended to be used as bookmarklets or alternatively via the browser devtools JS console.


## Draw Distance Lines
`drawDistanceLines` will add a vertical and horizontal lines to the the page based on the cursor position. When more than one set of lines is added, it will show the horizontal and vertical distance between the last two added marks.

### Keys
`x` - E**x**it the tool

`c` - **C**lear any existing lines and continue adding new lines

`p` - **P**ause the tool, will keep existing lines on the page but will not create a new line to place on click. Pause can be toggled on and off.

`s` - **S**kip calculating a distance, but allow to add a line. Once a line is added, the next distance will be calculated as normal, unless "s" is pressed again. 


### Bookmarklet code
```javascript
javascript:(function(){let e=!0,t=!1;let o=[],l=[];function d(){const e=document.createElement("div"),t=document.createElement("div");e.style.position="absolute",e.style.top="0",e.style.left="0",e.style.width="1px",e.style.height=`${window.innerHeight}px`,e.style.borderLeft="1px solid rgba(250, 0, 250, .5)",t.style.position="absolute",t.style.top=0,t.style.left=0,t.style.width="100vw",t.style.height="1px",t.style.borderTop="1px solid rgba(250, 0, 250, .5)",document.body.appendChild(e),document.body.appendChild(t),o.push([e,t])}function n(t){e&&(o[o.length-1][0].style.left=`${t.clientX}px`,o[o.length-1][1].style.top=`${t.clientY}px`)}function s(){e&&(d(),o.length>2&&function(e,o){if(t)return void(t=!1);const d={dx:parseInt(e[0].style.left)-parseInt(o[0].style.left),dy:parseInt(e[1].style.top)-parseInt(o[1].style.top)},n=document.createElement("div"),s=document.createElement("div");l.push([n,s]),n.appendChild(document.createTextNode(`${Math.abs(d.dx)}`)),s.appendChild(document.createTextNode(`${Math.abs(d.dy)}`)),n.style.position="absolute",s.style.position="absolute",d.dx<0?(n.style.left=e[0].style.left,s.style.left=e[0].style.left):(n.style.left=o[0].style.left,s.style.left=o[0].style.left),d.dy<0?(n.style.top=parseInt(o[1].style.top)-12-2+"px",s.style.top=`${parseInt(e[1].style.top)}px`):(n.style.top=parseInt(e[1].style.top)-12-2+"px",s.style.top=`${parseInt(o[1].style.top)}px`),n.style.width=`${Math.abs(d.dx)}px`,n.style.textAlign="center",n.style.backgroundColor="rgba(125, 16, 83, 0.75)",n.style.color="rgba(242, 221, 242, 0.9)",n.style.fontFamily="monospace, monospace",n.style.fontSize="12px",document.body.appendChild(n),s.style.height=`${Math.abs(d.dy)}px`,s.style.verticalAlign="middle",s.style.backgroundColor="rgba(125, 16, 83, 0.75)",s.style.color="rgba(242, 221, 242, 0.9)",s.style.display="flex",s.style.alignItems="center",s.style.fontFamily="monospace, monospace",s.style.fontSize="12px",document.body.appendChild(s)}(o[o.length-3],o[o.length-2]))}d(),document.addEventListener("mousemove",n),document.addEventListener("click",s),document.addEventListener("keyup",(function y(i){if("KeyX"===i.code)o.forEach((e=>{document.body.removeChild(e[0]),document.body.removeChild(e[1])})),o=[],l.forEach((e=>{document.body.removeChild(e[0]),document.body.removeChild(e[1])})),l=[],document.removeEventListener("mousemove",n),document.removeEventListener("click",s),document.removeEventListener("keyup",y);else if("KeyC"===i.code)o.forEach((e=>{document.body.removeChild(e[0]),document.body.removeChild(e[1])})),o=[],l.forEach((e=>{document.body.removeChild(e[0]),document.body.removeChild(e[1])})),l=[],d();else if("KeyP"===i.code){if(e){const e=o[o.length-1];document.body.removeChild(e[0]),document.body.removeChild(e[1]),o.pop()}else d();e=!e}else"KeyS"===i.code&&(t=!0)}));})();
```

## Draw dy Lines
`drawDyLines` is similar to the `drawDistanceLines` but will only draw lines to denote the veritcal distance between clicks. It will also add the labels to note distance between those lines.

### Keys
`x` - E**x**it the tool

`c` - **C**lear any existing lines and continue adding new lines

`p` - **P**ause the tool, will keep existing lines on the page but will not create a new line to place on click. Pause can be toggled on and off.

`s` - **S**kip calculating a distance, but allow to add a line. Once a line is added, the next distance will be calculated as normal, unless "s" is pressed again. 


### Bookmarklet code
```javascript
javascript:(function(){let e=!0,t=!1;let o=[],n=[];function l(){const e=document.createElement("div");e.style.position="absolute",e.style.top=0,e.style.left=0,e.style.width="100vw",e.style.height="1px",e.style.borderTop="1px solid rgba(250, 0, 250, .5)",document.body.appendChild(e),o.push(e)}function d(t){e&&(o[o.length-1].style.top=`${t.clientY+window.scrollY}px`)}function s(){e&&(l(),o.length>2&&function(e,o){if(t)return void(t=!1);const l=parseInt(e.style.top)-parseInt(o.style.top),d=document.createElement("div");n.push(d),d.appendChild(document.createTextNode(`${Math.abs(l)}`)),d.style.position="absolute",d.style.top=l<0?`${parseInt(e.style.top)}px`:`${parseInt(o.style.top)}px`,d.style.height=`${Math.abs(l)}px`,d.style.verticalAlign="middle",d.style.backgroundColor="rgba(125, 16, 83, 0.75)",d.style.color="rgba(242, 221, 242, 0.9)",d.style.display="flex",d.style.alignItems="center",d.style.fontFamily="monospace, monospace",d.style.fontSize="12px",d.style.left=12*(n.length-1)*2%document.body.scrollWidth+"px",document.body.appendChild(d)}(o[o.length-3],o[o.length-2]))}function c(){o.forEach((e=>{document.body.removeChild(e)})),o=[],n.forEach((e=>{document.body.removeChild(e)})),n=[]}l(),document.addEventListener("mousemove",d),document.addEventListener("click",s),document.addEventListener("keyup",(function n(i){"KeyX"===i.code?(c(),document.removeEventListener("mousemove",d),document.removeEventListener("click",s),document.removeEventListener("keyup",n)):"KeyC"===i.code?(c(),l()):"KeyP"===i.code?(e?(document.body.removeChild(o[o.length-1]),o.pop()):l(),e=!e):"KeyS"===i.code&&(t=!0)}));})();
```
## Draw dx Lines
`drawDxLines` ise similar to the `drawDistanceLines` but will only draw the lines to denote teh horizontal distance between clicks. It will also add the labels to note distance between those lines.

### Keys
`x` - E**x**it the tool

`c` - **C**lear any existing lines and continue adding new lines

`p` - **P**ause the tool, will keep existing lines on the page but will not create a new line to place on click. Pause can be toggled on and off.

`s` - **S**kip calculating a distance, but allow to add a line. Once a line is added, the next distance will be calculated as normal, unless "s" is pressed again. 


### Bookmarklet code
```javascript
javascript:(function(){let e=!0,t=!1;const o=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight);let n=[],l=[];function d(){const e=document.createElement("div");e.style.position="absolute",e.style.top="0",e.style.left="0",e.style.width="1px",e.style.height=`${o}px`,e.style.borderLeft="1px solid rgba(250, 0, 250, .5)",document.body.appendChild(e),n.push(e)}function c(t){e&&(n[n.length-1].style.left=`${t.clientX}px`)}function s(o){e&&(d(),n.length>2&&function(e,o,n){if(t)return void(t=!1);const d=parseInt(e.style.left)-parseInt(o.style.left),c=document.createElement("div");l.push(c),c.appendChild(document.createTextNode(`${Math.abs(d)}`)),c.style.position="absolute",c.style.left=d<0?e.style.left:o.style.left,c.style.width=`${Math.abs(d)}px`,c.style.textAlign="center",c.style.backgroundColor="rgba(125, 16, 83, 0.75)",c.style.color="rgba(242, 221, 242, 0.9)",c.style.fontFamily="monospace, monospace",c.style.fontSize="12px",c.style.top=`${n+window.scrollY}px`,document.body.appendChild(c)}(n[n.length-3],n[n.length-2],o.clientY))}function i(){n.forEach((e=>{document.body.removeChild(e)})),n=[],l.forEach((e=>{document.body.removeChild(e)})),l=[]}d(),document.addEventListener("mousemove",c),document.addEventListener("click",s),document.addEventListener("keyup",(function o(l){"KeyX"===l.code?(i(),document.removeEventListener("mousemove",c),document.removeEventListener("click",s),document.removeEventListener("keyup",o)):"KeyC"===l.code?(i(),d()):"KeyP"===l.code?(e?(document.body.removeChild(n[n.length-1]),n.pop()):d(),e=!e):"KeyS"===l.code&&(t=!0)}));})();
```


## Draw with Outlines
`drawWithOutlines` will highlight the element that is currently under the cursor (along with with it's parent elements), while the element is being hovered. On click It will add a left vertical, as well as top and bottom horiziontal lines along the elements dimensions.

### Keys
`x` - E**x**it the tool

`c` - **C**lear any existing lines and continue adding new lines

`p` - **P**ause the tool but keep existing lines, clear all outlines. Pause can be toggled on and off


### Bookmarklet code
```javascript
javascript:(function(){let e=!0,t=[];const o=document.createElement("style");o.textContent="\n.keyOutline {\n  outline: 2px solid rgba(0, 220, 250, .65);\n  box-shadow: 0px 3px 12px rgba(125, 153, 170, .9);\n}\n",document.body.appendChild(o);function n(t){e&&t.target.classList.add("keyOutline")}function l(t){e&&t.target.classList.remove("keyOutline")}function d(){document.querySelectorAll(".keyOutline").forEach((e=>e.classList.remove("keyOutline"))),t.forEach((e=>{e.parentNode&&e.parentNode.removeChild(e)}))}function i(o){if(!e)return;o.preventDefault();let n=o.clientX,l=o.clientY,d=document.elementFromPoint(n,l).getBoundingClientRect(),i=document.createElement("div"),r=document.createElement("div"),s=document.createElement("div");t.push(i,r,s),i.style.position="absolute",i.style.top="0",i.style.left=`${d.left+window.scrollX}px`,i.style.width="1px",i.style.height=`${window.innerHeight}px`,i.style.borderLeft="1px solid rgba(250, 0, 250, .5)",r.style.position="absolute",r.style.top=`${d.top+window.scrollY}px`,r.style.left="0",r.style.width="100vw",r.style.height="1px",r.style.borderTop="1px solid rgba(250, 0, 250, .5)",s.style.position="absolute",s.style.top=`${d.bottom+window.scrollY}px`,s.style.left="0",s.style.width="100vw",s.style.height="1px",s.style.borderTop="1px solid rgba(250, 0, 250, .5)",document.body.appendChild(i),document.body.appendChild(r),document.body.appendChild(s)}document.querySelectorAll("*").forEach((e=>{e.addEventListener("mouseenter",n),e.addEventListener("mouseleave",l)})),document.addEventListener("keyup",(function t(r){"KeyX"===r.code?(d(),document.removeEventListener("click",i),document.removeEventListener("keyup",t),document.querySelectorAll("*").forEach((e=>{e.removeEventListener("mouseenter",n),e.removeEventListener("mouseleave",l)})),document.body.removeChild(o)):"KeyP"===r.code?(e=!e,e||document.querySelectorAll(".keyOutline").forEach((e=>e.classList.remove("keyOutline")))):"KeyC"===r.code&&d()})),document.addEventListener("click",i);})();
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
