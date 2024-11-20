# Browser measure
This repo has a set of tools that will help measure distancee and draw lines to check alignment on a webpage. The tools are intended to be used as bookmarklets, or alternatively via the browser devtools JS console.


## Draw Distance Lines 
`drawDistanceLines` will add a vertical and horizontal lines to the the page based on the cursor position. Once more than one set of lines is added, it will show the horizontal and vertical distance between the last two drawn crop marks.

### Keys
`x` - E**x**it the tool

`c` - **C**lear any existing lines and continue adding new lines


## Draw Vertical/Horizontal Lines 
`drawHorizontalDistanceLines` and `drawVerticalDistanceLines` are similar to the `drawDistanceLines` but will only draw the horizontal or vertical lines. It will also add the labels to note distance between those lines.

### Keys
`x` - E**x**it the tool

`c` - **C**lear any existing lines and continue adding new lines

`p` - **P**ause the tool, will keep existing lines on the page but will not create a new line to place on click.Pause can be toggled on and off.

## Draw with Outlines
`drawWithOutlines` will highlight the element that is currently under the cursor (along with with it's parent elements), while the element is being hovered. On click It will add a left vertical, as well as top and bottom horiziontal lines along the elements dimensions. 

### Keys
`x` - E**x**it the tool

`c` - **C**lear any existing lines and continue adding new lines

`p` - **P**ause the tool but keep existing lines, clear all outlines. Pause can be toggled on and off

## Make Outlines
`makeOutlines` will add an outline around every element on the page. 
 
### Keys
`x` - E**x**it the tool

`p` - **P**ause the tool, removing the outlines. Pause can be toggled on and off – unpausing will restore the outlines

### Bookmarklet code
```
javascript:(function(){ let e=!0;const n=document.createElement("style");function t(){document.body.appendChild(n)}function o(){n.parentNode&&n.parentNode.removeChild(n)}n.textContent="\n* {\n  outline: 2px solid rgba(152, 234, 158, 0.65);\n}\n",document.addEventListener("keyup",(function n(d){"KeyX"===d.code?(o(),document.removeEventListener("keyup",n)):"KeyP"===d.code&&(e?o():t(),e=!e)})),t();})();
```
