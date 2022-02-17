
var canciones;
strCanciones = '[{"imgSrc":"media/images/1.jpg","songName":"Cantina Rag", "audioSrc":"media/songs/Jackson F. Smith - Cantina Rag.mp3", "artistName":"Jackson F.Smith"},{"imgSrc":"media/images/2.jpg","songName":"BuckBreak", "audioSrc":"media/songs/Ken Hamm - Buckbreak.mp3", "artistName":"Ken Hamm"},{"imgSrc":"media/images/3.jpg","songName":"Little Grass Shack", "audioSrc":"media/songs/Voodoo Suite - Little Grass Shack.mp3", "artistName":"Voodoo Suite"}]';

canciones = JSON.parse(strCanciones);
var videos;
strVideos = '[{"imgSrc":"media/images/Ink.png","videoName":"Ink", "videoSrc":"media/videos/Ink - 67358.mp4", "artistName":"Pixabay","hasSubtitles":"no"},{"imgSrc":"media/images/Road.png","videoName":"Road", "videoSrc":"media/videos/Road - 84970.mp4", "artistName":"Pixabay","hasSubtitles":"no"},{"imgSrc":"media/images/Sea.png","videoName":"Sea", "videoSrc":"media/videos/Sea - 4006.mp4", "artistName":"Pixabay","hasSubtitles":"no"},{"imgSrc":"media/images/Ted.png","videoName":"Ted Talk", "videoSrc":"media/videos/Ted Talk.mp4", "artistName":"TED","hasSubtitles":"yes"}]';
videos = JSON.parse(strVideos);

// función IIFE para cargar cosas desde el inicio de la página, al entrar cargamos las canciones por defecto
(function () {
    var linkAudio = document.getElementById("linkAudio");
    var linkVideo = document.getElementById("linkVideo");
    var botonRetr = document.getElementById("AtrasarVideo");
    var botonAnterior = document.getElementById("VideoAnterior");
    var botonPausa = document.getElementById("PausePlay");
    var botonSiguiente =  document.getElementById("VideoSiguiente");
    var botonAdelantar = document.getElementById("AdelantarVideo");

    linkAudio.addEventListener('click', cambioAudio);
    linkVideo.addEventListener('click',cambioVideo);
    botonRetr.addEventListener('click',atrasaVideo)
    botonAnterior.addEventListener('click',videoAnterior)
    botonPausa.addEventListener('click',playPause);
    botonSiguiente.addEventListener('click',videoSiguiente);
    botonAdelantar.addEventListener('click',adelantaVideo);

    cambioAudio();
})();

function cambioAudio() {
    vaciarUL();
    var contenido = document.getElementById("contenido");

    canciones.forEach(function(cancion){

        var nuevoLi;
        var titulo;
        var artista;
        var imagen;
        var divTexto;
        nuevoLi = document.createElement("li");
        titulo = document.createElement("h2");
        artista = document.createElement("h4");
        imagen = document.createElement("img");
        divTexto = document.createElement("div");

        //ponemos los distintos nodos hijos
        contenido.appendChild(nuevoLi);
        nuevoLi.appendChild(imagen);
        nuevoLi.appendChild(divTexto);
        divTexto.appendChild(titulo);
        divTexto.appendChild(artista);
        
        //añadimos el contenido de los apartados
        titulo.append(cancion.songName);
        artista.append(cancion.artistName);
        imagen.setAttribute("src",cancion.imgSrc);

        //añadimos el atributo name en el li para poder sacar el nombre de la canción que nos interese al darle click
        nuevoLi.setAttribute("name", cancion.songName)

        //y ponemos el event listener para poner la canción
        nuevoLi.addEventListener('click',empezarReproduccionCancion);
    });
    togglePlayers("audio");
}

function cambioVideo() {
    vaciarUL();
    var contenido = document.getElementById("contenido");

    videos.forEach(function(video){

        var nuevoLi;
        var titulo;
        var artista;
        var imagen;
        var divTexto;
        nuevoLi = document.createElement("li");
        titulo = document.createElement("h2");
        artista = document.createElement("h4");
        imagen = document.createElement("img");
        divTexto = document.createElement("div");

        //ponemos los distintos nodos hijos
        contenido.appendChild(nuevoLi);
        nuevoLi.appendChild(imagen);
        nuevoLi.appendChild(divTexto);
        divTexto.appendChild(titulo);
        divTexto.appendChild(artista);
        
        //añadimos el contenido de los apartados
        titulo.append(video.videoName);
        artista.append(video.artistName);
        imagen.setAttribute("src",video.imgSrc);

    });
    togglePlayers("video");
}
function togglePlayers(option) {
    var audioPlayer = document.getElementsByClassName("player")[0];
    var videoPlayer = document.getElementsByClassName("contenedorVideo")[0];

    if(option == "video") {
        audioPlayer.style = "display: none";
        videoPlayer.style = "";
    }
    if(option == "audio") {
        audioPlayer.style = "";
        videoPlayer.style = "display: none";
    }  
}

function vaciarUL() {
    var contenido = document.getElementById("contenido");

    var numHijos = contenido.childElementCount;

    for (var iteraciones = 0; iteraciones < numHijos; iteraciones++){
        contenido.lastChild.remove();
    }
}
function empezarReproduccionCancion(event) {
    //añadiríamos aquí dentro la función para poner la cancion
    var parent = event.target.parentElement;

    var encontradoLi = false;

    //tenemos que encontrar el elemento Li para poder coger el atributo name, pero el target del evento no es el li sino sus hijos, así que vamos subiendo hasta encontrarlo:
    while(!encontradoLi) {
        if(parent.tagName == "LI") {
            encontradoLi = true;
        }
        else {
            parent = parent.parentElement;
        }
    }
    //conseguimos el nombre de la cancion, la buscamos en el json, conseguimos su src y lo añadimos a la
    var nombreCancion = parent.getAttribute("name");
    var cancionJSON = canciones.filter(element => element.songName == nombreCancion);
    var srcCancion = cancionJSON[0].audioSrc;
    var tagAudio = document.getElementById("tagAudio");
    tagAudio.setAttribute("src",srcCancion);
}

// Funciones de reproductor de vídeo
var videoPagina = document.getElementById("tagVideo");

function atrasaVideo() {
    videoPagina.currentTime = videoPagina.currentTime - 5;
}

function playPause() {
    if(videoPagina.paused) {
        videoPagina.play();
    }
    else {
        videoPagina.pause();
    }
}

function videoAnterior() {
    var indexVideoActual = videos.findIndex(element => element.videoSrc == videoPagina.getAttribute("src"));

    if (indexVideoActual != 0) {
        videoPagina.src = videos[indexVideoActual-1].videoSrc;
    }
}

function videoSiguiente() {
    var indexVideoActual = videos.findIndex(element => element.videoSrc == videoPagina.getAttribute("src"));

    if (videos[indexVideoActual+1] != undefined) {
        videoPagina.setAttribute("src",videos[indexVideoActual+1].videoSrc);
    }
}

function adelantaVideo() {
    videoPagina.currentTime = videoPagina.currentTime + 5;
}


// // Escuchar el elemento AUDIO
// audio.addEventListener("timeupdate", updateProgress)

// // Escuchar clicks en los controles
// play.addEventListener("click", () => {
//     if (audio.paused) {
//         playSong()   
//     } else {
//         pauseSong()
//     }
// })

// next.addEventListener("click", () => nextSong())
// prev.addEventListener("click", () => prevSong())
// //


// //actualizar controles
// function updateControls() {
//     if (audio.paused) {
//         play.classList.remove("fa-pause")
//         play.classList.add("fa-play")
//     } else {
//         play.classList.add("fa-pause")
//         play.classList.remove("fa-play")
//     }
// }
// // Reproducir canción
// function playSong() {
//     if (actualSong !== null) {
//         audio.play()
//         updateControls()
//     }
// }

// // Pausar canción
// function pauseSong() {
//     audio.pause()
//     updateControls()
// }
