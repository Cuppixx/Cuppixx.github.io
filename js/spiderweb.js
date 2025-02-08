document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('spiderweb');
    const ctx = canvas.getContext('2d');
    let points = [];
    let mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    // Resize the canvas to cover the entire viewport and regenerate points
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        generatePoints();
    }

    // Generate a number of random points across the canvas
    function generatePoints() {
        points = [];
        const pointCount = 100; // Adjust this value for more/less points
        for (let i = 0; i < pointCount; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            points.push({ x, y });
        }
    }

    // Update canvas size on window resize
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Update mouse position when the mouse moves
    // (Listening on document ensures that mouse movement is tracked even if not directly over the canvas)
    document.addEventListener('mousemove', function(e) {
        mousePos = { x: e.clientX, y: e.clientY };
    });

    // Draw the spiderweb background
    function draw() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw each point as a small circle
        ctx.fillStyle = 'black';
        points.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fill();
        });

        // Compute distances from the current mouse position and select the 5 nearest points
        let nearest = points
            .map(p => ({ ...p, distance: (p.x - mousePos.x) ** 2 + (p.y - mousePos.y) ** 2 }))
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 5);

        // Draw lines from the mouse position to each of the 5 nearest points
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        nearest.forEach(p => {
            ctx.beginPath();
            ctx.moveTo(mousePos.x, mousePos.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
        });

        requestAnimationFrame(draw);
    }
    draw();
});
