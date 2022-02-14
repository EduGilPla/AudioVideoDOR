var canciones;
strCanciones = '[{"imgSrc":"media/images/1.jpg","songName":"Cantina Rag", "audioSrc":"media/songs/Jackson F. Smith - Cantina Rag.mp3", "artistName":"Jackson F.Smith"},{"imgSrc":"media/images/2.jpg","songName":"BuckBreak", "audioSrc":"media/songs/Ken Hamm - Buckbreak.mp3", "artistName":"Ken Hamm"},{"imgSrc":"media/images/3.jpg","songName":"Little Grass Shack", "audioSrc":"media/songs/Voodoo Suite - Little Grass Shack.mp3", "artistName":"Voodoo Suite"}]';

canciones = JSON.parse(strCanciones);
var videos;
strVideos = '[{"imgSrc":"media/images/Ink.png","videoName":"Ink", "videoSrc":"media/videos/Ink - 67358.mp4", "artistName":"Pixabay"},{"imgSrc":"media/images/Road.png","videoName":"Road", "videoSrc":"media/videos/Road - 84970.mp4", "artistName":"Pixabay"},{"imgSrc":"media/images/Sea.png","videoName":"Sea", "videoSrc":"media/videos/Sea - 4006.mp4", "artistName":"Pixabay"}]';
videos = JSON.parse(strVideos);

// función IIFE para cargar cosas desde el inicio de la página, al entrar cargamos las canciones por defecto
(function () {
    var linkAudio = document.getElementById("linkAudio");
    var linkVideo = document.getElementById("linkVideo");
    linkAudio.addEventListener('click', cambioAudio);
    linkVideo.addEventListener('click',cambioVideo);
    
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

        //y ponemos el event listener para poner la canción
        nuevoLi.addEventListener('click',empezarReproduccionCancion);
    });
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
}