let navDiv = document.querySelector(".box-nav");
let btn = document.querySelector(".navbar-toggler");
let crossAndBar = document.querySelector(".CrossAndBar i");

// nav bar and cross button

btn.addEventListener("click", () => {
  navDiv.classList.toggle("show");

  if (crossAndBar.classList.contains("fa-bars-staggered")) {
    crossAndBar.classList.remove("fa-bars-staggered");
    crossAndBar.classList.add("fa-xmark");
  } else {
    crossAndBar.classList.remove("fa-xmark");
    crossAndBar.classList.add("fa-bars-staggered");
  }
});


// tax button

let taxSwitchBtns = document.querySelectorAll(".tax-button i");

taxSwitchBtns.forEach((taxSwitchBtn) => {
  taxSwitchBtn.addEventListener("click", () => {
    let taxInfo = document.querySelectorAll(".tax-info");

    // Toggle the icon classes
    if (taxSwitchBtn.classList.contains("fa-toggle-off")) {
      taxSwitchBtn.classList.remove("fa-toggle-off");
      taxSwitchBtn.classList.add("fa-toggle-on");
    } else {
      taxSwitchBtn.classList.remove("fa-toggle-on");
      taxSwitchBtn.classList.add("fa-toggle-off");
    }

    // Toggle the visibility of .tax-info elements
    taxInfo.forEach((info) => {
      info.style.display = info.style.display !== "inline" ? "inline" : "none";
    });
  });
});


// carousel nav category icons

function scrollFilters(scrollValue) {
  const filtersContainer = document.querySelector(".filters");

  if (filtersContainer) {
    // Scroll the filters container
    filtersContainer.scrollBy({
      left: scrollValue,
      behavior: "smooth"
    });
  }
}
