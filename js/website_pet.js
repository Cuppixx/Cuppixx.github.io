const pet = document.getElementById("pet");
const groundY = window.innerHeight - 80; // Adjust height for pet to sit

let targetX = window.innerWidth / 2;
let petX = targetX, velocityX = 0;
let angle = 0, angleVelocity = 0;

// Track mouse X movement only
document.addEventListener("mousemove", (event) => {
    targetX = event.clientX;
});

// Animation loop
function animatePet() {
    // Apply smooth movement (spring effect)
    const stiffness = 0.1; // Follow speed
    const damping = 0.85; // Reduces wobble

    velocityX += (targetX - petX) * stiffness;
    velocityX *= damping;
    petX += velocityX;

    // Calculate slight rotation for a wobble effect
    angleVelocity += (velocityX * 0.05) - (angle * 0.1);
    angleVelocity *= 0.9; // Damping for rotation
    angle += angleVelocity;

    // Apply new position and rotation
    pet.style.transform = `translate(${petX}px, ${groundY}px) rotate(${angle}deg)`;

    requestAnimationFrame(animatePet);
}

animatePet(); // Start animation loop
