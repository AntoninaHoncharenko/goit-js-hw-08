import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(data) {
  localStorage.setItem(STORAGE_KEY, data.seconds);
}

function setTime() {
  const currentTime = localStorage.getItem(STORAGE_KEY);
  if (!currentTime) {
    return;
  }
  player.setCurrentTime(currentTime);
}

setTime();
