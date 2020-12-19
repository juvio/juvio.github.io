const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
const texto = document.querySelector(".texto");

let isJumping = false;
let position = 0;
let count = 0;

const handleKeyUp = (event, url) => {
  if (event.keyCode === 32) {
    if (!isJumping) jump();
  }
  if (event.keyCode === 74) {
    changeBackground();
  }
};

const changeBackground = () => {
  const min = Math.ceil(1);
  const max = Math.floor(6);
  let random = Math.floor(Math.random() * (max - min)) + min;

  let back = (background.style.backgroundImage = "url(back5.jpg)");

  switch (random) {
    case 1:
      back = background.style.backgroundImage = "url(back1.jpg)";
      break;

    case 2:
      back = background.style.backgroundImage = "url(back2.jpg)";
      break;

    case 3:
        back = background.style.backgroundImage = "url(back3.jpg)";
        break;

    case 4:
        back = background.style.backgroundImage = "url(back4.jpg)";
        break;

    case 5:
        back = background.style.backgroundImage = "url(back5.jpg)";
        break;

    default:
      back = dino.style.backgroundImage = "url(back5.jpg)";
  }

  return back;
};

const jump = () => {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          isJumping = false;
          clearInterval(downInterval);
        } else {
          position -= 20;
          dino.style.bottom = position + "px";
        }
      }, 20);
    } else {
      position += 20;
      dino.style.bottom = position + "px";
    }
  }, 20);
};

const createCactus = () => {
  const cactus = document.createElement("div");
  let randomTime = Math.random() * 4000;
  let cactusPosition = 1000;

  cactus.classList.add("cactus");
  cactus.style.left = 1000 + "px";

  let leftInterval = setInterval(() => {
    cactusPosition -= 10;
    cactus.style.left = cactusPosition + "px";
    background.appendChild(cactus);

    if (cactusPosition < -60) {
      clearInterval(leftInterval);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 40 && position < 60) {
      //cactus dentro da tela, cactus na posicao do dinossauro(canto esquerdo), pulo do dinossauro menor do q 60
      //gameover
      clearInterval(leftInterval);
      document.body.innerHTML =
        '<h1 class="gameover"> Fim de Jogo </h1> <br> <a href="index.html" class="again"> JOGAR NOVAMENTE </a>';
    } else {
      cactusPosition -= 8;
      cactus.style.left = cactusPosition + "px";
    }
  }, 30);

  setTimeout(createCactus, randomTime);
};

createCactus();

document.addEventListener("keydown", handleKeyUp);
