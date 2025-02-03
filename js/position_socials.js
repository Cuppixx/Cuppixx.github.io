function updateDynamicPositions() {

  const nav = document.querySelector('nav');
  const main = document.querySelector('main');

  const navHeight = nav.offsetHeight;

  const mainWidth = main.offsetWidth;
  const mainMarginTop = parseFloat((window.getComputedStyle(main)).marginTop) || 15;

  document.documentElement.style.setProperty('--nav-height', navHeight + 'px');
  document.documentElement.style.setProperty('--main-width', mainWidth + 'px');
  document.documentElement.style.setProperty('--main-margin', mainMarginTop + 'px');
}

window.addEventListener('load', updateDynamicPositions);
window.addEventListener('resize', updateDynamicPositions);
