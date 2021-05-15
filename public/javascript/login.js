const { response } = require("express");
const { post } = require("../../controllers");

async function signupFormHandler(event) {
    event.preventDefault();
    const username = document.querySelector('#username-signup').nodeValue.trim();
    const email = document.querySelector('#email-signup').nodeValue.trim();
    const password = document.querySelector('#password-signup').nodeValue.trim();

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: post,
            body: JSON.stringify({
                username,
                email,
                password,

            }),
            headers: { 'Content-Type': 'application/json' }
        });

        // console.log(response);
        if (response.ok) {
            console.log('Success');
        }
        else {
            alert(response.statusText);
        }

    }
}

async function loginFormHandler(event) {
    const email = document.querySelector('#email-login').nodeValue.trim();
    const password = document.querySelector('#password-login').nodeValue.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.replace('/');
        }
        else {
            alert(response.statusText);
        }
    }
}
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);