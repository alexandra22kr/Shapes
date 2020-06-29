// import { Shape } from './shape';

let gravity = 10;
let shapesPerSec = 5;

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

const shapesTypes = [
  "Circle",
  "Ellipse",
  "Triangle",
  "Rectangles",
  "Shape 5",
  "Shape 6",
];

class Shape extends PIXI.Graphics {
  constructor() {
    super();
    this.color = this.getRandomColor();
    this.speed = 10;
    this.dead = false;
    this.position = this.getPosition();
  }

  getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "0x";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getPosition() {
    return { x: (Math.random() * window.innerWidth) / 1.5, y: 0 };
  }

  updatePosition() {
    this.position = this.getPosition();
  }

  createCircle() {
    const shape = new PIXI.Graphics();
    shape.beginFill(this.getRandomColor());
    shape.drawCircle(this.position.x, this.position.y, 40);
    shape.endFill();

    return shape;
  }

  createEllipse() {
    const ellipse = new PIXI.Graphics();
    ellipse.beginFill(this.getRandomColor());
    ellipse.drawEllipse(this.position.x, this.position.y, 50, 20);
    ellipse.endFill();
    // ellipse.x = 300;
    // ellipse.y = 300;

    return ellipse;
  }

  createTriangle() {
    let triangle = new PIXI.Graphics();
    triangle.beginFill(this.getRandomColor());

    triangle.drawPolygon([
      -32,
      64,
      32,
      64, //Second point
      0,
      0, //Third point
    ]);

    triangle.endFill();

    triangle.x = this.position.x;
    triangle.y = this.position.y;

    return triangle;
  }

  createRectangle() {
    let rectangle = new PIXI.Graphics();
    rectangle.lineStyle(4, 0xff3300, 1);
    rectangle.beginFill(this.getRandomColor());
    rectangle.drawRect(this.position.x, this.position.y, 64, 64);
    rectangle.endFill();
    // rectangle.x = 170;
    // rectangle.y = 170;

    return rectangle;
  }

  createShape5() {
    let polygon = new PIXI.Graphics();
    polygon.lineStyle(4, 0xff3300, 1);
    polygon.beginFill(0x66ccff);
    polygon.drawPolygon([
        this.position.x, this.position.y,
        (this.position.x + 50), (this.position.y + 50),
        (this.position.x + 100), (this.position.y + 150),
        (this.position.x + 150), (this.position.y + 200),
        (this.position.x + 100), (this.position.y + 150),
        this.position.x, this.position.y,
    ]);
    polygon.endFill();

    return polygon;
  }

  createShape6() {
    const hexagonRadius = 60;
    const hexagonHeight = hexagonRadius * Math.sqrt(3);

    let hexagon = new PIXI.Graphics();
    hexagon.lineStyle(4, 0xff3300, 1);
    hexagon.beginFill(0x66ccff);
    hexagon.drawPolygon([
        -hexagonRadius, 0,
        -hexagonRadius/2, hexagonHeight/2,
        hexagonRadius/2, hexagonHeight/2,
        hexagonRadius, 0,
        hexagonRadius/2, -hexagonHeight/2,
        -hexagonRadius/2, -hexagonHeight/2,
          // -64, 128,             //First point
          // 64, 128,              //Second point
          // 0, 0 
      ])
    hexagon.endFill();

    return hexagon;
  }

  randomShapeType() {
    return shapesTypes[Math.floor(Math.random() * shapesTypes.length)];
  }

  generateShape(type) {
    console.log("type", type);

    if (!shapesTypes.includes(type)) type = this.randomShapeType();

    this.updatePosition();

    switch (type) {
      case "Circle":
        return this.createCircle();
      case "Ellipse":
        return this.createEllipse();
      case "Triangle":
        return this.createTriangle();
      case "Rectangles":
        return this.createRectangle();
      case "Shape 5":
        return this.createShape5();
      case "Shape 6":
        return this.createShape6();
      default:
        return;
    }
  }
}

const shape = new Shape();

const shapes = [];

/// ------------------------------
const shapesAmountText = document.querySelector("#shapesAmount");
const shapesAreaText = document.querySelector("#shapesArea");

/// ------------------------------

function addToArr() {
  setInterval(() => {
    while (shapes.length <= shapesPerSec) {
      let shapeEl = shape.generateShape();
      shapeEl.position.set(100, 0);
      shapeEl.interactive = true;
      // Shows hand cursor
      shapeEl.buttonMode = true;
      shapeEl.on("pointerdown", function handleShape(e) {
        e.stopPropagation();
        e.target.dead = true;
      });

      shapes.push(shapeEl);
      app.stage.addChild(shapeEl);
    }
  }, 1000);
}

addToArr();

// shapes.push(shapeEl);

app.stage.interactive = true;
app.ticker.add(() => {
  for (let i = 0; i <= shapes.length; i++) {
    let shape = shapes[i];

    if (shape) {
      console.log("speeed ....", shape.speed);
      console.log("gravity", gravity);
      shape.y += gravity;
      if (shape.y > 500) {
        shape.dead = true;
      }
    }
  }

  for (let i = 0; i <= shapes.length; i++) {
    if (shapes[i] && shapes[i].dead) {
      app.stage.removeChild(shapes[i]);
      shapes[i].destroy();
      shapes.splice(i, 1);
    }
  }

  shapesAmountText.textContent = shapes.length;
});

const form = document.querySelector("#form");
form.addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();
  gravity = form.gravity.value;
  shapesPerSec = form.amount.value;
}

console.log("width: ............... ", app.width);
