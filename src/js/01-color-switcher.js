const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let timer = null;
startBtn.addEventListener('click', () => {
  timer = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.disabled = true;
});
stopBtn.addEventListener('click', function () {
  clearInterval(timer);
  startBtn.disabled = false;
});
