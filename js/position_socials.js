function updateDynamicPositions() {

  const nav = document.querySelector('nav');
  const main = document.querySelector('main');

  const navHeight = nav.offsetHeight;
  const mainWidth = main.offsetWidth;

  document.documentElement.style.setProperty('--nav-height', navHeight + 'px');
  document.documentElement.style.setProperty('--main-width', mainWidth + 'px');
}

window.addEventListener('load', updateDynamicPositions);
window.addEventListener('resize', updateDynamicPositions);
