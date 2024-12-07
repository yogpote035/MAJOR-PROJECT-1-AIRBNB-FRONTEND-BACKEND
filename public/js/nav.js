let navDiv = document.querySelector(".box-nav");

let btn = document.querySelector(".navbar-toggler");
let crossAndBar = document.querySelector(".CrossAndBar i");


btn.addEventListener("click", () => {
    if (navDiv.style.display === 'none' && crossAndBar.classList.contains("fa-bars-staggered")) {
        crossAndBar.classList.remove("fa-bars-staggered");
        crossAndBar.classList.add("fa-xmark");
        navDiv.style.display = 'block'
    }
    else {
        navDiv.style.display = 'none'
        crossAndBar.classList.remove("fa-xmark");
        crossAndBar.classList.add("fa-bars-staggered");
    }
});