const updateDynamicPositions = () => {
  const nav = document.querySelector('nav');
  const main = document.querySelector('main');
  const socials = document.querySelector('.socials');

  const navHeight = nav.offsetHeight;
  const mainWidth = main.offsetWidth;
  const mainStyles = window.getComputedStyle(main);
  const mainMarginTop = parseFloat(mainStyles.marginTop) || 0;
  const mainPaddingTop = parseFloat(mainStyles.paddingTop) || 0;
  const socialsWidth = socials.offsetWidth;

  document.documentElement.style.setProperty('--nav-height', `${navHeight}px`);
  document.documentElement.style.setProperty('--main-width', `${mainWidth}px`);
  document.documentElement.style.setProperty('--main-margin-top', `${mainMarginTop}px`);
  document.documentElement.style.setProperty('--main-padding', `${mainPaddingTop}px`);
  document.documentElement.style.setProperty('--socials-width', `${socialsWidth}px`);
};

window.addEventListener('DOMContentLoaded', updateDynamicPositions);
window.addEventListener('load', updateDynamicPositions);
window.addEventListener('resize', updateDynamicPositions);
window.addEventListener('orientationchange', updateDynamicPositions);
