"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const registerNow = document.querySelector('.register-now');
const registerForm = document.querySelector('.modal');
registerNow.addEventListener('click', () => {
    registerForm.classList.toggle('active');
});
document.addEventListener('click', e => {
    const target = e.target;
    if (target.classList.contains('overlay-close') || target.matches('.modal.overlay.active')) {
        registerForm.classList.toggle('active');
    }
});
const registerButton = document.querySelector('#register');
registerButton.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const firstName = document.querySelector('#up-first-name');
    const lastName = document.querySelector('#up-last-name');
    const email = document.querySelector('#up-email');
    const password = document.querySelector('#up-password');
    const data = yield fetch(`http://localhost:3000/api/users/email/${email.value}`, {
        method: 'GET'
    });
    data.json()
        .then(res => {
        if (res.exist === false) {
            fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: firstName.value,
                    lastName: lastName.value,
                    email: email.value,
                    password: password.value
                })
            });
            window.location.reload();
        }
        else {
            alert('Please enter a different email address');
        }
    });
}));
const loginButton = document.querySelector('#login');
loginButton.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const email = document.querySelector('#in-email');
    const password = document.querySelector('#in-password');
    const data = yield fetch(`http://localhost:3000/api/users/info/${email.value}/${password.value}`, {
        method: 'GET'
    });
    data.json()
        .then(res => {
        if (res.exist === false) {
            alert('Error email address or password');
        }
        else {
            window.location.reload();
        }
    });
}));
