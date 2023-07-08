var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var source;
var buffers = {};
var isPlaying = false;
var activeLoop = null;
var playbackRates = {};

function loadAudio(url, loopNumber) {
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";
  request.onload = function () {
    audioContext.decodeAudioData(request.response, function (decodedBuffer) {
      buffers[loopNumber] = decodedBuffer;
    });
  };
  request.send();
}

function playBuffer(loopNumber) {
  var buffer = buffers[loopNumber];
  if (buffer) {
    if (source) {
      source.stop();
    }
    source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    source.connect(audioContext.destination);
    source.playbackRate.value = playbackRates[loopNumber] || 1; // Set the initial playback rate
    source.start(0);
    isPlaying = true;
    activeLoop = loopNumber;
  }
}

function stopBuffer() {
  if (source) {
    source.stop();
    isPlaying = false;
    activeLoop = null;
  }
}

function togglePlay(loopNumber) {
  var buttonElement = document.getElementById("play-button" + loopNumber);
  var activeButtonElement = document.getElementById("play-button" + activeLoop);

  if (loopNumber === activeLoop) {
    stopBuffer();
    buttonElement.innerText = "Play";
    buttonElement.style.opacity = "1";
  } else {
    if (activeButtonElement) {
      activeButtonElement.innerText = "Play";
      activeButtonElement.style.opacity = "1";
    }
    playBuffer(loopNumber);
    buttonElement.innerText = "Stop";
    buttonElement.style.opacity = "0.5";
  }
}

function changePlaybackRate(loopNumber, rate) {
  playbackRates[loopNumber] = rate;
  if (activeLoop === loopNumber) {
    source.playbackRate.value = rate;
  }
}

var globalPitchControl = document.getElementById("global-pitch-control");

function changeGlobalPitch(pitchValue) {
  for (var loopNumber = 1; loopNumber <= 16; loopNumber++) {
    changePlaybackRate(loopNumber, pitchValue);
  }
}

function resetGlobalPitch() {
  globalPitchControl.value = 1; // Set the value back to default (1 in this case)
  changeGlobalPitch(1); // Call changeGlobalPitch() with default value to reset the pitch sound
}

// Load the audio files on page load.
loadAudio("audio/oxu_Les Notres (Bootleg by Zoum).mp3", 1);
loadAudio("audio/eti_Dont Matter (Bootleg by Zoum).mp3", 2);
loadAudio("audio/txl_Hymn (Bootleg by Zoum).mp3", 3);
loadAudio("audio/bfo_Opium (Bootleg by Zoum).mp3", 4);
loadAudio(
  "https://f005.backblazeb2.com/file/benbitbucket/audio/beforeDawn2.mp3",
  5
);
loadAudio("audio/loopTrap1.mp3", 6);
loadAudio("audio/daysOfWonder2.mp3", 7);
loadAudio("audio/drumsOnly.mp3", 8);
loadAudio("audio/frontinFlip2.mp3", 9);
loadAudio("audio/landsOfTheMist2.mp3", 10);
loadAudio("audio/qwerty2.mp3", 11);
loadAudio("audio/loopTrap1.mp3", 12);
loadAudio("audio/loopTrap1.mp3", 13);
loadAudio("audio/loopTrap1.mp3", 14);
loadAudio("audio/loopTrap1.mp3", 15);
loadAudio("audio/loopTrap1.mp3", 16);

function switchTab(tabIndex) {
  // Hide all tabs
  var tabs = document.querySelectorAll(".tab");
  tabs.forEach(function (tab) {
    tab.style.display = "none";
  });

  // Show the selected tab
  var selectedTab = document.querySelectorAll(".tab")[tabIndex];
  selectedTab.style.display = "block";

  // Check if it's a mobile resolution
  if (window.innerWidth <= 768) {
    // Scroll to the top of the selected tab
    selectedTab.scrollIntoView();
  }
}
