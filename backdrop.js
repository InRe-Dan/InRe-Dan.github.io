var canvas = document.querySelector("#myCanvas")
var body = document.querySelector("body")
var ctx = canvas.getContext("2d")
setInterval(canvasFrame, 1000 / 60)
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function canvasFrame() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    if (wind_goal - wind[0] > 0.03) {
        wind[0] += 0.0003
    } else if (wind[0] - wind_goal > 0.03) {
        wind[0] -= 0.0003
    } else {
        wind_goal = (- 0.1) - (Math.random() * 0.4)
    }
    while (particles.length < 100) {
        particles.push(new Particle())
    }

    for (let i = 0; i < particles.length; i++) {
        particles[i].update()
    }
}

class Vector extends Array {
    add(other) {
      return this.map((e, i) => e + other[i]);
    }
    divide(other) {
        return this.map((e, i) => e / other[i])
    }
}

var particles = []
let wind = new Vector(-0.2, 0.15)
let wind_goal = -0.25


class Particle {
    constructor() {
        this.velocity = new Vector(wind[0] * 10, wind[1] * 10)
        this.setDefaults()
        this.x = window.innerWidth * Math.random()
        this.y = window.innerHeight * Math.random()
    }

    setDefaults() {
        this.setNewSpawn()
        this.width = Math.random() * 5 + 3
        this.mass = 3 + Math.random() * this.width;
    }
    
    update() {
        if (this.x < -20 || this.y > window.innerHeight + 20) {
            this.setDefaults()
        }
        this.velocity = this.velocity.add(wind.divide(new Vector(this.mass, this.mass)))
        this.velocity = new Vector(this.velocity[0] / (1.03), this.velocity[1] / (1.03))
        this.x += this.velocity[0]
        this.y += this.velocity[1]
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width, 0, 2*3.142)
        var grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.width / 2)
        grad.addColorStop(0, "rgb(255, 255, 255, 0.5)");
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad
        ctx.fill()
    }

    setNewSpawn() {
        let rand = Math.random() * (window.innerWidth + window.innerHeight)
        if (rand < window.innerWidth) {
            this.y = -20
            this.x = rand;
        } else {

        }
        this.x = window.innerWidth + 20
        this.y = rand - window.innerWidth;
    }
}

function resizeHandler() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

document.addEventListener("mousemove", parallax);

function parallax(e) {
        let _w = window.innerWidth/2;
        let _h = window.innerHeight/2;
        let _mouseX = e.clientX;
        let _mouseY = e.clientY;
        let scale = 0.03
        let _depth1 = `${50 - (_mouseX - _w) * 0.01 * scale}% ${50 - (_mouseY - _h) * 0.01 * scale}%`;
        let _depth2 = `${50 - (_mouseX - _w) * 0.02 * scale}% ${50 - (_mouseY - _h) * 0.02 * scale}%`;
        let _depth3 = `${50 - (_mouseX - _w) * 0.06 * scale}% ${50 - (_mouseY - _h) * 0.06 * scale}%`;
        let x = `${_depth3}, ${_depth2}, ${_depth1}`;
        body.style.backgroundPosition = x;
}