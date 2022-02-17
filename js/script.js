const DOM = {
    linkAudio: document.getElementById("linkAudio"),
    linkVideo: document.getElementById("linkVideo"),
    botonRetr: document.getElementById("AtrasarVideo"),
    botonAnterior: document.getElementById("VideoAnterior"),
    botonPausa: document.getElementById("PausePlay"),
    botonSiguiente: document.getElementById("VideoSiguiente"),
    botonAdelantar: document.getElementById("AdelantarVideo"),
    botonPrev: document.getElementById("prev"),
    botonPlayAudio: document.getElementById("PlayPause"),
    botonNext: document.getElementById("next"),
    contenido: document.getElementById("contenido"),
    audioPlayer: document.getElementsByClassName("player")[0],
    videoPlayer: document.getElementsByClassName("contenedorVideo")[0],
    videoPagina: document.getElementById("tagVideo"),
    botonPlayVideo: document.getElementById("iconoPausePlayVideo"),
    tagAudio: document.getElementById("tagAudio"),
    tagVideo: document.getElementById("tagVideo")
}

var canciones;
strCanciones = '[{"imgSrc":"media/images/1.jpg","songName":"Cantina Rag", "audioSrc":"media/songs/Jackson F. Smith - Cantina Rag.mp3", "artistName":"Jackson F.Smith"},{"imgSrc":"media/images/2.jpg","songName":"BuckBreak", "audioSrc":"media/songs/Ken Hamm - Buckbreak.mp3", "artistName":"Ken Hamm"},{"imgSrc":"media/images/3.jpg","songName":"Little Grass Shack", "audioSrc":"media/songs/Voodoo Suite - Little Grass Shack.mp3", "artistName":"Voodoo Suite"}]';

canciones = JSON.parse(strCanciones);
var videos;
strVideos = '[{"imgSrc":"media/images/Ink.png","videoName":"Ink", "videoSrc":"media/videos/Ink - 67358.mp4", "artistName":"Pixabay","hasSubtitles":"no"},{"imgSrc":"media/images/Road.png","videoName":"Road", "videoSrc":"media/videos/Road - 84970.mp4", "artistName":"Pixabay","hasSubtitles":"no"},{"imgSrc":"media/images/Sea.png","videoName":"Sea", "videoSrc":"media/videos/Sea - 4006.mp4", "artistName":"Pixabay","hasSubtitles":"no"},{"imgSrc":"media/images/Ted.png","videoName":"Ted Talk", "videoSrc":"media/videos/Ted Talk.mp4", "artistName":"TED","hasSubtitles":"yes"}]';
videos = JSON.parse(strVideos);

// función IIFE para cargar cosas desde el inicio de la página, al entrar cargamos las canciones por defecto
(function () {
    DOM.linkAudio.addEventListener('click', cambioAudio);
    DOM.linkVideo.addEventListener('click', cambioVideo);
    DOM.botonRetr.addEventListener('click', atrasaVideo)
    DOM.botonAnterior.addEventListener('click', videoAnterior)
    DOM.botonPausa.addEventListener('click', playPause);
    DOM.botonSiguiente.addEventListener('click', videoSiguiente);
    DOM.botonAdelantar.addEventListener('click', adelantaVideo);
    //ricardo0
    DOM.botonPrev.addEventListener('click', prev)
    DOM.botonPlayAudio.addEventListener('click', PlayPause);
    DOM.botonNext.addEventListener('click', next);

    cambioAudio();
    
})();

function cambioAudio() {
    vaciarUL();

    canciones.forEach(function (cancion) {

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
        DOM.contenido.appendChild(nuevoLi);
        nuevoLi.appendChild(imagen);
        nuevoLi.appendChild(divTexto);
        divTexto.appendChild(titulo);
        divTexto.appendChild(artista);

        //añadimos el contenido de los apartados
        titulo.append(cancion.songName);
        artista.append(cancion.artistName);
        imagen.setAttribute("src", cancion.imgSrc);

        //añadimos el atributo name en el li para poder sacar el nombre de la canción que nos interese al darle click
        nuevoLi.setAttribute("name", cancion.songName)

        //y ponemos el event listener para poner la canción
        nuevoLi.addEventListener('click', empezarReproduccionCancion);
    });
    if (tagVideo.play) {
        DOM.tagVideo.pause();
        DOM.botonPlayVideo.classList.add("fa-play");
        DOM.botonPlayVideo.classList.remove("fa-pause");
    }
    
    togglePlayers("audio");
}

function cambioVideo() {
    vaciarUL();

    videos.forEach(function (video) {

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
        DOM.contenido.appendChild(nuevoLi);
        nuevoLi.appendChild(imagen);
        nuevoLi.appendChild(divTexto);
        divTexto.appendChild(titulo);
        divTexto.appendChild(artista);

        //añadimos el contenido de los apartados
        titulo.append(video.videoName);
        artista.append(video.artistName);
        imagen.setAttribute("src", video.imgSrc);

        //añadimos el atributo name en el li para poder sacar el nombre del video que nos interese al darle click
        nuevoLi.setAttribute("name", video.videoName)

        //y ponemos el event listener para poner el video
        nuevoLi.addEventListener('click', empezarReproduccionVideo);

    });
    if (tagAudio.play) {
        DOM.tagAudio.pause();
        DOM.botonPlayAudio.classList.add("fa-play");
        DOM.botonPlayAudio.classList.remove("fa-pause");
    }
    togglePlayers("video");
}

function togglePlayers(option) {
    if(option == "video") {
        DOM.audioPlayer.style = "display: none";
        DOM.videoPlayer.style = "";
    }
    if(option == "audio") {
        DOM.audioPlayer.style = "";
        DOM.videoPlayer.style = "display: none";
    }  
}

function vaciarUL() {
    var numHijos = DOM.contenido.childElementCount;

    for (var iteraciones = 0; iteraciones < numHijos; iteraciones++) {
        DOM.contenido.lastChild.remove();
    }
}
function empezarReproduccionCancion(event) {
    //añadiríamos aquí dentro la función para poner la cancion
    var parent = event.target.parentElement;

    var encontradoLi = false;

    //tenemos que encontrar el elemento Li para poder coger el atributo name, pero el target del evento no es el li sino sus hijos, así que vamos subiendo hasta encontrarlo:
    while (!encontradoLi) {
        if (parent.tagName == "LI") {
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
    var srcImagen = cancionJSON[0].imgSrc;
    
    DOM.tagAudio.setAttribute("src", srcCancion);
    var tagImg = document.getElementById("imgCancion");
    tagImg.setAttribute("src",srcImagen);
    var tagTitulo = document.getElementById("title");
    tagTitulo.innerHTML = nombreCancion;
}

function empezarReproduccionVideo(event) {
    //añadiríamos aquí dentro la función para poner la cancion
    var parent = event.target.parentElement;

    var encontradoLi = false;

    //tenemos que encontrar el elemento Li para poder coger el atributo name, pero el target del evento no es el li sino sus hijos, así que vamos subiendo hasta encontrarlo:
    while (!encontradoLi) {
        if (parent.tagName == "LI") {
            encontradoLi = true;
        }
        else {
            parent = parent.parentElement;
        }
    }
    //conseguimos el nombre de la cancion, la buscamos en el json, conseguimos su src y lo añadimos a la
    var nombreVideo = parent.getAttribute("name");
    var videoJSON = videos.filter(element => element.videoName == nombreVideo);
    var srcVideo = videoJSON[0].videoSrc;
    var tagVideo = document.getElementById("tagVideo");
    tagVideo.setAttribute("src", srcVideo);
}


// Funciones de reproductor de vídeo

function atrasaVideo() {
    DOM.videoPagina.currentTime = DOM.videoPagina.currentTime - 5;
}

function playPause() {
    if(DOM.videoPagina.getAttribute("src") != "") {
        if (DOM.videoPagina.paused) {
            DOM.videoPagina.play();
            DOM.botonPlayVideo.classList.toggle("fa-pause");
            DOM.botonPlayVideo.classList.toggle("fa-play");
        }
        else {
            DOM.videoPagina.pause();
            DOM.botonPlayVideo.classList.toggle("fa-pause");
            DOM.botonPlayVideo.classList.toggle("fa-play");
        }
    }
}

function videoAnterior() {
    var indexVideoActual = videos.findIndex(element => element.videoSrc == DOM.videoPagina.getAttribute("src"));

    if (indexVideoActual != 0) {
        DOM.videoPagina.src = videos[indexVideoActual - 1].videoSrc;
    }
}

function videoSiguiente() {
    var indexVideoActual = videos.findIndex(element => element.videoSrc == DOM.videoPagina.getAttribute("src"));

    if (videos[indexVideoActual + 1] != undefined) {
        DOM.videoPagina.setAttribute("src", videos[indexVideoActual + 1].videoSrc);
    }
}

function adelantaVideo() {
    DOM.videoPagina.currentTime = DOM.videoPagina.currentTime + 5;
}

//funciones de reproductor de audio

function PlayPause() {
    if(DOM.tagAudio.getAttribute("src") != "") {
        if (DOM.tagAudio.paused) {
            DOM.tagAudio.play();
            DOM.botonPlayAudio.classList.toggle("fa-pause");
            DOM.botonPlayAudio.classList.toggle("fa-play");
        }
        else{
            DOM.tagAudio.pause();
            DOM.botonPlayAudio.classList.toggle("fa-pause");
            DOM.botonPlayAudio.classList.toggle("fa-play");
        }
    }  
}

function prev() {
    var indexCancionesActual = canciones.findIndex(element => element.audioSrc == DOM.tagAudio.getAttribute("src"));
    var tagImg = document.getElementById("imgCancion");
    var tagTitulo = document.getElementById("title");
    
    if (indexCancionesActual != 0) {
        DOM.tagAudio.setAttribute("src", canciones[indexCancionesActual - 1].audioSrc);
        tagImg.setAttribute("src",canciones[indexCancionesActual - 1].imgSrc);
        tagTitulo.innerHTML = canciones[indexCancionesActual - 1].songName;
    }
}

function next() {
    var indexCancionesActual = canciones.findIndex(element => element.audioSrc == DOM.tagAudio.getAttribute("src"));
    var tagImg = document.getElementById("imgCancion");
    var tagTitulo = document.getElementById("title");
    if (canciones[indexCancionesActual + 1] != undefined) {
        DOM.tagAudio.setAttribute("src", canciones[indexCancionesActual + 1].audioSrc);
        tagImg.setAttribute("src",canciones[indexCancionesActual + 1].imgSrc);
        tagTitulo.innerHTML = canciones[indexCancionesActual + 1].songName;
        
    }
}