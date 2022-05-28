const size = 50
const speed = 100

function setup() {
    createCanvas(400, 400);
    frameRate(60)
}

function electron_ring(radius, electron_count) {  
    this.radius = radius
    this.diameter = radius * 2
    this.electron_count = electron_count;
    this.angle = 0
    this.width = 20

    this.draw = function() {
        const cx = width/2
        const cy = height/2
        const spacing = 360 / this.electron_count
        stroke(0)
        noFill()
        circle(cx, cy, this.diameter)

        for (let i = 0; i < this.electron_count; i ++) {  
            this.calculate_position((i * spacing) + this.angle)
            noStroke()
            fill(255, 255, 0)
            ellipse(cx + this.x, cy + this.y, this.width, this.width)
        }
        this.angle += speed/radius
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

const electron_outer_ring = new electron_ring(180, 8)
const electron_inner_ring = new electron_ring(100, 2)

function draw() {
    background(255);
    electron_outer_ring.draw()
    electron_inner_ring.draw()
}