const slides = document.querySelector(".slides");

let index = 0;
const totalImages = 4;

setInterval(() => {

    index = (index + 1) % totalImages;

    slides.style.transform =
        `translateX(-${index * 25}%)`;

}, 3000);