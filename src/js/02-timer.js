import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const startBtn = document.querySelector('[data-start]');
const dateTimePicker = document.querySelector('#datetime-picker');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');
let endDate;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date().getTime();
    const remainingTime = endDate - currentDate;
    if (selectedDates <= currentDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      endDate = selectedDate;
    }
    console.log(selectedDates[0]);
  },
};
flatpickr(dateTimePicker, options);
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
startBtn.addEventListener('click', () => {
  startBtn.disabled = true;

  const countdownInterval = setInterval(() => {
    const currentDate = new Date().getTime();
    const remainingTime = endDate - currentDate;
    if (remainingTime <= 0) {
      clearInterval(countdownInterval);
      alert('Countdown finished!');
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(remainingTime);
    timerDays.textContent = addLeadingZero(days);
    timerHours.textContent = addLeadingZero(hours);
    timerMinutes.textContent = addLeadingZero(minutes);
    timerSeconds.textContent = addLeadingZero(seconds);
  }, 1000);
  startBtn.disabled = true;
});
function addLeadingZero(value) {
  return value < 10 ? '0' + value : value;
}
