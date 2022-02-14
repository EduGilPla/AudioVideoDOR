var canciones;
strCanciones = '[{"imgSrc":"","songName":"Torero", "audioSrc":"", "artistName":"Chayanne"},{"imgSrc":"","songName":"Torero", "audioSrc":"", "artistName":"Chayanne"},{"imgSrc":"","songName":"Torero", "audioSrc":"", "artistName":"Chayanne"}]';

canciones = JSON.parse(strCanciones);
var videos;
strVideos = '[{imgSrc:"",videoName:"", videoSrc:"", artistName:""},{imgSrc:"",videoName:"", videoSrc:"", artistName:""},{imgSrc:"",videoName:"", videoSrc:"", artistName:""}]';


// función IIFE para cargar cosas desde el inicio de la página, al entrar cargamos las canciones:
(function () {
    var contenido = document.getElementById("contenido");
    
    canciones.forEach(function(cancion){

        var nuevoLi;
        var titulo;
        var artista;
        var imagen;
        nuevoLi = document.createElement("li");
        titulo = document.createElement("h2");
        artista = document.createElement("h4");
        imagen = document.createElement("img");

        contenido.appendChild(nuevoLi);
        nuevoLi.appendChild(titulo);
        nuevoLi.appendChild(artista);
        nuevoLi.appendChild(imagen);

        titulo.append(cancion.songName);
        artista.append(cancion.artistName);
        imagen.setAttribute("src",cancion.imgSrc)
        
    });
})();