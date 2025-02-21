document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('.font-switcher');
    const paragraph = button.parentElement.querySelector('p');
    
    const defaultFont = getComputedStyle(paragraph).fontFamily;
    let toggled = false;

    button.addEventListener('click', function() {
        const newFont = button.getAttribute('alt-font');
        if (!toggled) {
            paragraph.style.fontFamily = newFont;
        } else {
            paragraph.style.fontFamily = defaultFont;
        }
        toggled = !toggled;
    });
});
