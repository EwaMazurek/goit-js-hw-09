function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timer = null;

startBtn.addEventListener('click', e => {
  document.querySelector('body').style.backgroundColor = getRandomHexColor();
  timer = setInterval(() => {
    document.querySelector('body').style.backgroundColor = getRandomHexColor();
  }, 1000);

  e.currentTarget.disabled = true;
  stopBtn.disabled = false;
});

stopBtn.addEventListener('click', e => {
  clearInterval(timer);
  startBtn.disabled = false;
  e.currentTarget.disabled = true;
});
