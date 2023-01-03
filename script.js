const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

let mouseX;
let mouseY;

class Particles {
    constructor() {
        this.position = {
            x: canvas.width / 2,
            y: canvas.height / 2,
        }
        this.size = 5;
        this.velocity = {
            x: 1,
            y: 1,
        }

        this.clicked = false;

        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256); 
        let b = Math.floor(Math.random() * 256); 

            this.color = "rgb(" + r + "," + g + "," + b + ")"; 
    }

    draw() {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI)
        ctx.fill()
        ctx.closePath()
    }

    randomMove() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.size <= 5) {
            this.size += 0.1
        }
        
        let angle = Math.random() * (2 * Math.PI) - 5; 
        let speed = 10
        this.velocity.x += Math.cos(angle) * speed; 
        this.velocity.y += Math.sin(angle) * speed; 

    
        if (this.position.x + this.velocity.x < 0 || this.position.x + this.velocity.x > canvas.width) {
        
            this.velocity.x -= this.velocity.x;
        }

    
        if (this.position.y + this.velocity.y < 0 || this.position.y + this.velocity.y > canvas.height) {
        
            this.velocity.y -= this.velocity.y;
        }
    }

    mouseFollow() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        
        if (this.size >= 2) {
            this.size-= 0.1
        }

        let dx = mouseX - this.position.x; 
        let dy = mouseY - this.position.y; 
        let angle = Math.atan2(dy, dx);
        let speed = Math.random() * (0.1 - 0.05) + 0.05
        this.velocity.x = Math.cos(angle) * speed; 
        this.velocity.y = Math.sin(angle) * speed;
        
        this.position.x += (mouseX - this.position.x) * speed;
        this.position.y += (mouseY - this.position.y) * speed;

        if (this.position.x + this.velocity.x < 0 || this.position.x + this.velocity.x > canvas.width) {

            this.velocity.x -= this.velocity.x;
        }


        if (this.position.y + this.velocity.y < 0 || this.position.y + this.velocity.y > canvas.height) {

            this.velocity.y -= this.velocity.y;
        }
    }
}

const particleArr = []
const maximum = 250;

const animate = () => {
    requestAnimationFrame(animate)

    ctx.fillStyle = "rgba(39, 39, 39, 0.5)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)


    setInterval(() => {
        if (maximum > particleArr.length) {
            particleArr.push(new Particles())
        }
        }, 0);

    particleArr.forEach((data) => {
        data.draw()
        if (data.clicked) {
            data.mouseFollow()
        } else {
            data.randomMove()
        }
    })
}

addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY
})

addEventListener("click", () => {
    particleArr.forEach((data) => {
        if (particleArr.length >= maximum) {
            if (data.clicked) {
                data.clicked = false
            } else {
                data.clicked = true
            }
        } else {
            data.clicked = false
        }
    })
})

animate()