const registerNow = document.querySelector('.register-now') as HTMLElement;
const registerForm = document.querySelector('.register-wrapper') as HTMLElement;
registerNow.addEventListener('click', () => {
    registerForm.classList.toggle('active');
})

document.addEventListener('click', e => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('overlay-close') || target.matches('.register-wrapper.overlay.active')) {
        registerForm.classList.toggle('active');
    }
})