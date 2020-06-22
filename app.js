const start = document.getElementById("start");
const end = document.getElementById("end");

const seekbar = document.getElementById("seekbar");
const audio = document.getElementById("audio");
const playPause = document.getElementById("play");

function parseTime(time) {
  var timeParsed = moment().startOf("day").seconds(time).format("mm:ss");
  return timeParsed;
}

audio.onloadedmetadata = () => {
  seekbar.max = audio.duration;
  end.innerHTML = parseTime(audio.duration);
};
seekbar.onchange = () => {
  audio.currentTime = seekbar.value;
  start.innerHTML = parseTime(audio.currentTime);
};

audio.ontimeupdate = () => {
  seekbar.value = audio.currentTime;
  start.innerHTML = parseTime(audio.currentTime);

  if (audio.ended) {
    playPause.querySelector(".pause-btn").classList.toggle("hide");
    playPause.querySelector(".play-btn").classList.toggle("hide");
    seekbar.value = 0;
    start.innerHTML = parseTime(0);
  }
};

playPause.addEventListener("click", () => {
  if (audio.paused || audio.ended) {
    playPause.querySelector(".pause-btn").classList.toggle("hide");
    playPause.querySelector(".play-btn").classList.toggle("hide");
    audio.play();
  } else {
    audio.pause();
    playPause.querySelector(".pause-btn").classList.toggle("hide");
    playPause.querySelector(".play-btn").classList.toggle("hide");
  }
});
