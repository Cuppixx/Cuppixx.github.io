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
        
 function highlightCurrentTab() {
            const currentPage = window.location.pathname.split("/").pop() || 'index.html'; // Default to 'index.html' if empty
            console.log("Current page:", currentPage);

            const navLinks = navbar.querySelectorAll("a");
        
            navLinks.forEach(link => {
                const linkHref = link.getAttribute("href");
                console.log("Checking link:", linkHref);
                
                // Remove the leading '/' if it exists for comparison consistency
                const linkHrefNormalized = linkHref.replace(/^\/+/, '');
                const currentPageNormalized = currentPage.replace(/^\/+/, '');

                // Handle both relative paths and full URLs
                if (linkHrefNormalized === currentPageNormalized || (linkHrefNormalized === '' && currentPageNormalized === 'index.html')) {
                    link.classList.add("active");
                } else {
                    link.classList.remove("active");
                }
            });
        }

        // Highlight the current tab when the page is loaded or when the user navigates
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
