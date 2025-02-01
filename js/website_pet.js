document.addEventListener("mousemove", (event) => {
    const pet = document.getElementById("pet");

    const petWidth = pet.offsetWidth;

    // Get the mouse position
    const mouseX = event.clientX;

    // Set pet position based on mouse coordinates
    pet.style.left = `${mouseX - petWidth / 2}px`;  // Center the pet on the cursor horizontally
});
