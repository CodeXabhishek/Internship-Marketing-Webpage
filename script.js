'use strict';

///////////////////////////////////////
// Modal window

/**@description: For layout of new apply form */
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
//---------------------------------------------------------------------------

const header = document.querySelector('.header');

/**@description: For creating and removing cookie message */
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookie message for improved functionality and analytics. <button class="btn--close-cookie">Got it!</button>';

header.append(message);
message.style.backgroundColor = '#37383d';
message.style.width = '120%'; //inline styles=manually set ourselves
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });
//------------------------------------------------------------------

document.documentElement.style.setProperty('--color-primary', 'red');

const logo = document.querySelector('.nav__logo');

logo.alt = 'Beautiful minimalist logo';

logo.setAttribute('company', 'IMF');

const link = document.querySelector('.twitter-link');

const link1 = document.querySelector('.nav__link--btn');
//----------------------------------------------------------------

/**@description: For scrolling to section-1 */
const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScroll.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});
//----------------------------------------------------

/**@description: Scrolling to sections when click on navigation bar features */
document.querySelector('.nav').addEventListener('click', function (e) {});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
//-----------------------------------------------------

const h1 = document.querySelector('h1');

h1.children[2].style.color = 'green';
h1.firstElementChild.style.color = 'white';

h1.closest('.header').style.background = 'var(--color-primary-darker)'; //select the  parent element from top
h1.closest('h1').style.background = 'rgb(22,122,188)';

[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.75)';
});

/**@description: For selecting different tabbed components */
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
//--------------------------------------------------------------------------

/**@description: Changing opacity of nav bar features when hover over it */
const nav = document.querySelector('.nav');
const mouseHover = function (el, opacity) {
  if (el.classList.contains('nav__link')) {
    const link = el;
    // console.log(link)
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    // console.log(sibling)
    const logo = link.closest('.nav').querySelector('img');
    sibling.forEach(el => {
      if (el !== link) {
        el.style.opacity = opacity;
        logo.style.opacity = opacity;
      }
    });
  }
};
nav.addEventListener('mouseover', function (e) {
  mouseHover(e.target, 0.1);
});
nav.addEventListener('mouseout', function (e) {
  mouseHover(e.target, 1.0);
});
//------------------------------------------------------------------------

/**@description: Adding sticky navigation bar */
const headerHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
});
//------------------------------------------------------------------------

/**@description: Revealing sections and laoding images during scrolling */
headerObserver.observe(header);

const allSection = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const selectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});
allSection.forEach(function (sec) {
  selectionObserver.observe(sec);
  sec.classList.add('section--hidden');
});

const imgTarget = document.querySelectorAll('img[data-src]');
const laodingImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(laodingImg, {
  root: null,
  threshold: 0,
  // rootMargin:'-200px'
});
imgTarget.forEach(img => imgObserver.observe(img));
//-------------------------------------------------------------------

/**@description: Selecting slider components */
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
let curSlide = 0;

const maxSlide = slides.length;
console.log(maxSlide);
const gotoSlide = function (sl) {
  console.log(sl);
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - sl)}%)`;
  });
};
gotoSlide(0);
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else curSlide++;
  gotoSlide(curSlide);
  activeDOt(curSlide);
};
const preSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else curSlide--;
  gotoSlide(curSlide);
  activeDOt(curSlide);
};
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', preSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') nextSlide();
  e.key === 'ArrowLeft' && preSlide(); //short circuiting
});
const dotContainer = document.querySelector('.dots');
const dotss = function () {
  slides.forEach(function (s, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button> `
    );
  });
};
dotss();

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    gotoSlide(slide);
    activeDOt(slide);
  }
});
const activeDOt = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
activeDOt(0);
//--------------------------------------------------------------------------------

// document.addEventListener('DOMContentLoaded', function (e) {
//   console.log(e);
// }); //function is loaded when html is parsed and js and DOM tree content is fully passed,in this we can execute a code when dom is fully loaded
// window.addEventListener('load', function (e) {
//   // console.log(e)
// });
window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  // console.log(e)
  e.returnValue = ' ';
});
