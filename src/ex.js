const world = document.querySelector('.faces');
const { Engine, Render, Runner, World, Bodies } = Matter;

let engine = Engine.create();

const textures = ['/src/img/red.svg'];
function init() {
  let width = $(window).width();
  let height = $(window).height();
  let vmin = Math.min(width, height);

  engine.events = {};
  World.clear(engine.world);
  Engine.clear(engine);
  engine = Engine.create();

  let render = Render.create({
    canvas: world,
    engine: engine,
    options: {
      wireframes: false,
      background: 'transparent',
      width: width,
      height: height,
    },
  });

  World.add(engine.world, [
    Bodies.rectangle(width / 2, height + 50, width, 100, {
      isStatic: true,
      render: {
        fillStyle: 'green',
      },
    }),

    Bodies.rectangle(-50, height / 2, 100, height, {
      isStatic: true,
    }),
    Bodies.rectangle(width + 50, height / 2, 100, height, {
      isStatic: true,
    }),
    Bodies.rectangle(width / 2, height / 2 - 20, vmin * 0.5, 0.001, {
      //mid box
      isStatic: true,
      render: {
        fillStyle: 'red',
      },
    }),
  ]);

  function createBall() {
    const ORIGINAL_SIZE = 120;
    const SIZE = Math.floor(Math.random() * 76) + 30;
    const ball = Bodies.circle(Math.round(Math.random() * width), -30, 29, {
      angle: Math.PI * (Math.random() * 2 - 1),
      friction: 0.001,
      frictionAir: 0.01,
      restitution: 0.8,

      render: {
        sprite: {
          texture: textures[Math.floor(Math.random() * textures.length)],
          xScale: SIZE / ORIGINAL_SIZE,
          yScale: SIZE / ORIGINAL_SIZE,
        },
      },
    });

    setTimeout(() => {
      World.remove(engine.world, ball);
    }, 6000);

    return ball;
  }

  Engine.run(engine);

  Render.run(render);
  const handleClick = () => {
    const ball2 = createBall();
    World.add(engine.world, [ball2]);
  };
  setInterval(handleClick, 200);
}

init();

$(window).resize(function () {
  init();
});
