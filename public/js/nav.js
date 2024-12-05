let navDiv = document.querySelector(".box-nav");

let btn = document.querySelector(".navbar-toggler");


btn.addEventListener("click", () => {
    if (navDiv.style.display === 'none') {
        navDiv.style.display = 'block'
    }
    else {
        navDiv.style.display = 'none'

    }
});