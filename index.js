var menu = document.querySelector(".menu")
var aboutButton = document.querySelector(".aboutButton")
var exitAboutButton = document.querySelector("#exit-about")
aboutButton.onclick = flip
exitAboutButton.onclick = flip

var flipped = false

function flip () {
    flipped = !flipped
    console.log(flipped)
    if (flipped){
        $(".container-inner").addClass("rotated")
        $("")
    } else {
        $(".container-inner").removeClass("rotated")
    }
}