const size = 50
const speed = 2


function setup() {
    createCanvas(400, 400);
    frameRate(60)
}

function electron(radius, electron_count) {  
    this.radius = radius
    this.diameter = radius * 2
    this.electron_count = electron_count;
    this.angle = 0
    this.width = 20

    this.draw = function() {
        const centre_x = width/2
        const centre_y = height/2
        const spacing = 360 / this.electron_count
        stroke(0)
        noFill()
        circle(centre_x, centre_y, this.diameter)

        for (let i = 0; i < this.electron_count; i ++) {  
            this.calculate_position((i * spacing) + this.angle)
            noStroke()
            fill(255, 255, 0)
            ellipse(centre_x + this.x, centre_y + this.y, this.width, this.width)
        }
    }

    this.calculate_position = function(degree_offset) {
        const radian_offset = to_radian(degree_offset)
        
        this.x = Math.sin(radian_offset) * this.radius
        this.y = -Math.cos(radian_offset) * this.radius
    }
}

function to_radian(angle) {
    return angle * (Math.PI / 180)
}

const my_electron = new electron(180, 4)

function draw() {
    background(220);
    my_electron.draw()
    my_electron.angle += speed  
}