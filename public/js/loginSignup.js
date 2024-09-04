const loginForm = $('#login-form');
const signupForm = $('#signup-form');

loginForm.on('submit', (event) => {
    event.preventDefault();
    const usernameInput = event.target.querySelector('#username-email');
    const passwordInput = event.target.querySelector('#password');
    const errorDiv = event.target.querySelector('#error');
    usernameInput.classList.remove('border');
    passwordInput.classList.remove('border');
    const data = {
        userEmail: usernameInput.value,
        password: passwordInput.value,
    };

    if(!data.userEmail) {
        usernameInput.classList.add('border');
        usernameInput.classList.add('border-3');
        usernameInput.classList.add('border-warning');
        errorDiv.innerHTML = "You must insert your username or email";
        return;
    }
    if(!data.password) {
        passwordInput.classList.add('border');
        passwordInput.classList.add('border-3');
        passwordInput.classList.add('border-warning');
        errorDiv.innerHTML = "You must insert your password";
        return;
    }
    if(data.password.length < 8) {
        passwordInput.classList.add('border');
        passwordInput.classList.add('border-3');
        passwordInput.classList.add('border-warning');
        errorDiv.innerHTML = "Password has to be at least 8 characters long";
        return;
    }

    $.ajax({
        method: 'get',
        url: '/user',
        data: data,
        success: function(response) {
            window.location.href = response.redirectUrl;
        },
        error: function(response) {
            console.log(response);
            event.target.querySelector('#error').innerHTML = response.responseText;
        }
    })
})

signupForm.on('submit', (event) => {
    event.preventDefault();
    const emailInput = event.target.querySelector('#email');
    const usernameInput = event.target.querySelector('#username');
    const passwordInput = event.target.querySelector('#password');
    const repeatedPasswordInput = event.target.querySelector('#repeated_password');
    const errorDiv = event.target.querySelector('#error');


    emailInput.classList.remove('border-warning');
    usernameInput.classList.remove('border-warning');
    passwordInput.classList.remove('border-warning');
    repeatedPasswordInput.classList.remove('border-warning');
    
    const data = {
        email: emailInput.value,
        username: usernameInput.value,
        password: passwordInput.value,
        repeatedPassword: repeatedPasswordInput.value,
    };
    if(!data.email) {
        emailInput.classList.add('border');
        emailInput.classList.add('border-3');
        emailInput.classList.add('border-warning');
        errorDiv.innerHTML = "You must insert an email";
        return;
    }
    if(!data.username) {
        usernameInput.classList.add('border');
        usernameInput.classList.add('border-3');
        usernameInput.classList.add('border-warning');
        errorDiv.innerHTML = "You must insert a username";
        return;
    }
    if(!data.password || data.password.length < 8) {
        passwordInput.classList.add('border');
        passwordInput.classList.add('border-3');
        passwordInput.classList.add('border-warning');
        errorDiv.innerHTML = "Password has to be at least 8 characters long";
        return;
    }
    if(!data.repeatedPassword || data.password != data.repeatedPassword) {
        repeatedPasswordInput.classList.add('border');
        repeatedPasswordInput.classList.add('border-3');
        repeatedPasswordInput.classList.add('border-warning');
        errorDiv.innerHTML = "Passwords do not match";
        return;
    }

    $.ajax({
        method: 'post',
        url: '/user',
        data: data,
        success: function(response) {
            window.location.href = response.redirectUrl;
        },
        error: function(response) {
            event.target.querySelector('#error').innerHTML = response.responseText;
        }
    })
})