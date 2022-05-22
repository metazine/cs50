var count = 0
const size = 50

function setup() {
  createCanvas(400, 400);
}

function electron(x, y) {
  let electronSize = 20;
  ellipse(x, y, electronSize, electronSize);
  
}

function orbitX(position, size) {
  return(sin(position) * size)
}

function orbitY(position, size) {
  return(cos(position) * size)
}


function draw() {
  background(220);
  x = orbitX(count, size)
  y = orbitY(count, size)
  
  electron(x, y)
  count+=0.1
  
}