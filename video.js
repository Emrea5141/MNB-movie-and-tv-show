document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("bannerVideo");
    const dots = document.querySelectorAll(".dot");

    const videoSources = [
        "Video/kingsman.mp4",
        "Video/cars3.mp4",
        "Video/mib.mp4"
    ];

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            video.src = videoSources[index];
            video.play();
        });
    });
});



