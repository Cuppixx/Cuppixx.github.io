document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('spiderweb');
    const ctx = canvas.getContext('2d');
    let points = [];
    let mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    // Generate a number of random points across the canvas with a twinkle phase
    function generatePoints() {
        points = [];
        const pointCount = 100; // Adjust for more/less points
        for (let i = 0; i < pointCount; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            // Add a random phase for twinkling effect
            const twinkle = Math.random() * Math.PI * 2;
            points.push({ x, y, twinkle });
        }
    }

    // Resize the canvas to cover the entire viewport and regenerate points (debounced)
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        generatePoints();
    }
    
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resizeCanvas, 250);
    });
    resizeCanvas();

    // Update mouse position when the mouse moves
    document.addEventListener('mousemove', function(e) {
        mousePos = { x: e.clientX, y: e.clientY };
    });

    // Draw a galaxy-like radial gradient as the background
    function drawBackground() {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.max(canvas.width, canvas.height) / 2;
        let grad = ctx.createRadialGradient(centerX, centerY, radius * 0.1, centerX, centerY, radius);
        grad.addColorStop(0, '#000033'); // Dark blue center
        grad.addColorStop(1, '#000000'); // Black edges
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Draw the spiderweb background with enhanced visual effects
    function draw() {
        // Clear the canvas and draw the gradient background
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground();

        // Draw each point as a twinkling star with a soft glow
        points.forEach(p => {
            // Compute an opacity that oscillates over time using a sine function.
            let opacity = 0.3 + 0.7 * ((Math.sin(Date.now() / 500 + p.twinkle) + 1) / 2);
            ctx.globalAlpha = opacity;
            ctx.fillStyle = 'white';
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'white';
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1; // Reset alpha
        ctx.shadowBlur = 0;  // Reset shadow

        // Compute distances and select the 10 nearest points
        let nearest10 = points
            .map(p => ({ ...p, distance: (p.x - mousePos.x) ** 2 + (p.y - mousePos.y) ** 2 }))
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 10);

        // Shuffle the 10 nearest points and then select 5 random ones
        let nearest = shuffleArray(nearest10).slice(0, 5);

        // Set composite for a glowing effect
        ctx.globalCompositeOperation = 'lighter';

        nearest.forEach(p => {
            // Compute distance for dynamic adjustments
            const dx = p.x - mousePos.x;
            const dy = p.y - mousePos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Dynamic control point offset (10% of distance)
            let offset = distance * 0.1;
            let cpX = (mousePos.x + p.x) / 2;
            let cpY = (mousePos.y + p.y) / 2 - offset;
            
            // Variable line width (between 1 and 3)
            ctx.lineWidth = Math.max(1, Math.min(3, distance / 100));
            
            // Animate opacity similar to stars (base opacity plus oscillation)
            let timeFactor = (Math.sin(Date.now() / 500 + p.twinkle) + 1) / 2;
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 + 0.2 * timeFactor})`;

            // Set a subtle glow
            ctx.shadowBlur = 5;
            ctx.shadowColor = 'white';

            ctx.beginPath();
            ctx.moveTo(mousePos.x, mousePos.y);
            ctx.quadraticCurveTo(cpX, cpY, p.x, p.y);
            ctx.stroke();
            
            // Reset shadow after drawing each line
            ctx.shadowBlur = 0;
        });

        // Reset composite operation
        ctx.globalCompositeOperation = 'source-over';

        requestAnimationFrame(draw);
    }
    draw();
});
