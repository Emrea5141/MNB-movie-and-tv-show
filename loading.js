window.addEventListener("load", () => {
    const loader = document.getElementById("loading-screen");
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
      document.querySelector(".page-content").style.display = "block";
    }, 600); 
  });