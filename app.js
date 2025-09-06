let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnail = document.querySelectorAll('.thumbnail .item');

// config param
let countItem = items.length;
let itemActive = 0;

// next event click
next.onclick = function () {
    itemActive += 1;
    if (itemActive >= countItem) {
        itemActive = 0;
    }
    showSlider();
}

// prev event click
prev.onclick = function () {
    itemActive -= 1;
    if (itemActive < 0) {
        itemActive = countItem - 1
    }
    showSlider()
}

// auto rum slider
// let refreshInterval = setInterval(() => {
//     next.click();
// }, 20000)

function showSlider() {
    // remove item active old
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveold = document.querySelector('.thumbnail .item.active');

    itemActiveOld.classList.remove('active');
    thumbnailActiveold.classList.remove('active')

    // active new item
    items[itemActive].classList.add('active');
    thumbnail[itemActive].classList.add('active');

    //Centers the active thumbnail in the container
    thumbnail[itemActive].scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
    });
}

// click thumbnail
thumbnail.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    })
})

// Music play
let currentMusic = 0;

const music = document.getElementById('audio');

const seekBar = document.querySelector('.seek-bar');
const songName = document.querySelector('.music-name');
const artistName = document.querySelector('.artist-name');
const disk = document.querySelector('.disk');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const playBtn = document.querySelector('.play-btn');
const forwardBtn = document.querySelector('.forward-btn');
const backwardBtn = document.querySelector('.backward-btn');

playBtn.addEventListener('click', () => {
    if (playBtn.className.includes('pause')) {
        music.play()
    } else {
        music.pause()
    }
    playBtn.classList.toggle('pause')
    disk.classList.toggle('play')
})

// setup music

const setMusic = (i) => {
    seekBar.value = 0;
    let song = songs[i];
    currentMusic = i
    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    disk.style.backgranundImage = `url('${song.cover}')`;

    currentTime.innerHTML = '00:00'
    setTimeout(() => {
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    }, 300)
}

setMusic(0)

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10) {
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if (sec < 10) {
        sec = `0${sec}`;
    }
    return `${min} : ${sec}`;
}

// seek bar

setInterval(() => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime)
    if (Math.floor(music.currentTime) == Math.floor(seekBar.max)) {
        forwardBtn.click();
    }
}, 500)

seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
})

// forward and backward button

forwardBtn.addEventListener('click', () => {
    if (currentMusic >= songs.length - 1) {
        currentMusic = 0
    } else {
        currentMusic++;
    }
    setMusic(currentMusic)
    playMusic();
})

backwardBtn.addEventListener('click', () => {
    if (currentMusic <= 0) {
        currentMusic = songs.length - 1
    } else {
        currentMusic--;
    }
    setMusic(currentMusic)
    playMusic();
})

const playMusic = () => {
    music.play();
    playBtn.classList.remove(pause);
    disk.classList.add('play')
}