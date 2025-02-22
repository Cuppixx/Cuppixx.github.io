document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".project-preview").forEach(preview => {
        const images = JSON.parse(preview.getAttribute("data-images"));

        // Determine the maximum natural height among the images
        let maxHeight = 0;
        let loadedCount = 0;

        images.forEach(src => {
            const img = new Image();
            img.onload = () => {
                maxHeight = Math.max(maxHeight, img.naturalHeight);
                loadedCount++;
                if (loadedCount === images.length) {
                    // Set the container height to the tallest image's height
                    preview.style.height = maxHeight + "px";
                }
            };
            img.src = src;
        });

        // Initialize the image cycling functionality
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
});
