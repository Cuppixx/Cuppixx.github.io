// load_navbar.js
(function() {
    document.addEventListener("DOMContentLoaded", async function() {
        const navbar = document.getElementById("navbar");

        const cachedNavbar = localStorage.getItem("navbar");
        if (cachedNavbar) {
            navbar.innerHTML = cachedNavbar;
        } else {
            navbar.innerHTML = "<p>Loading navigation...</p>";
            try {
                const response = await fetch("/nav.html");
                if (!response.ok) {
                    throw new Error(`Failed to load navigation, status code: ${response.status}`);
                }
                const html = await response.text();
                navbar.innerHTML = html;
                localStorage.setItem("navbar", html);
                highlightCurrentTab(); // Call function to highlight the current tab after loading
            } catch (error) {
                console.error("Error loading navigation:", error);
                navbar.innerHTML = "<p>Unable to load navigation. Please try again later.</p>";
            }
        }

        // Function to highlight the current tab
        function highlightCurrentTab() {
            const currentPage = window.location.pathname.split("/").pop() || 'index.html'; // Default to 'index.html'
            console.log("Current page:", currentPage);
            const navLinks = navbar.querySelectorAll("a");
        
            navLinks.forEach(link => {
                const linkHref = link.getAttribute("href");
                console.log("Checking link:", linkHref);
                // Handle relative and full URL matches
                if (linkHref === currentPage || (linkHref === '/' && currentPage === 'index.html')) {
                    link.classList.add("active");
                }
            });
        }
    });
})();
