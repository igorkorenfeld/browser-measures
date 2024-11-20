# Browser measure
This repo has a set of tools that will help measure distances and draw lines to check alignment on a webpage. The tools are intended to be used as bookmarklets or alternatively via the browser devtools JS console.


## Draw Distance Lines
`drawDistanceLines` will add a vertical and horizontal lines to the the page based on the cursor position. When more than one set of lines is added, it will show the horizontal and vertical distance between the last two added marks.

### Keys
`x` - E**x**it the tool

`c` - **C**lear any existing lines and continue adding new lines

### Bookmarklet code
```javascript
javascript:(function(){let e=!0;let t=[],l=[];function d(){const e=document.createElement("div"),l=document.createElement("div");e.style.position="absolute",e.style.top="0",e.style.left="0",e.style.width="1px",e.style.height=`${window.innerHeight}px`,e.style.borderLeft="1px solid rgba(250, 0, 250, .5)",l.style.position="absolute",l.style.top=0,l.style.left=0,l.style.width="100vw",l.style.height="1px",l.style.borderTop="1px solid rgba(250, 0, 250, .5)",document.body.appendChild(e),document.body.appendChild(l),t.push([e,l])}function o(e){t[t.length-1][0].style.left=`${e.clientX}px`,t[t.length-1][1].style.top=`${e.clientY}px`}function n(){d(),t.length>2&&function(e,t){const d={dx:parseInt(e[0].style.left)-parseInt(t[0].style.left),dy:parseInt(e[1].style.top)-parseInt(t[1].style.top)};dxLabel=document.createElement("div"),dyLabel=document.createElement("div"),l.push([dxLabel,dyLabel]),dxLabel.appendChild(document.createTextNode(`${Math.abs(d.dx)}`)),dyLabel.appendChild(document.createTextNode(`${Math.abs(d.dy)}`)),dxLabel.style.position="absolute",dyLabel.style.position="absolute",d.dx<0?(dxLabel.style.left=e[0].style.left,dyLabel.style.left=e[0].style.left):(dxLabel.style.left=t[0].style.left,dyLabel.style.left=t[0].style.left),d.dy<0?(dxLabel.style.top=parseInt(t[1].style.top)-12-2+"px",dyLabel.style.top=`${parseInt(e[1].style.top)}px`):(dxLabel.style.top=parseInt(e[1].style.top)-12-2+"px",dyLabel.style.top=`${parseInt(t[1].style.top)}px`),dxLabel.style.width=`${Math.abs(d.dx)}px`,dxLabel.style.textAlign="center",dxLabel.style.backgroundColor="rgba(125, 16, 83, 0.75)",dxLabel.style.color="rgba(242, 221, 242, 0.9)",dxLabel.style.fontFamily="monospace, monospace",dxLabel.style.fontSize="12px",document.body.appendChild(dxLabel),dyLabel.style.height=`${Math.abs(d.dy)}px`,dyLabel.style.verticalAlign="middle",dyLabel.style.backgroundColor="rgba(125, 16, 83, 0.75)",dyLabel.style.color="rgba(242, 221, 242, 0.9)",dyLabel.style.display="flex",dyLabel.style.alignItems="center",dyLabel.style.fontFamily="monospace, monospace",dyLabel.style.fontSize="12px",document.body.appendChild(dyLabel)}(t[t.length-3],t[t.length-2])}d(),document.addEventListener("mousemove",o),document.addEventListener("click",n),document.addEventListener("keyup",(function d(s){"KeyX"===s.code?(t.forEach((e=>{document.body.removeChild(e[0]),document.body.removeChild(e[1])})),t=[],l.forEach((e=>{document.body.removeChild(e[0]),document.body.removeChild(e[1])})),l=[],document.removeEventListener("mousemove",o),document.removeEventListener("click",n),document.removeEventListener("keyup",d)):"KeyP"===s.code&&(e=!e,e||document.querySelectorAll(".keyOutline").forEach((e=>e.classList.remove("keyOutline"))))}));})();
```

## Draw dy Lines
`drawDyLines` is similar to the `drawDistanceLines` but will only draw lines to denote the veritcal distance between clicks. It will also add the labels to note distance between those lines.

### Keys
`x` - E**x**it the tool

`c` - **C**lear any existing lines and continue adding new lines

`p` - **P**ause the tool, will keep existing lines on the page but will not create a new line to place on click.Pause can be toggled on and off.


### Bookmarklet code
```javascript
javascript:(function(){let e=!0;let t=[],o=[];function l(){const e=document.createElement("div");e.style.position="absolute",e.style.top=0,e.style.left=0,e.style.width="100vw",e.style.height="1px",e.style.borderTop="1px solid rgba(250, 0, 250, .5)",document.body.appendChild(e),t.push(e)}function n(o){e&&(t[t.length-1].style.top=`${o.clientY+window.scrollY}px`)}function d(){e&&(l(),t.length>2&&function(e,t){const l=parseInt(e.style.top)-parseInt(t.style.top);dyLabel=document.createElement("div"),o.push(dyLabel),dyLabel.appendChild(document.createTextNode(`${Math.abs(l)}`)),dyLabel.style.position="absolute",dyLabel.style.top=l<0?`${parseInt(e.style.top)}px`:`${parseInt(t.style.top)}px`,dyLabel.style.height=`${Math.abs(l)}px`,dyLabel.style.verticalAlign="middle",dyLabel.style.backgroundColor="rgba(125, 16, 83, 0.75)",dyLabel.style.color="rgba(242, 221, 242, 0.9)",dyLabel.style.display="flex",dyLabel.style.alignItems="center",dyLabel.style.fontFamily="monospace, monospace",dyLabel.style.fontSize="12px",dyLabel.style.left=12*(o.length-1)*2%document.body.scrollWidth+"px",document.body.appendChild(dyLabel)}(t[t.length-3],t[t.length-2]))}function s(){t.forEach((e=>{document.body.removeChild(e)})),t=[],o.forEach((e=>{document.body.removeChild(e)})),o=[]}l(),document.addEventListener("mousemove",n),document.addEventListener("click",d),document.addEventListener("keyup",(function o(y){"KeyX"===y.code?(s(),document.removeEventListener("mousemove",n),document.removeEventListener("click",d),document.removeEventListener("keyup",o)):"KeyC"===y.code?(s(),l()):"KeyP"===y.code&&(e?(document.body.removeChild(t[t.length-1]),t.pop()):l(),e=!e)}));})();
```
## Draw dx Lines
`drawDxLines` ise similar to the `drawDistanceLines` but will only draw the lines to denote teh horizontal distance between clicks. It will also add the labels to note distance between those lines.

### Keys
`x` - E**x**it the tool

`c` - **C**lear any existing lines and continue adding new lines

`p` - **P**ause the tool, will keep existing lines on the page but will not create a new line to place on click.Pause can be toggled on and off.

### Bookmarklet code
```javascript
javascript:(function(){let e=!0;const t=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight);let o=[],l=[];function n(){const e=document.createElement("div");e.style.position="absolute",e.style.top="0",e.style.left="0",e.style.width="1px",e.style.height=`${t}px`,e.style.borderLeft="1px solid rgba(250, 0, 250, .5)",document.body.appendChild(e),o.push(e)}function d(t){e&&(o[o.length-1].style.left=`${t.clientX}px`)}function c(t){e&&(n(),console.log("marks length:"),console.log(o.length),console.log(o),o.length>2&&function(e,t,o){console.log(parseInt(e.style.left)-parseInt(t.style.left));const n=parseInt(e.style.left)-parseInt(t.style.left);dxLabel=document.createElement("div"),l.push(dxLabel),dxLabel.appendChild(document.createTextNode(`${Math.abs(n)}`)),dxLabel.style.position="absolute",dxLabel.style.left=n<0?e.style.left:t.style.left,dxLabel.style.width=`${Math.abs(n)}px`,dxLabel.style.textAlign="center",dxLabel.style.backgroundColor="rgba(125, 16, 83, 0.75)",dxLabel.style.color="rgba(242, 221, 242, 0.9)",dxLabel.style.fontFamily="monospace, monospace",dxLabel.style.fontSize="12px",dxLabel.style.top=`${o+window.scrollY}px`,document.body.appendChild(dxLabel)}(o[o.length-3],o[o.length-2],t.clientY))}function s(){o.forEach((e=>{document.body.removeChild(e)})),o=[],l.forEach((e=>{document.body.removeChild(e)})),l=[]}n(),document.addEventListener("mousemove",d),document.addEventListener("click",c),document.addEventListener("keyup",(function t(l){"KeyX"===l.code?(s(),document.removeEventListener("mousemove",d),document.removeEventListener("click",c),document.removeEventListener("keyup",t)):"KeyC"===l.code?(s(),n()):"KeyP"===l.code&&(e?(document.body.removeChild(o[o.length-1]),o.pop()):n(),e=!e)}));})();
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
