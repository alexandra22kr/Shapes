// import { Shape } from './shape';

let gravity = 10;
let shapesPerSec = 5;


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
    //   console.log("speeed ....", shape.speed);
    //   console.log("gravity", gravity);
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

