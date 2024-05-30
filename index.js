var button1 = document.querySelector("#button1")
var button2 = document.querySelector("#button2")
var button3 = document.querySelector("#button3")
var menu = document.querySelector(".menu")
var canvas = document.querySelector("#myCanvas")
var ctx = canvas.getContext("2d")
setInterval(canvasFrame, 1000 / 60)
var frames = 0
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
        this.setDefaults()
    }

    setDefaults() {
        this.setNewSpawn()
        this.velocity = new Vector(0, 0)
        this.width = Math.random() * 5 + 3
        this.mass = 3 + Math.random() * this.width;
    }
    
    update() {
        if (this.x < -20 || this.y > window.innerHeight + 20) {
            this.setDefaults()
        }
        this.velocity = this.velocity.add(wind.divide(new Vector(this.mass, this.mass)))
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
        this.y = -20
        this.x = Math.random() * window.innerWidth * 2;
    }
}

button1.onclick = whenClicked

function resizeHandler() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function canvasFrame() {
    frames += 1
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    if (wind_goal - wind[0] > 0.03) {
        wind[0] += 0.0003
    } else if (wind[0] - wind_goal > 0.03) {
        wind[0] -= 0.0003
    } else {
        wind_goal = (- 0.1) - (Math.random() * 0.4)
    }
    if (particles.length < 100) {
        if (Math.random() < 0.1) {
        particles.push(new Particle())
        }
    }

    for (let i = 0; i < particles.length; i++) {
        particles[i].update()
    }
}

function whenClicked() {
    console.log("yea")
}