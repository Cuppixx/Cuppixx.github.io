document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('.font-switcher');
    const parent = button.parentElement;

    const defaultFont = getComputedStyle(parent).fontFamily;
    let toggled = false;

    button.addEventListener('click', function() {
      const newFont = button.getAttribute('alt-font');

      if (!toggled) {
        parent.style.fontFamily = newFont;
      } else {
        parent.style.fontFamily = defaultFont;
      }
      toggled = !toggled;
    });
  });
  