const form = document.getElementById('signup-form');
const username = document.getElementById('id');
const password = document.getElementById('password');
const repeatPassword = document.getElementById('re_password');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkInputs();
})

function checkInputs() {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const repeatPasswordValue = repeatPassword.value.trim();

    if(usernameValue === ''){
        setErrorFor(username, 'Username cannot be blank');
    }
    else if(usernameValue.length <= 6){
        setErrorFor(username, 'Username must be 6-12 chars');
    }
    else if (usernameValue.length > 12){
        setErrorFor(username, 'Username must be less than 12 chars');
    }
    else if(isValidUsername(usernameValue)){
        setErrorFor(username, 'Username must not contain special chars')
    }

    else{
        setSuccessFor(username)
    }

    if(emailValue === ''){
        setErrorFor(email, 'Email cannot be blank');
    }
    else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Not a valid email');
    }
    else{
        setSuccessFor(email);
    }

    if (passwordValue === '') {
        setErrorFor(password, 'Password cannot be blank');
    } 
    else if(passwordValue.length <= 6){
        setErrorFor(password, 'Password must be 6-18 chars')
    }
    else if(passwordValue.length > 18){
        setErrorFor(password, 'Password must be 6-18 chars')
    }

    else {
        setSuccessFor(password);
    }

    if (repeatPasswordValue === '') {
        setErrorFor(repeatPassword, 'Repeat your password');
    } else if (passwordValue !== repeatPasswordValue) {
        setErrorFor(repeatPassword, 'Passwords does not match');
    } else {
        setSuccessFor(repeatPassword);
    }
}

function setErrorFor(input, message){
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    
    small.innerText = message;

    formControl.className = 'form-group error';
}

function setSuccessFor(input){
    const formControl = input.parentElement;
    formControl.className = 'form-group success';
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function isValidUsername(username){
    return (/[^A-Z0-9a-z\d]/.test(username));
}