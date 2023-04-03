console.log("Welcome to the music player")
// initialize the variables
let songIndex =0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let bottom_song_name = document.getElementById('bottom_song_name');
let songItem=Array.from(document.getElementsByClassName('songItem'));

let songItemPlay=Array.from(document.getElementsByClassName('songItemPlay'));

let songs = [
    { songName: "song1", filePath: "songs/1.mp3", coverPath: "1.jpeg" },
    { songName: "song2", filePath: "songs/2.mp3", coverPath: "2.jpeg" },
    { songName: "song3", filePath: "songs/3.mp3", coverPath: "3.jpeg" },
    { songName: "song4", filePath: "songs/4.mp3", coverPath: "4.jpeg" },
    { songName: "song5", filePath: "songs/5.mp3", coverPath: "5.jpeg" },
]


songItem.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByTagName("span")[0].innerText=songs[i].songName;
})
// handle the play/pause click
masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-paly-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        bottom_song_name.innerText=songs[0].songName;
        bottom_song_name.style.opacity=1

    }
    else {
        audioElement.pause(); 
        masterPlay.classList.add('fa-play-circle');
        masterPlay.classList.remove('fa-pause-circle');
        gif.style.opacity = 0;
        bottom_song_name.style.opacity=0
        
    }
})


// listen to events on the seek bar
audioElement.addEventListener('timeupdate', () => {

    // updating the seek bar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    // setting the progress bar
    myProgressBar.value = progress
})
myProgressBar.addEventListener("change", () => {
      audioElement.currentTime=(myProgressBar.value*audioElement.duration)/100
})

const makeAllPlay=()=>{
    songItemPlay.forEach((element)=>{
        element.classList.add('fa-play-circle')
        element.classList.remove('fa-pause-circle')
    })
}
songItemPlay.forEach((element,i)=>{
    element.addEventListener('click',(e)=>{
        // e only give the event triggered
        console.log(e)  
        // .target give us the event+the element that is triggered
        console.log(e.target)

        songIndex=i;
        console.log("this is the song index"+songIndex)
        makeAllPlay();//this functions makes the all songplayitems buttom pause
        e.target.classList.remove('fa-play-circle')
        e.target.classList.add('fa-pause-circle')
        audioElement.currentTime=0
        audioElement.src=songs[songIndex].filePath
        audioElement.play();
        bottom_song_name.innerText=songs[songIndex].songName;
        gif.style.opacity=1;
        bottom_song_name.style.opacity=1;
    })
})

document.getElementById('previous').addEventListener('click',()=>{
    console.log("next presses current index: " +songIndex)
    if(songIndex>0){
        songIndex-=1;
    }
    else{
        songIndex=4;
    }
    console.log("updated index : "+songIndex)
    makeAllPlay();//this functions makes the all songplayitems buttom pause
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')
    audioElement.currentTime=0
    audioElement.src=songs[songIndex].filePath
    bottom_song_name.innerText=songs[songIndex].songName;
    audioElement.play();
})

document.getElementById('next').addEventListener('click',()=>{
    console.log("next presses current index: " +songIndex)

    if(songIndex>=4){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
     console.log("updated index : "+songIndex)
    makeAllPlay();//this functions makes the all songplayitems buttom pause
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')
    audioElement.currentTime=0
    audioElement.src=songs[songIndex].filePath
    bottom_song_name.innerText=songs[songIndex].songName;
    audioElement.play();
})