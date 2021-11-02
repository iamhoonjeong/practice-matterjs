/* Matter.Events.on(mouseConstraint, 'mousedown', function (event) {
  World.add(
    engine.world,
    Bodies.circle(150, -100, size, {
      restitution: 0.8,
      render: {
        sprite: {
          texture: '/src/img/red.svg',
        },
      },
    }),
  );
  World.add(
    engine.world,
    Bodies.circle(150, -100, size, {
      restitution: 0.8,
      render: {
        sprite: {
          texture: '/src/img/gray.svg',
        },
      },
    }),
  );
  World.add(
    engine.world,
    Bodies.circle(150, -100, size, {
      restitution: 0.8,
      render: {
        sprite: {
          texture: '/src/img/green.svg',
        },
      },
    }),
  );
  World.add(
    engine.world,
    Bodies.circle(150, -100, size, {
      restitution: 0.8,
      render: {
        sprite: {
          texture: '/src/img/yellow.svg',
        },
      },
    }),
  );
  World.add(
    engine.world,
    Bodies.circle(150, -100, size, {
      restitution: 0.8,
      render: {
        sprite: {
          texture: '/src/img/red.svg',
        },
      },
    }),
  );
});
World.add(engine.world, mouseConstraint);
let mouse = Mouse.create(render.canvas);
let mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.2,
    render: {
      visible: false,
    },
  },
}); */

let Engine = Matter.Engine;
let Render = Matter.Render;
let World = Matter.World;
let Bodies = Matter.Bodies;
let Mouse = Matter.Mouse;
let MouseConstraint = Matter.MouseConstraint;

let engine = Engine.create();
engine.world.gravity.y = 0.2; // 중력 세기
World.clear(engine.world);
Engine.clear(engine);

let size = 26; // 공 사이즈
let width = document.body.clientWidth; // 캔버스 넓이
let height = 1200; // 캔버스 높이
let vmin = Math.min(width, height);
const textures = [
  '/src/img/red.svg',
  '/src/img/green.svg',
  '/src/img/yellow.svg',
  '/src/img/gray.svg',
];

// 부모 돔 선택 & 캔버스 옵션
let render = Render.create({
  element: document.querySelector('.scene'),
  engine: engine,
  options: {
    width: document.body.clientWidth * devicePixelRatio, // 캔버스 넓이
    height: height * devicePixelRatio, // 캔버스 높이
    wireframes: false, // 와이어프레임 비활성화
    background: '#007561', // 캔버스 백그라운드 컬러
  },
});
let ctx = render.canvas.getContext('2d'); // 캔버스
ctx.scale(devicePixelRatio, devicePixelRatio); // 캔버스 해상도 설정
let canvas = document.querySelector('canvas'); // 캔버스 터치 이벤트 비활성화 css
canvas.classList.add('canvas'); // css에 작성되어 있다.

// 벽 설정
let ractangleSize = 50; // 벽 넓이
let ractangleHeight = height; // 벽 높이
let ractanglePlusHeight = 2000; // 벽 추가 높이(넘침 방지)

World.add(engine.world, [
  // 오른쪽 벽
  Bodies.rectangle(
    width + 25,
    height / 2,
    ractangleSize,
    ractangleHeight + ractanglePlusHeight,
    {
      isStatic: true,
      render: {
        fillStyle: 'transparent',
      },
    },
  ),
  // 바닥 벽
  Bodies.rectangle(width / 2, ractangleHeight + 25, width, ractangleSize, {
    isStatic: true,
    render: {
      fillStyle: 'transparent',
    },
  }),
  // 왼쪽 벽
  Bodies.rectangle(
    -25,
    ractangleHeight / 2,
    ractangleSize,
    ractangleHeight + ractanglePlusHeight,
    {
      isStatic: true,
      render: {
        fillStyle: 'transparent',
      },
    },
  ),
]);

// 공 생성 함수
let animate;
let balls = 0;
function dropBalls() {
  animate = requestAnimationFrame(dropBalls);
  if (animate % 5 === 0 && balls < 150) {
    balls += 1;
    World.add(
      engine.world,
      Bodies.circle(width / 2, -300, size, {
        angle: Math.PI * (Math.random() * 2 - 1),
        friction: 1000,
        frictionAir: 0.001, // 떨어는 속도(공기 저항)
        restitution: 0.01,
        render: {
          sprite: {
            texture: textures[Math.floor(Math.random() * textures.length)],
            xScale: size * 2 - 2,
            yScale: size * 2 - 2,
          },
        },
      }),
    );
  } else if (balls >= 150) {
    cancelAnimationFrame(animate);
  }
}
dropBalls();

Engine.run(engine);
Render.run(render);

let div = document.querySelector('.ratio');
div.innerHTML = `${devicePixelRatio}`;
