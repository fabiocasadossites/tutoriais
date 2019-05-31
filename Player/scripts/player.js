var player, intervalTimer, drag;

/* CONTROLS */

var videoElement, playButton, fullscreen, timer, videoLoaded, videoProgress, barProgress, videoPreloader, slider, audioButton, icoAudio;


function selectPlayer(elem){
    // VERIFICA O PLAYER EM FOCO
    if( player != elem ){ 
        player = elem;
    }

    // INSTANCIANDO OBJETOS
    videoElement   = player.querySelector('video'); // OBJETO VIDEO DO PLAYER
    timer          = player.querySelector('.time'); // TEMPO E ANDAMENTO DO VIDEO
    fullscreen     = player.querySelector('.full'); // BOTÃO FULLSCREEN
    playButton     = player.querySelector('.play'); // BOTÃO PLAY E PAUSE
    barProgress    = player.querySelector('.progress-bar'); // BARRA DE CONTROLE SEEK
    videoLoaded    = barProgress.querySelector('.video-loaded'); // BARRA DE CARREGAMENTO
    videoProgress  = barProgress.querySelector('.video-progress'); // PROGRESSO DO VÍDEO
    videoPreloader = player.querySelector('.loader'); // PROGRESSO DO VÍDEO
    slider         = player.querySelector('.slider'); 
    sliderVol      = slider.querySelector('.bar');
    audioButton    = player.querySelector('.audio');


    // AÇÕES DE MOUSE
    playButton.addEventListener('click', playVideo);
    fullscreen.addEventListener('click', expandPlayer);
    barProgress.addEventListener('click', seeker);
    slider.addEventListener('mousedown', startDrag);
    slider.addEventListener('mousemove', showVolume);
    sliderVol.addEventListener('mousemove', showVolume);
    slider.addEventListener('mouseup', startDrag);
    sliderVol.addEventListener('mouseup', startDrag);
    sliderVol.querySelector('span').addEventListener('mouseup', startDrag);
    document.addEventListener('mouseup', startDrag);


    audioButton.addEventListener('click', mute);

    videoElement.addEventListener('ended', resetVideo);
    videoElement.addEventListener('waiting', loaderVideo);
    videoElement.addEventListener('playing', loaderVideo);
    
    updateTimer();
}


function startDrag(event){

    if(event.type == "mousedown"){

        drag = true;
    }else{

        drag = false;
    }
}


function showVolume(event){
    if(drag){
        var w = slider.clientWidth;
        var x = (event.clientX) - slider.offsetLeft;

        var pctVol = x/w;

        if(pctVol >1 ){
            sliderVol.style.width = 100+"%";
            videoElement.volume = 1;

        }else if( pctVol < 0 ){
            sliderVol.style.width = 0+"%";
            videoElement.volume = 0;

        }else{
            sliderVol.style.width = (x/w) * 100+"%";
            videoElement.volume = pctVol;
        }


        if(pctVol<=0){
            audioButton.querySelector('span').className = 'ion-volume-mute';
        }else if(pctVol>0 && pctVol<=0.6){
            audioButton.querySelector('span').className = 'ion-volume-low';
        }else{
            audioButton.querySelector('span').className = 'ion-volume-medium';
        }
    }
}


function seeker(event){
    pctBar = (event.clientX  / barProgress.clientWidth) *100;
    videoElement.currentTime = (videoElement.duration * pctBar) /100;
}
function loaderVideo(event){

    if(event.type == 'waiting'){
        videoPreloader.style.display = "block";
    }else{
        videoPreloader.style.display = "none";
    }

}


function mute(){

    if(!videoElement.muted){
        videoElement.muted = true;
        videoElement.volume = 0;
        sliderVol.style.width = 0+"%";
        audioButton.querySelector('span').className = 'ion-volume-mute';

    }else{
        videoElement.muted = false;
        audioButton.querySelector('span').className = 'ion-volume-medium';
        videoElement.volume = 0.9;
        sliderVol.style.width = 90+"%";

    }
}

function updateTimer(event){

    bufferedEnd = videoElement.buffered.end(videoElement.buffered.length - 1);

    videoLoaded.style.width = String((bufferedEnd / videoElement.duration) * 100)+'%';


    pctSeek = (videoElement.currentTime / videoElement.duration) * 100;

    videoProgress.style.width = String(pctSeek)+'%';


    //Duração total do video
    hour = Math.floor(videoElement.duration / 3600);
    min = Math.floor(videoElement.duration / 60);
    seg = Math.floor(((videoElement.duration / 60) % 1) * 60);

    //CurrentTime
    currentHour = Math.floor(videoElement.currentTime / 3600);
    currentMin = Math.floor(videoElement.currentTime / 60);
    currentSeg = Math.floor(((videoElement.currentTime / 60) % 1) * 60);

    timer.querySelector('.time-video').innerHTML = convertTimer(currentHour, currentMin, currentSeg) + ' | ' + convertTimer(hour, min, seg);
}
function resetVideo(){

    playButton.querySelector('span').className = "ion-play"; // MUDA O ICONE DO BOTÃO PAUSE PARA PAUSE
    videoElement.currentTime = 0;
    clearInterval(intervalTimer);
}
function playVideo(){

    // VERIFICA SE O VIDEO FOI INICIADO 
    if(videoElement.played.length != 0){

        // VERIFICA SE O VIDEO FOI INICIADO E ESTÁ PAUSADO
        if(videoElement.played.start(0)==0 && !videoElement.paused){

            clearInterval(intervalTimer);

            videoElement.pause(); // PAUSA O VÍDEO

            playButton.querySelector('span').className = "ion-play"; // MUDA O ICONE DO BOTÃO PAUSE PARA PAUSE

        }else{
            intervalTimer = setInterval(updateTimer, 100); // ATUALIZA O METODO UPDATE TIMER
            videoElement.play();
            playButton.querySelector('span').className = "ion-pause"; // MUDA O ICONE DO BOTÃO PLAY PARA PAUSE

        }

    }else{
        intervalTimer = setInterval(updateTimer, 100); // ATUALIZA O METODO UPDATE TIMER
        videoElement.play(); // INICIA O VÍDEO
        playButton.querySelector('span').className = "ion-pause"; // MUDA O ICONE DO BOTÃO PLAY PARA PAUSE
    }

}




//METODO QUE CONVERTE A DURAÇÃO DO VIDEO EM HH:MM:SS 
function convertTimer(horas, minutos, segundos){

    if(horas<10 && horas>0){
        horas = '0' + String(horas) +":";
    }else{ horas = ''; }

    if(minutos<10){
        minutos = '0' + String(minutos);
    }else if(minutos > 59){
        minutos = minutos - (Math.floor(minutos / 60) * 60);
    }

    if(segundos<10){
        segundos = '0' + String(segundos);
    }

    return String(horas) + String(minutos) + ':' + String(segundos);
}



/**
 * FAZ E DESFAZ A AÇÃO DE EXPANDIR EM TELA CHEIA FULLSCREEN
 */
function expandPlayer(){

    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {

        if (player.requestFullscreen) {
            player.requestFullscreen();
        } else if (player.msRequestFullscreen) {
            player.msRequestFullscreen();
        } else if (player.mozRequestFullScreen) {
            player.mozRequestFullScreen();
        } else if (player.webkitRequestFullscreen) {
            player.webkitRequestFullscreen();
        }

        fullscreen.querySelector('span').className = "ion-arrow-shrink";

    } else {

        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }

        fullscreen.querySelector('span').className = "ion-arrow-expand";
    }

}

