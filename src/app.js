const display = document.getElementById("display");

let app = new PIXI.Application({
  width: window.innerWidth / 1.5, // default: 800
  height: window.innerHeight / 1.5, // default: 600
  antialias: true, // default: false
  transparent: false, // default: false
  resolution: 1, // default: 1
  backgroundColor: "0xdddfff",
});

display.appendChild(app.view);