"use strict";
class Flake {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.radius = 0;
        this.alpha = 0;
        // set image here so that it is only loaded once
        this.img = new Image();
        this.img.src = "assets/img.png";
        this.img.width = 100;
        this.img.height = 100;
        this.reset();
    }
    reset() {
        this.x = this.random(0, window.innerWidth);
        this.y = this.random(-window.innerHeight, -50);
        this.vx = this.random(-3, 3);
        this.vy = this.random(2, 5);
        this.radius = this.random(1, 4);
        this.alpha = this.random(0.1, 0.9);
    }
    random(min, max) {
        return min + Math.random() * (max - min + 1);
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.y + this.radius > window.innerHeight) {
            this.reset();
        }
    }
}
class Snow {
    constructor() {
        this.canvas = document.getElementById("snowflake");
        this.ctx = this.canvas.getContext("2d");
        this.flakes = [];
        this.flakeCount = window.innerWidth / 20;
        for (let i = 0; i < this.flakeCount; i++) {
            this.flakes.push(new Flake());
        }
        this.canvas.width = window.innerWidth - 20;
        this.canvas.height = window.innerHeight - 20;
        window.addEventListener("resize", () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
        document.body.appendChild(this.canvas);
        this.render();
    }
    render() {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.flakes.forEach((flake) => {
            flake.update();
            this.ctx.save();
            this.ctx.globalAlpha = flake.alpha;
            this.ctx.drawImage(flake.img, flake.x, flake.y);
            this.ctx.restore();
        });
        requestAnimationFrame(this.render.bind(this));
    }
}
new Snow();
