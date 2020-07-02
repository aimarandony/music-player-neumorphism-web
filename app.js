const start = document.getElementById("start");
const end = document.getElementById("end");
const songName = document.getElementById("songname");

const seekbar = document.getElementById("seekbar");
const audioSource = document.getElementById("audiosource");
const audio = document.getElementById("audio");

const playPause = document.getElementById("play");
const previus = document.getElementById("previus");
const next = document.getElementById("next");

let songNumberNow = 0;
let songs = [
  {
    name: 'Welcome to the Wonderful World Of',
    audiosrc: 'assets/sound/welcome_to_the_wonderful _world_of.mp3'
  },
  {
    name: 'Angel in Your Eyes',
    audiosrc: 'assets/sound/angel_in_your_eyes.mp3'
  },
  {
    name: 'Genius',
    audiosrc: 'assets/sound/genius.mp3'
  },
  {
    name: 'Audio',
    audiosrc: 'assets/sound/audio.mp3'
  },
  {
    name: 'Thunderclouds',
    audiosrc: 'assets/sound/thunderclouds.mp3'
  },
  {
    name: 'Mountains',
    audiosrc: 'assets/sound/mountains.mp3'
  },
  {
    name: 'No New Friends',
    audiosrc: 'assets/sound/now_new_friends.mp3'
  },
  {
    name: 'Heaven Can Wait',
    audiosrc: 'assets/sound/heaven_can_wait.mp3'
  },
  {
    name: "It's Time",
    audiosrc: 'assets/sound/its_time.mp3'
  },
  {
    name: 'Genius (Lil Wayne Remix)',
    audiosrc: 'assets/sound/genius_lil_wayne_remix.mp3'
  },
]

document.addEventListener('DOMContentLoaded', function() {
  songName.innerHTML = songs[songNumberNow].name;
  audioSource.src = songs[songNumberNow].audiosrc;
  audio.load();

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
  
  previus.addEventListener('click', ()=>{
    next.classList.remove('btn_disabled');
    if(songNumberNow != 0) songNumberNow--;
    if(songNumberNow == 0) previus.classList.add('btn_disabled');

    songName.innerHTML = songs[songNumberNow].name;
    audioSource.src = songs[songNumberNow].audiosrc;
    audio.load(); audio.play();

    playPause.querySelector(".pause-btn").classList.remove("hide");
    // playPause.querySelector(".pause-btn").classList.add("hide");
    playPause.querySelector(".play-btn").classList.add("hide");
  })

  next.addEventListener('click', ()=>{    
    previus.classList.remove('btn_disabled');
    if(songNumberNow != songs.length - 1) songNumberNow++;
    if(songNumberNow == songs.length - 1 ) next.classList.add('btn_disabled');
    
    songName.innerHTML = songs[songNumberNow].name;
    audioSource.src = songs[songNumberNow].audiosrc;
    audio.load(); audio.play();

    playPause.querySelector(".pause-btn").classList.remove("hide");
    // playPause.querySelector(".pause-btn").classList.add("hide");
    playPause.querySelector(".play-btn").classList.add("hide");
  })
});