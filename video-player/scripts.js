//seleect elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filler');
const toggle = player.querySelector('.toggle');
const skipBtn = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


// build functionality
//TIME
console.log('display current time', video.currentTime);
console.log('paused?', video.paused);
console.log('playing? ', video.play);
console.log('defaultPlaybackRate?', video.defaultPlaybackRate);
console.log('current volume', video.volume)


function playPause(){
  if(video.paused || video.ended) video.play();
  else video.pause();
}

function updateButton(){
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip(e){
  // console.log(this.dataset)
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
  video[this.name] = this.value;
}
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

//hook event listeners
video.addEventListener('click', playPause);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeUpdate', handleProgress);

toggle.addEventListener('click', playPause)

skipBtn.forEach(btn => btn.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', scrub);
progress.addEventListener('mousedown', (e) => mousedown && scrub(e));
progress.addEventListener('mouseup', () => mousedown = false);

