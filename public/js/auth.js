"use strict";
const registerNow = document.querySelector('.register-now');
const registerForm = document.querySelector('.register-wrapper');
registerNow.addEventListener('click', () => {
    registerForm.classList.toggle('active');
});
document.addEventListener('click', e => {
    const target = e.target;
    if (target.classList.contains('overlay-close') || target.matches('.register-wrapper.overlay.active')) {
        registerForm.classList.toggle('active');
    }
});
