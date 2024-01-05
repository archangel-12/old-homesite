const navMenu: HTMLElement | null = document.getElementById('nav-menu');
const navToggle: HTMLElement | null = document.getElementById('nav-toggle');
const navClose: HTMLElement | null = document.getElementById('nav-close');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    if (navMenu) {
      navMenu.classList.add('show-menu');
    }
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener('click', () => {
    if (navMenu) {
      navMenu.classList.remove('show-menu');
    }
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink: NodeListOf<Element> = document.querySelectorAll('.nav__link');

function linkAction() {
  const navMenu: HTMLElement | null = document.getElementById('nav-menu');
  if (navMenu) {
    navMenu.classList.remove('show-menu');
  }
}

navLink.forEach(n => n.addEventListener('click', linkAction));

/*skills*/
const skillsContent: HTMLCollectionOf<Element> = document.getElementsByClassName('skills__content');
const skillsHeader: NodeListOf<Element> = document.querySelectorAll('.skills__header');

function toggleSkills() {
  let itemClass = (this.parentNode as HTMLElement).className;

  for (let i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = 'skills__content skills__close';
  }
  if (itemClass === 'skills__content skills__close') {
    (this.parentNode as HTMLElement).className = 'skills__content skills__open';
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener('click', toggleSkills);
});

/*portfolio swiper*/
let swiperPortfolio = new Swiper('.portfolio__container', {
  cssMode: true,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

/*active link*/
const sections: NodeListOf<HTMLElement> = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      const navLink = document.querySelector(`.nav__menu a[href*=${sectionId}]`);
      if (navLink) {
        navLink.classList.add('active-link');
      }
    } else {
      const navLink = document.querySelector(`.nav__menu a[href*=${sectionId}]`);
      if (navLink) {
        navLink.classList.remove('active-link');
      }
    }
  });
}

window.addEventListener('scroll', scrollActive);

function scrollHeader() {
  const nav = document.getElementById('header');
  if (nav) {
    if (this.scrollY >= 80) {
      nav.classList.add('scroll-header');
    } else {
      nav.classList.remove('scroll-header');
    }
  }
}

window.addEventListener('scroll', scrollHeader);

function scrollUp() {
  const scrollUp = document.getElementById('scroll-up');
  if (this.scrollY >= 560) {
    if (scrollUp) {
      scrollUp.classList.add('show-scroll');
    }
  } else {
    if (scrollUp) {
      scrollUp.classList.remove('show-scroll');
    }
  }
}

window.addEventListener('scroll', scrollUp);

const themeButton: HTMLElement | null = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'uil-sun';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = (): string => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = (): string => themeButton?.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun';

if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
  if (themeButton) {
    themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme);
  }
}

themeButton?.addEventListener('click', () => {
  if (document.body) {
    document.body.classList.toggle(darkTheme);
  }
  if (themeButton) {
    themeButton.classList.toggle(iconTheme);
  }

  localStorage.setItem('selected-theme', getCurrentTheme());
  localStorage.setItem('selected-icon', getCurrentIcon());
});