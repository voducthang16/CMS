const registerNow = document.querySelector('.register-now') as HTMLElement;
const registerForm = document.querySelector('.modal') as HTMLElement;
registerNow.addEventListener('click', () => {
    registerForm.classList.toggle('active');
})

document.addEventListener('click', e => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('overlay-close') || target.matches('.modal.overlay.active')) {
        registerForm.classList.toggle('active');
    }
})

const registerButton = document.querySelector('#register') as HTMLButtonElement;
registerButton.addEventListener('click', async e => {
    e.preventDefault();
    const firstName = <HTMLInputElement>document.querySelector('#up-first-name');
    const lastName = <HTMLInputElement>document.querySelector('#up-last-name');
    const email = <HTMLInputElement>document.querySelector('#up-email');
    const password = <HTMLInputElement>document.querySelector('#up-password');
    const data = await fetch(`http://localhost:3000/api/users/email/${email.value}`, {
        method: 'GET'
    })
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
                })
                window.location.reload();
            } else {
                alert('Please enter a different email address');
            }
        })
    
})

const loginButton = document.querySelector('#login') as HTMLElement;
loginButton.addEventListener('click', async e => {
    e.preventDefault();
    const email = <HTMLInputElement>document.querySelector('#in-email');
    const password = <HTMLInputElement>document.querySelector('#in-password');
    const data = await fetch(`http://localhost:3000/api/users/info/${email.value}/${password.value}`, {
        method: 'GET'
    })
    data.json()
        .then(res => {
            if (res.exist === false) {
                alert('Error email address or password');
            } else {
                window.location.reload();
            }
        })
})