const songs = [
    {
      name: "Dil Laga Liya Maine",
      artist: "Udit Narayan, Alka Yagnik",
      src: "./songs/Dil laga liya tumse.mp3",
      cover: "./assets/dil_laga_liya_hai_maine.jpg",
    },
    {
      name: "Dekhne Waaloan Ne",
      artist: "Udit Narayan, Alka Yagnik",
      src: "./songs/Dekhne Walon Ne.mp3",
      cover: "./assets/dekhne_waaloan_ne.jpg",
    },
    {
      name: "Jhuki Jhuki Nazar Teri",
      artist: "Udit Narayan, Alka Yagnik",
      src: "./songs/Jhuki Jhuki Nazar Teri Kamaal.mp3",
      cover: "./assets/jhuki_jhuki_nazar_teri1.jpg",
    },
    {
        name: "Ladki Badi Anjani Hai",
        artist: "Kumar Sanu, Alka Yagnik",
        src: "./songs/Ladki Badi Anjani Hai.mp3",
        cover: "./assets/ladki_badi_anjaani_hai.jpg",
      },
      {
        name: "Jila Jaunpur Hau Ka Re",
        artist: "Ritik Mishra, Khushi Kakkar",
        src: "./songs/Jila Jaunpur Hau Ka Re.mp3",
        cover: "./assets/jila_jaunpur.jpg",
      }
  ];
  
  let currentSongIndex = 0;
  let isPlaying = false;
  
  // DOM Elements
  const playButton = document.querySelector(".player-control-icon:nth-child(3)");
  const prevButton = document.querySelector(".player-control-icon:nth-child(2)");
  const nextButton = document.querySelector(".player-control-icon:nth-child(4)");
  //const volumeSlider = document.getElementById("volume");
  const audio = new Audio();
  const albumPic = document.querySelector(".album-pic");
  const albumName = document.querySelector(".abt-1");
  const albumArtist = document.querySelector(".abt-2");
  const progressBar = document.querySelector(".progress-bar");
  const currTime = document.querySelector(".curr-time");
  const totTime = document.querySelector(".tot-time");
  
  // Load Song
  function loadSong(index) {
    const song = songs[index];
    audio.src = song.src;
    albumPic.src = song.cover;
    albumName.textContent = song.name;
    albumArtist.textContent = song.artist;
  
    audio.addEventListener("loadedmetadata", () => {
      totTime.textContent = formatTime(audio.duration);
      progressBar.max = audio.duration;
    });
  }
  
  // Play or Pause Song
  function togglePlayPause() {
    if (isPlaying) {
      audio.pause();
      playButton.src = "./assets/player_icon3.png"; // Change to play icon
    } else {
      audio.play();
      playButton.src = "./assets/video-pause-button-removebg-preview-fotor-20250128212449.png"; // Change to pause icon
    }
    isPlaying = !isPlaying;
  }
  
  // Next Song
  function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    isPlaying = true;
    playButton.src = "./assets/video-pause-button-removebg-preview-fotor-20250128212449.png";
  }
  
  // Previous Song
  function prevSong() {
    currentSongIndex =
      (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    isPlaying = true;
    playButton.src = "./assets/video-pause-button-removebg-preview-fotor-20250128212449.png";
  }

  // // Volume Scroll Functionality
  // volumeSlider.addEventListener("input", () => {
  //   audio.volume = volumeSlider.value / 100; // Assuming the slider value ranges from 0 to 100
  // });
  
  // Update Progress Bar
  audio.addEventListener("timeupdate", () => {
    progressBar.value = audio.currentTime;
    currTime.textContent = formatTime(audio.currentTime);
  });
  
  // Seek Song
  progressBar.addEventListener("input", () => {
    audio.currentTime = progressBar.value;
  });
  
  // Format Time
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  }
  
  // Event Listeners
  playButton.addEventListener("click", togglePlayPause);
  nextButton.addEventListener("click", nextSong);
  prevButton.addEventListener("click", prevSong);
  
  // Initialize Player
  loadSong(currentSongIndex);
  
