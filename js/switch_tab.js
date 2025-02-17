document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.tab-group').forEach(group => {
        const buttons = group.querySelectorAll('.tab-button');
        const tabContents = group.querySelectorAll('.tab-content');
  
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                const tabName = button.getAttribute('data-tab');
        
                tabContents.forEach(tab => tab.classList.remove('active'));
                buttons.forEach(btn => btn.classList.remove('active'));
        
                const targetTab = group.querySelector(`#${tabName}`);
                if (targetTab) {
                    targetTab.classList.add('active');
                } else {
                    console.error(`No tab content found with id: "${tabName}" in this group`);
                }
        
                const targetButton = group.querySelector(`.tab-button[data-tab="${tabName}"]`);
                if (targetButton) {
                    targetButton.classList.add('active');
                } else {
                    console.error(`No button found with data-tab: "${tabName}" in this group`);
                }
            });
        });
    });
});
