# Konva.js Cubes
![](src/assets/logo.png "Konva.js")
__________________________________
The project is also deployed on Vercel: https://danaxa-konva-challenge.vercel.app/

## Introduction

This was my first time using [Konva.js](https://konvajs.org/). The challenge was to use it with Vue.js (vue-konva library) to create a simple application for drawing cubes out of 2D shapes.
The program must receive three clicks to create a cube. The first two clicks determine the front face of the cube, while the third click determines its depth.


<!-- My approach was:
1. Create a separated component for cubes (called VCube).
2. Handle the click and tap events in the parent component.
3. Send coordinates of the click events to the VCube component as a prop.
4. Draw the front face as a rectangle, and pass the coordinates of the click events to utility functions to get the vertices for other faces.
5. Draw the other faces as polygons.
6. Group the shape as two polygons and a rectangle. -->

No other libraries were used.

__________________________________

### To run the project:
```
npm install && npm run serve
```



