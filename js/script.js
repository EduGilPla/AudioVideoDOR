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
    tagVideo: document.getElementById("tagVideo"),
    optionSelectEnglish: document.getElementById("loadEnglish"),
    optionSelectEspañol: document.getElementById("loadEspañol"),
    opcionesSubtitulos: document.getElementById("opcionesSubtitulos"),
    nombreVideo: document.getElementById("nombreVideo")
}

var canciones;
strCanciones = '[{"imgSrc":"media/images/1.jpg","songName":"Cantina Rag", "audioSrc":"media/songs/Jackson F. Smith - Cantina Rag.mp3", "artistName":"Jackson F.Smith"},{"imgSrc":"media/images/2.jpg","songName":"BuckBreak", "audioSrc":"media/songs/Ken Hamm - Buckbreak.mp3", "artistName":"Ken Hamm"},{"imgSrc":"media/images/3.jpg","songName":"Little Grass Shack", "audioSrc":"media/songs/Voodoo Suite - Little Grass Shack.mp3", "artistName":"Voodoo Suite"}]';

canciones = JSON.parse(strCanciones);
var videos;
strVideos = '[{"imgSrc":"media/images/Ink.png","videoName":"Ink", "videoSrc":"media/videos/Ink - 67358.mp4", "artistName":"Pixabay","hasSubtitles":"no"},{"imgSrc":"media/images/Road.png","videoName":"Road", "videoSrc":"media/videos/Road - 84970.mp4", "artistName":"Pixabay","hasSubtitles":"no"},{"imgSrc":"media/images/Sea.png","videoName":"Sea", "videoSrc":"media/videos/Sea - 4006.mp4", "artistName":"Pixabay","hasSubtitles":"no"},{"imgSrc":"media/images/Ted.png","videoName":"Ted Talk", "videoSrc":"media/videos/Ted Talk.mp4", "artistName":"TED","hasSubtitles":"yes","subtitlesSrc":"media/captions/captionsTED.vtt"}]';
videos = JSON.parse(strVideos);

// función IIFE para cargar cosas desde el inicio de la página, al entrar cargamos las canciones por defecto
(function () {
    //Eduardo
    DOM.linkAudio.addEventListener('click', cambioAudio);
    DOM.linkVideo.addEventListener('click', cambioVideo);
    DOM.botonRetr.addEventListener('click', atrasaVideo)
    DOM.botonAnterior.addEventListener('click', videoAnterior)
    DOM.botonPausa.addEventListener('click', playPause);
    DOM.botonSiguiente.addEventListener('click', videoSiguiente);
    DOM.botonAdelantar.addEventListener('click', adelantaVideo);
    //ricardo
    DOM.botonPrev.addEventListener('click', prev)
    DOM.botonPlayAudio.addEventListener('click', PlayPause);
    DOM.botonNext.addEventListener('click', next);

    DOM.opcionesSubtitulos.addEventListener('change', function (){
        hideTracks();
        track = document.createElement("track");
        track.kind = "captions";
        if(this.value == "en"){
            track = DOM.tagVideo.addTextTrack("captions", "English", "en");
            track.mode = "showing";
            track.addCue(new VTTCue(0, 6.5, "English Subtitles"));
            track.addCue(new VTTCue(8, 10, "[Applause]"));
            track.addCue(new VTTCue(11, 14.2, "Wow. What an audience!"));
            track.addCue(new VTTCue(14.5, 17.3, "But if I´m being honest, I don´t care what you think of my talk"));
            track.addCue(new VTTCue(17.8, 21, "I don´t. I care what the internet thinks of my talk"));
            track.addCue(new VTTCue(21.8, 26, "`Cause they´re the ones that get it seen, and get it shared. And I think that´s where most people get it wrong"));
            track.addCue(new VTTCue(26.5, 33.5, "They´re talking to you, here, instead of talking to you...random person scrolling Facebook"));
            track.addCue(new VTTCue(33.7, 35.6, "Thanks for the click"));
            track.addCue(new VTTCue(35.8, 41, "You see, back in 2009 we all had these weird little things called attention spans"));
            track.addCue(new VTTCue(41, 42, "[Laughter from the public]"));
            track.addCue(new VTTCue(42.2, 45.8, "Yeah. They´re gone. They´re gone, we killed them. They´re dead"));
            track.addCue(new VTTCue(46.3, 49.8, "I´m trying to think of the last time I watched an 18 minute TED talk"));
            track.addCue(new VTTCue(50.2, 52.5, "It´s been years. Literally years"));
            track.addCue(new VTTCue(52.8, 57.8, "So if you´re giving a TED talk, keep it quick. I´m doing mine in under a minute"));
            track.addCue(new VTTCue(58, 61, "I´m at 44 seconds right now, that means we got time for one final joke"));
            track.addCue(new VTTCue(61.3, 65, "Why are balloons so expensive? [Why?]"));
            track.addCue(new VTTCue(65, 67, "Inflation"));
            track.addCue(new VTTCue(67.5, 72, "[Laughs and applause]"));
            track.srclang = this.value;
            track.addEventListener("load",function() {
                this.mode = "showing";
            })
            
        }
        if(this.value == "es"){
            track = DOM.tagVideo.addTextTrack("captions", "Español", "es");
            track.mode = "showing";
            track.addCue(new VTTCue(0, 6.5, "Subtitulos en español"));
            track.addCue(new VTTCue(8, 10, "[Aplausos]"));
            track.addCue(new VTTCue(11, 14.2, "Guau. ¡Que gran público!"));
            track.addCue(new VTTCue(14.5, 17.3, "Pero siendo sincero, no me importa lo que penséis de mi charla"));
            track.addCue(new VTTCue(17.8, 21, "De verdad. Me importa lo que internet piense"));
            track.addCue(new VTTCue(21.8, 26, "`Porque ellos son los que dan visitas, y la comparten. Y creo que ahí es donde mucha gente se equivoca"));
            track.addCue(new VTTCue(26.5, 33.5, "Os hablan a vosotros, aquí, en vez de hablarte a ti...persona aleatoria mirando Facebook"));
            track.addCue(new VTTCue(33.7, 35.6, "Gracias por el click"));
            track.addCue(new VTTCue(35.8, 41, "Sabes, en 2009 teníamos esta pequeña cosa llamada capacidad de atención"));
            track.addCue(new VTTCue(41, 42, "[Risas del público]"));
            track.addCue(new VTTCue(42.2, 45.8, "Si. Se fue, voló, nosotros la matamos. Está muerta"));
            track.addCue(new VTTCue(46.3, 49.8, "Estoy intentando recordar la última vez que vi una TED Talk de 18 minutos"));
            track.addCue(new VTTCue(50.2, 52.5, "Hace años. Literalmente años"));
            track.addCue(new VTTCue(52.8, 57.8, "Asi que si estás dando una TED Talk, hazlo rápido. La mía dura menos de un minuto"));
            track.addCue(new VTTCue(58, 61, "Llevo 44 segundos, asi que nos queda tiempo para una broma final"));
            track.addCue(new VTTCue(61.3, 65, "¿Por qué son tan caros los globos? [¿Por qué?]"));
            track.addCue(new VTTCue(65, 67, "Por la inflación"));
            track.addCue(new VTTCue(67.5, 72, "[Risas y aplausos]"));
            track.srclang = this.value;
            track.addEventListener("load",function() {
                this.mode = "showing";
            })
            
        }    
        
    })
    

    cambioAudio();
    
})();
function hideTracks() {
    for (i = 0; i < DOM.tagVideo.textTracks.length; i++) {
        DOM.tagVideo.textTracks[i].mode = "hidden";
    }
}
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

    if (tagAudio.play) {
        DOM.botonPlayAudio.classList.add("fa-play");
        DOM.botonPlayAudio.classList.remove("fa-pause");
    }
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
    DOM.tagVideo.setAttribute("src", srcVideo);
    DOM.nombreVideo.innerHTML = videoJSON[0].videoName;
    //cambiamos el botón play
    if (tagVideo.play) {
        DOM.tagVideo.pause();
        DOM.botonPlayVideo.classList.add("fa-play");
        DOM.botonPlayVideo.classList.remove("fa-pause");
    }
    hideTracks();
    if(videoJSON[0].hasSubtitles == "yes") {
        DOM.opcionesSubtitulos.setAttribute("style","display:block");
        DOM.opcionesSubtitulos.value = "none";
    }
    else {
        DOM.opcionesSubtitulos.setAttribute("style","display:none");
    }
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