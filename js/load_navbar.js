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

        // Function to highlight the current tab
        function highlightCurrentTab() {
            const currentPath = window.location.pathname;  // Get the path after the domain
            console.log("Current path:", currentPath);

            const navLinks = navbar.querySelectorAll("a");

            navLinks.forEach(link => {
                const linkHref = link.getAttribute("href");
                console.log("Checking link:", linkHref);

                // Compare the normalized path (removing leading slashes)
                const normalizedCurrentPath = currentPath.replace(/^\/+/, '');  // Strip leading slashes
                const normalizedLinkHref = linkHref.replace(/^\/+/, '');  // Strip leading slashes

                // Handle the root path scenario
                if (normalizedCurrentPath === normalizedLinkHref || 
                    (normalizedCurrentPath === '' && normalizedLinkHref === 'index.html') || 
                    (`/${normalizedCurrentPath}` === normalizedLinkHref)) {
                    link.classList.add("active");
                } else {
                    link.classList.remove("active");
                }
            });
        }

        // Highlight the current tab when the page is loaded
        highlightCurrentTab();

        // Handle clicks on navigation links and highlight the current tab after navigation
        const navLinks = navbar.querySelectorAll("a");
        navLinks.forEach(link => {
            link.addEventListener("click", function() {
                setTimeout(highlightCurrentTab, 100); // Slight delay to ensure navigation occurs before tab highlighting
            });
        });
    });
})();
