document.addEventListener('DOMContentLoaded', function() {
    // Select all tab buttons
    const buttons = document.querySelectorAll('.tab-button');
    
    // Attach click event listeners to each button
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = button.getAttribute('data-tab');
            showTab(tabName);
        });
    });
});

function showTab(tabName) {
    // Remove 'active' class from all tab content elements
    document.querySelectorAll('.tab-content').forEach((tab) => {
        tab.classList.remove('active');
    });
    
    // Remove 'active' class from all tab buttons
    document.querySelectorAll('.tab-button').forEach((btn) => {
        btn.classList.remove('active');
    });
    
    // Add 'active' class to the selected tab content
    const targetTab = document.getElementById(tabName);
    if (targetTab) {
        targetTab.classList.add('active');
    } else {
        console.error("No element with id", tabName);
    }
    
    // Add 'active' class to the corresponding button
    const targetButton = document.querySelector(`.tab-button[data-tab="${tabName}"]`);
    if (targetButton) {
        targetButton.classList.add('active');
    }
}
