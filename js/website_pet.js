const pet = document.getElementById("pet");
const floor = window.innerHeight - 80;

let targetX = window.innerWidth / 2;
let petX = targetX, velocityX = 0;
let angle = 0, angleVelocity = 0;

document.addEventListener("mousemove", (event) => {
    targetX = event.clientX;
});

function animatePet() {
    const stiffness = 0.1;
    const damping = 0.85;

    velocityX += (targetX - petX) * stiffness;
    velocityX *= damping;
    petX += velocityX;

    angleVelocity += (velocityX * 0.05) - (angle * 0.1);
    angleVelocity *= 0.9;
    angle += angleVelocity;

    pet.style.transform = `translate(${petX}px, ${floor}px) rotate(${angle}deg)`;

    requestAnimationFrame(animatePet);
}

animatePet();
