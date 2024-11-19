# Browser-measure
This repo has a set of tools that will help measure distancee and draw lines to check alignment on a webpage. The tools are intended to be used as bookmarklets, or alternatively via the browser devtools JS console.


## Draw Distance Lines 
`drawDistanceLines` will add a vertical and horizontal lines to the the page based on the cursor position. Once more than one set of lines is added, it will show the horizontal and vertical distance between the last two drawn crop marks.

### Keys
`x` - E**x**it the tool

`c` - **C**lear any existing lines and continue adding new lines

## Draw Vertical/Horizontal Lines 
`drawHorizontalDistanceLines` and `drawVerticalDistanceLines` are similar to the `drawDistanceLines` but will only draw the horizontal and vertical lines, and add the labels to note distance between those lines.

### Keys
`x` - E**x**it the tool

`c` - **C**lear any existing lines and continue adding new lines


## Draw with Outlines
`drawWithOutlines` will highlight the element that is currently under the cursor (along with with it's parent elements), while the element is being hovered. On click It will add a left vertical, as well as top and bottom horiziontal lines along the elements dimensions. 

### Keys
`x` - E**x**it the tool

`c` - **C**lear any existing lines and continue adding new lines

`p` - **P**ause the tool but keep existing lines, clear all outlines. Pause can be toggled on and off
