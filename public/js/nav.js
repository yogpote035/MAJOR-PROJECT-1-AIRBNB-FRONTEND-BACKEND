let navDiv = document.querySelector(".box-nav");
let btn = document.querySelector(".navbar-toggler");
let crossAndBar = document.querySelector(".CrossAndBar i");

btn.addEventListener("click", () => {
  // Toggle visibility using CSS classes
  navDiv.classList.toggle("show");

  // Toggle icon classes
  if (crossAndBar.classList.contains("fa-bars-staggered")) {
    crossAndBar.classList.remove("fa-bars-staggered");
    crossAndBar.classList.add("fa-xmark");
  } else {
    crossAndBar.classList.remove("fa-xmark");
    crossAndBar.classList.add("fa-bars-staggered");
  }
});
