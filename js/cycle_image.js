document.querySelectorAll(".project-preview").forEach(preview => {
    const images = JSON.parse(preview.getAttribute("data-images"));
    let currentIndex = 0;
    const imgElement = preview.querySelector("img");
    const prevBtn = preview.querySelector(".prev-btn");
    const nextBtn = preview.querySelector(".next-btn");

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        imgElement.src = images[currentIndex];
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % images.length;
        imgElement.src = images[currentIndex];
    });
});
