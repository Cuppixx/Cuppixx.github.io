const pet = document.getElementById("pet");
let targetX = window.innerWidth / 2, targetY = window.innerHeight / 2;
let petX = targetX, petY = targetY;
let velocityX = 0, velocityY = 0;
let angle = 0, angleVelocity = 0;

// Track mouse movement
document.addEventListener("mousemove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY + 20; // Slight offset so it's dangling
});

// Animation loop
function animatePet() {
    // Apply simple physics: smooth movement (spring effect)
    const stiffness = 0.1; // How fast it follows
    const damping = 0.85; // Reduces wobble

    velocityX += (targetX - petX) * stiffness;
    velocityY += (targetY - petY) * stiffness;

    velocityX *= damping;
    velocityY *= damping;

    petX += velocityX;
    petY += velocityY;

    // Calculate angle based on movement for dangling effect
    angleVelocity += (velocityX * 0.05) - (angle * 0.1);
    angleVelocity *= 0.9; // Damping for rotation
    angle += angleVelocity;

    // Apply new position and rotation
    pet.style.transform = `translate(${petX}px, ${petY}px) rotate(${angle}deg)`;

    requestAnimationFrame(animatePet);
}

animatePet(); // Start animation loop
