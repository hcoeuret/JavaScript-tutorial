'use strict';

////////////////////////////////////////
// Selection
const nav = document.querySelector('.nav');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const sections = document.querySelectorAll('.section')
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations');
const opContents = document.querySelectorAll('.operations__content');
const header = document.querySelector('.header');
const imgs = document.querySelectorAll('img[data-src]');
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const leftSlide = document.querySelector('.slider__btn--left');
const rightSlide = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');
const dots = document.querySelectorAll('.dots__dot');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((mod, i) => mod.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


//////////////////////////////////////////////////////////////////////
///CODE

btnScrollTo.addEventListener('click', function(e){
  const s1coords = section1.getBoundingClientRect();
  section1.scrollIntoView({behavior: 'smooth'});
})

// Page navigation

document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault();  
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior:'smooth'});
  }
  })

//tabbed component

tabsContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab')

  // Guard clause
  if(!clicked) return;

  // Activate tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // Activate content area
  const curContent = document.querySelector(`.operations__content--${clicked.dataset.tab}`);

  opContents.forEach(el => el.classList.remove('operations__content--active'));
  curContent.classList.add('operations__content--active');
})
  
// Menu fade animation

const handleHover = function(e, opacity){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll(".nav__link");
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach( el => {
      if(el === link){
        return;
      }
      el.style.opacity = this;
    })
    logo.style.opacity = this;
  }
}

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

//sticky navigation

const stickyNav = function(entries){
  const [entry] = entries;
  if(entry.isIntersecting === false){
    nav.classList.add('sticky');
  }
  else{
    nav.classList.remove('sticky');
  }
  
}

const navHeight = nav.getBoundingClientRect().height;

const headerObserver = new IntersectionObserver(stickyNav, {root: null, threshold: 0, rootMargin: `-${navHeight}px`})
headerObserver.observe(header);

//reveal section
const revealSection = function(entries, observer){
  
  //init
  const [entry] = entries;
  entries.forEach(entry =>{
    if(!entry.isIntersecting) return
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  })
  
}

const sectionObserver = new IntersectionObserver(revealSection, {root : null, threshold : 0.15});
sections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section)
});

//lazy loading
const revealImg = function(entries, observer){
  const [entry] = entries;
  if(!entry.isIntersecting) return

  entry.target.src = entry.target.dataset.src

  entry.target.addEventListener('load', function (){
    entry.target.classList.remove("lazy-img");
  })

  observer.unobserve(entry.target);

}

const imgObs = new IntersectionObserver(revealImg,{root: null, threshold : 0, rootMargin: '200px'})
imgs.forEach(img => imgObs.observe(img));

// Slider

const initSlider = function(){
  createDots();
  goToSlide(0);
}

const goToSlide = function(slide){
  slides.forEach((s,i)=> {
    s.style.transform = `translateX(${i * 100 - slide * 100}%)`;
  })
  highlightDot(slide);
}

const nextSlide = function(){
  if(curSlide === slides.length - 1){
    curSlide = 0;
  }
  else {
    curSlide++;
  }
  goToSlide(curSlide);
};

const previousSlide = function(){
  if(curSlide === 0){
    curSlide = slides.length - 1;
  }
  else{
    curSlide--;
  }
  goToSlide(curSlide);
};

const createDots = function(){
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button">`)
  })
}

const highlightDot = function(index){
  document.querySelectorAll('.dots__dot').forEach(d => d.classList.remove('dots__dot--active'));
  document.querySelector(`.dots__dot[data-slide="${index}"]`).classList.add('dots__dot--active');
}

let curSlide = 0;
initSlider();


leftSlide.addEventListener('click', previousSlide);
rightSlide.addEventListener('click', nextSlide);
document.addEventListener('keydown', function(e){
  if(e.key == "ArrowRight" && nextSlide());
  if(e.key == "ArrowLeft" && previousSlide());
});
dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    curSlide = +e.target.dataset.slide;
    goToSlide(curSlide);
  }
});


////////////////////////////////////////////////////////
///////LECTURE

const h1 = document.querySelector('h1');

h1.querySelectorAll('.highlight');





