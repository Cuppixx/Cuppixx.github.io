document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('.font-switcher');
    const paragraph = button.parentElement.querySelector('p');

    const computedStyle = getComputedStyle(paragraph);
    const defaultFont = computedStyle.fontFamily;
    const defaultFontSize = computedStyle.fontSize;
    
    let toggled = false;

    button.addEventListener('click', function() {
        const newFont = button.getAttribute('alt-font');
        const newFontSize = button.getAttribute('alt-font-size');
        
        if (!toggled) {
            paragraph.style.fontFamily = newFont;
            if (newFontSize) {
                paragraph.style.fontSize = newFontSize;
            }
        } else {
            paragraph.style.fontFamily = defaultFont;
            paragraph.style.fontSize = defaultFontSize;
        }
        toggled = !toggled;
    });
});
