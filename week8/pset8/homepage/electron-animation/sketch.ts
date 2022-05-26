var count = 0
const size = 50

function setup() {
    createCanvas(400, 400);
  
}

class electron {  
    
    constructor(radius) {
        this.radius = radius
    }

    this.width = 20;

    

    this.draw = function() {
        this.calculate_position()
        ellipse(this.x, this.y, this.width, this.width)
    }

    this.calculate_position = function() {
        this.x = sin(this.angle) * this.radius
        this.y = cos(this.angle) * this.radius
    }

    this.orbit_cx = function (position, size) {
        return(sin(position) * size)
    }

    this.orbit_cy = function (position, size) {
        return(cos(position) * size)
    }
}

function draw() {
    background(220);

  
    count+=0.1
  
}