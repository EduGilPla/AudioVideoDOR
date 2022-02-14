var canciones;
strCanciones = '[{"imgSrc":"","songName":"Cantina Rag", "audioSrc":"media/songs/Jackson F. Smith - Cantina Rag.mp3", "artistName":"Jackson F.Smith"},{"imgSrc":"","songName":"BuckBreak", "audioSrc":"media/songs/Ken Hamm - Buckbreak.mp3", "artistName":"Ken Hamm"},{"imgSrc":"","songName":"Little Grass Shack", "audioSrc":"media/songs/Voodoo Suite - Little Grass Shack.mp3", "artistName":"Voodoo Suite"}]';

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
        var divTexto;
        nuevoLi = document.createElement("li");
        titulo = document.createElement("h2");
        artista = document.createElement("h4");
        imagen = document.createElement("img");
        divTexto = document.createElement("div")

        contenido.appendChild(nuevoLi);
        nuevoLi.appendChild(imagen);
        nuevoLi.appendChild(divTexto);
        divTexto.appendChild(titulo);
        divTexto.appendChild(artista);
        

        titulo.append(cancion.songName);
        artista.append(cancion.artistName);
        imagen.setAttribute("src",cancion.imgSrc)
        
    });
})();