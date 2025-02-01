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
            } catch (error) {
                console.error("Error loading navigation:", error);
                navbar.innerHTML = "<p>Unable to load navigation. Please try again later.</p>";
            }
        }
    });
})();
