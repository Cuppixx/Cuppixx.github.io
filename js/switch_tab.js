document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = button.getAttribute('data-tab');
            showTab(tabName);
        });
    });

    function showTab(tabName) {
        tabContents.forEach((tab) => tab.classList.remove('active'));
        buttons.forEach((btn) => btn.classList.remove('active'));

        const targetTab = document.getElementById(tabName);
        if (targetTab) {
            targetTab.classList.add('active');
        } else {
            console.error(`No tab content found with id: "${tabName}"`);
        }

        const targetButton = document.querySelector(`.tab-button[data-tab="${tabName}"]`);
        if (targetButton) {
            targetButton.classList.add('active');
        } else {
            console.error(`No button found with data-tab: "${tabName}"`);
        }
    }
});
