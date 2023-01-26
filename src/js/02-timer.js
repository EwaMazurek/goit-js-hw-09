import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const timerValue = document.querySelectorAll('.value');
const startBtn = document.querySelector('[data-start]');
const inputElem = document.querySelector('#datetime-picker');
startBtn.disabled = true;
const style = document.createElement('style');
style.innerHTML = `
      #datetime-picker {
        height: 30px;
      }
      .timer {
        display: flex;
        gap: 10px;
        margin-top: 20px;
      }
      .field {
        display: flex;
        flex-direction: column;
        jusitfy-content: center;
        align-items: center;
      }
      .value {
        font-size: 30px;
      }
      .label {
        text-transform: uppercase;
      }
      button {
        width: 75px;
        height: 30px;
      }
    `;
document.head.appendChild(style);

let selectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      selectedDate = selectedDates[0];
      startBtn.disabled = false;
    }
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', () => {
  const today = new Date();
  let countDown = selectedDate - today;
  startBtn.disabled = true;
  inputElem.disabled = true;
  let convertedTime = convertMs(countDown);

  timerValue[0].textContent = convertedTime.days;
  timerValue[1].textContent = convertedTime.hours;
  timerValue[2].textContent = convertedTime.minutes;
  timerValue[3].textContent = convertedTime.seconds;
  countDown -= 1000;

  const countDownTimer = setInterval(() => {
    convertedTime = convertMs(countDown);
    timerValue[0].textContent = convertedTime.days;
    timerValue[1].textContent = convertedTime.hours;
    timerValue[2].textContent = convertedTime.minutes;
    timerValue[3].textContent = convertedTime.seconds;
    countDown -= 1000;
    if (countDown <= 0) {
      clearInterval(countDownTimer);
      Notiflix.Notify.success('Hurray!');
    }
  }, 1000);
});
