document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".project-preview").forEach(preview => {
        const images = JSON.parse(preview.getAttribute("data-images"));
        const imgDimensions = [];
        let loadedCount = 0;

        function setContainerHeight() {
            let maxDisplayHeight = 0;
            const containerWidth = preview.clientWidth;
            imgDimensions.forEach(dim => {
                const displayHeight = containerWidth * (dim.naturalHeight / dim.naturalWidth);
                maxDisplayHeight = Math.max(maxDisplayHeight, displayHeight);
            });
            preview.style.height = maxDisplayHeight + "px";
        }

        images.forEach(src => {
            const img = new Image();
            img.onload = () => {
                imgDimensions.push({
                    naturalWidth: img.naturalWidth,
                    naturalHeight: img.naturalHeight
                });
                loadedCount++;
                if (loadedCount === images.length) {
                    setContainerHeight();
                }
            };
            img.src = src;
        });

        window.addEventListener("resize", setContainerHeight);

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
