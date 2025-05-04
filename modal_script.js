const colorThief = new ColorThief();
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-image");
const closeBtn = document.getElementsByClassName("close")[0];
const modalTitle = document.getElementById("modal-title");
const modalRating = document.querySelector(".modal-rating");
const modalDescription = document.getElementById("modal-description");
const modalDirector = document.getElementById("modal-director");
const modalWriter = document.getElementById("modal-writer");
const modalStars = document.getElementById("modal-stars");
const checkbox = document.querySelector('.checkbox');
let descriptions = {};

document.querySelectorAll(".slider img").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    setTimeout(() => {
      modal.classList.add("show");
    }, 10);
    modalImg.src = img.src;
    const title = img.getAttribute("data-title") || "Default Title";
    modalTitle.textContent = title;

    const rating = img.getAttribute("data-rating");
    modalRating.textContent = rating ? `⭐ ${rating}` : "";

    modalDescription.textContent = descriptions[title]?.description || "No description available.";
    modalDirector.textContent = descriptions[title]?.director ? `Yönetmen: ${descriptions[title].director}` : "";
    modalWriter.textContent = descriptions[title]?.writer ? `Senaryo: ${descriptions[title].writer}` : "";
    modalStars.textContent = descriptions[title]?.stars ? `Oyuncular: ${descriptions[title].stars}` : "";

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorite = favorites.some(movie => movie.title === title);
    checkbox.checked = isFavorite;
    
    if (modalImg.complete) {
      applyDominantColor();
    } else {
      modalImg.addEventListener("load", applyDominantColor);
    }
  });
});

closeBtn.onclick = function() {
  modal.classList.remove("show");
  setTimeout(() => {
    modal.style.display = "none";
  }, 500);
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.classList.remove("show");
    setTimeout(() => {
      modal.style.display = "none";
    }, 500);
  }
}

fetch("descriptions.json")
  .then(response => response.json())
  .then(data => {
    descriptions = data;
  })
  .catch(error => console.error("Description data load error:", error));


function applyDominantColor() {
  const rgb = colorThief.getColor(modalImg);
  const rgba = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.75)`;
  document.querySelector(".modal-content").style.backgroundColor = rgba;

  const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;

  const textColor = brightness > 150 ? "#000000" : "#ffffff";

  document.querySelector(".modal-content").style.color = textColor;
  document.getElementById("modal-title").style.color = textColor;
  document.querySelector(".modal-rating").style.color = textColor;
  document.getElementById("modal-description").style.color = textColor;
  document.querySelector(".close").style.color = textColor;
  document.getElementById("modal-director").style.color = textColor;
  document.getElementById("modal-writer").style.color = textColor;
  document.getElementById("modal-stars").style.color = textColor;
  document.querySelector(".checkbox__label--text").style.color = textColor;
}


checkbox.addEventListener('change', () => {
  const favoriteMovie = {
    title: modalTitle.textContent,
    img: modalImg.src,
    rating: modalRating.textContent
  };

  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  const index = favorites.findIndex(movie => movie.title === favoriteMovie.title);

  if (checkbox.checked) {
    if (index === -1) {
      favorites.push(favoriteMovie);
    }
  } else {
    if (index !== -1) {
      favorites.splice(index, 1);
    }
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
});


fetch("descriptions.json")
  .then(response => response.json())
  .then(data => {
    descriptions = data;

    
    const targetTitle = localStorage.getItem("openModalMovie");
    if (targetTitle) {
      const targetImg = Array.from(document.querySelectorAll(".slider img"))
        .find(img => img.getAttribute("data-title") === targetTitle);

      if (targetImg) {
        targetImg.click(); 
      }

      localStorage.removeItem("openModalMovie");
    }
  })
  .catch(error => console.error("Description data load error:", error));