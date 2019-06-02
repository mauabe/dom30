let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const timerEndTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);
  // console.log({now, then});

  countdown = setInterval(function(){
    const secondsLeft = Math.round((then -Date.now()) / 1000);
    if(secondsLeft < 0){
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
    // console.log(secondsLeft);
  }, 1000);
};

function displayTimeLeft(seconds){
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const hours = Math.floor(minutes / 60);
  const remainderMinutes = minutes % 60;
  const display = `${hours}:${remainderMinutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  // console.log({hours, remainderMinutes, remainderSeconds});
  timerDisplay.textContent = display;
  document.title = display;
};

function displayEndTime(timestamp){
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  timerEndTime.textContent = `Be back at ${hour > 12 ? hour - 12  : hour}:${minutes < 10 ? '0' : ''}${minutes}`;
};

function startTimer(){
  // console.log(this);
  const seconds = parseInt(this.dataset.time)
  timer(`${seconds}`);
};

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e){
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});
