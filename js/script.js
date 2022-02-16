
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