// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const startBtn = document.querySelector("button");
const daysSpan = document.querySelector("[data-days]");
const hoursSpan = document.querySelector("[data-hours]");
const minutesSpan = document.querySelector("[data-minutes]");
const secondsSpan = document.querySelector("[data-seconds]");
const input = document.querySelector("#datetime-picker");

startBtn.disabled = true;


flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0]<= Date.now() ) {
            iziToast.show({
                title: 'Hey',
                message: "Please choose a date in the future"
            });
            startBtn.disabled = true;
            startBtn.classList.add("disable");
        } else {
            startBtn.classList.remove("disable");
            startBtn.classList.add("button-active");
            startBtn.disabled = false;
            
        }

    }
}); 

let indexInterval; 

startBtn.addEventListener("click", onBtnHandler);
function onBtnHandler() {
    
    input.disabled = true;
    startBtn.disabled = true;
    startBtn.classList.remove("button-active");

    indexInterval = setInterval(() => {
        const initTime = Date.now();
        const userSelectedDate = flatpickr.parseDate(input.value, "Y-m-d H:i");

         const diff = userSelectedDate - initTime;
         const obj = convertMs(diff);
         const str = addLeadingZero(obj);
         if (diff <= 0) {
             clearInterval(indexInterval);
             input.disabled = false;
             startBtn.disabled = true;
            } 
         daysSpan.innerHTML = str.daysStr;
         hoursSpan.innerHTML = str.hoursStr;
         minutesSpan.innerHTML = str.minutesStr;
         secondsSpan.innerHTML = str.secondsStr;

     }, 1000);
}

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

function addLeadingZero(value) {
    return {
        daysStr: String(value.days).padStart(2, "0"),
        hoursStr: String(value.hours).padStart(2, "0"),
        minutesStr: String(value.minutes).padStart(2, "0"),
        secondsStr: String(value.seconds).padStart(2, "0"),
    };
}

