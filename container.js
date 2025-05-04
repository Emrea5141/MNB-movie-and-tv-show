const videoElement = document.getElementById("bannerVideo");
const videoSources = [
  "kingsman.mp4",
  "cars3.mp4",
  "mıb.mp4"
];

const dots = document.querySelectorAll(".dot");


function changeVideo(index) {
  videoElement.querySelector("source").src = videoSources[index];
  videoElement.load(); 
  updateActiveDot(index);
}


function updateActiveDot(index) {
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}


dots.forEach((dot, index) => {
  dot.addEventListener("click", () => changeVideo(index));
});


updateActiveDot(0);