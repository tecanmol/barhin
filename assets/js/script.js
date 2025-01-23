'use strict';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu
  const menuOpenBtn = document.querySelector('[data-mobile-menu-open-btn]');
  const menuCloseBtn = document.querySelector('[data-mobile-menu-close-btn]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const overlay = document.querySelector('[data-overlay]');

  // Only add listeners if elements exist
  if (menuOpenBtn && menuCloseBtn && mobileMenu && overlay) {
    const menuCloseFn = function() {
      mobileMenu.classList.remove('active');
      overlay.classList.remove('active');
    }

    menuOpenBtn.addEventListener('click', function() {
      mobileMenu.classList.add('active');
      overlay.classList.add('active');
    });

    menuCloseBtn.addEventListener('click', menuCloseFn);
    overlay.addEventListener('click', menuCloseFn);
  }

  // Accordion
  const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
  const accordion = document.querySelectorAll('[data-accordion]');

  if (accordionBtn.length && accordion.length) {
    for (let i = 0; i < accordionBtn.length; i++) {
      accordionBtn[i].addEventListener('click', function() {
        const clickedBtn = this.nextElementSibling.classList.contains('active');

        for (let j = 0; j < accordion.length; j++) {
          if (clickedBtn) break;

          if (accordion[j].classList.contains('active')) {
            accordion[j].classList.remove('active');
            accordionBtn[j].classList.remove('active');
          }
        }

        this.nextElementSibling.classList.toggle('active');
        this.classList.toggle('active');
      });
    }
  }

  // Modal variables
  const modal = document.querySelector('[data-modal]');
  const modalCloseBtn = document.querySelector('[data-modal-close]');
  const modalCloseOverlay = document.querySelector('[data-modal-overlay]');
  const modalOpenBtn = document.querySelector('[data-modal-open-btn]');

  // Form switch variables
  const loginForm = document.querySelector('#login-form');
  const signupForm = document.querySelector('#signup-form');
  const switchFormBtns = document.querySelectorAll('.switch-form');

  // Modal function
  const modalCloseFunc = function () {
    modal.classList.remove('active');
  }

  // Modal eventListeners
  modalOpenBtn.addEventListener('click', function () {
    modal.classList.add('active');
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
  });

  modalCloseOverlay.addEventListener('click', modalCloseFunc);
  modalCloseBtn.addEventListener('click', modalCloseFunc);

  // Switch between login and signup forms
  switchFormBtns.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const formToShow = this.dataset.switch;
      if (formToShow === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
      } else {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
      }
    });
  });

  // Add null checks for modal elements
  if (modal && modalCloseBtn) {
    modalCloseBtn.addEventListener('click', function() {
      modal.classList.add('closed');
    });
  }
});