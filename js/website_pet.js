document.addEventListener("mousemove", (event) => {
    const pet = document.getElementById("pet");

    const petWidth = pet.offsetWidth;
    const petHeight = pet.offsetHeight;

    // Get the mouse position
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Set pet position based on mouse coordinates
    pet.style.left = `${mouseX - petWidth / 2}px`;  // Center the pet on the cursor horizontally
    pet.style.top = `${mouseY - petHeight / 2}px`;  // Center the pet on the cursor vertically
});
