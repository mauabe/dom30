let countdown;

function timer(seconds){
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
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
  const remainderMinutes = seconds % 60;
  const hours = Math.floor(minutes / 60);
  const remainderHours = minutes % 60;

  console.log({hours, remainderHours, remainderMinutes});
};