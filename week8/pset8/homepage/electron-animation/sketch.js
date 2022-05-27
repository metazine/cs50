var count = 0
const size = 50


function setup() {
    createCanvas(400, 400);
    frameRate(120)
}

function electron(radius) {  
    this.radius = radius
    this.angle = 0

    this.width = 20

    

    this.draw = function() {
        
        this.calculate_position()
        ellipse(width/2 + this.x, height/2 + this.y, this.width, this.width)
    }

    this.calculate_position = function() {
        this.x = sin(this.angle) * this.radius
        this.y = -cos(this.angle) * this.radius
    }

    this.orbit_cx = function (position, size) {
        return(sin(position) * size)
    }

    this.orbit_cy = function (position, size) {
        return(cos(position) * size)
    }
}

const my_electron = new electron(200)

function draw() {
    background(220);
    my_electron.draw()
    my_electron.angle+=0.05
    count+=0.1
  
}