(function() {
    document.addEventListener("DOMContentLoaded", async () => {
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

        const highlightCurrentTab = () => {
            const currentPath = window.location.pathname;

            const navLinks = navbar.querySelectorAll("a");

            navLinks.forEach(link => {
                const linkHref = link.getAttribute("href");

                // Compare the normalized path (removing leading slashes)
                const normalizedCurrentPath = currentPath.replace(/^\/+/, '');
                const normalizedLinkHref = linkHref.replace(/^\/+/, '');

                // Handle the root path scenario
                const isCurrentPage = normalizedCurrentPath === normalizedLinkHref || 
                                      (normalizedCurrentPath === '' && normalizedLinkHref === 'index.html') || 
                                      (`/${normalizedCurrentPath}` === normalizedLinkHref);

                link.classList.toggle("active", isCurrentPage);
            });
        };

        // Highlight the current tab when the page is loaded
        highlightCurrentTab();

        // Handle clicks on navigation links and highlight the current tab after navigation
        navbar.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                setTimeout(highlightCurrentTab, 100); // Slight delay to ensure navigation occurs before tab highlighting
            });
        });
    });
})();
