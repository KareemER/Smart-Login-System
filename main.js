var loginEmailInput = document.querySelector('#loginEmail')
var loginPasswordInput = document.querySelector('#loginPassword')
var signUpNameInput = document.querySelector('#signUpName')
var signUpEmailInput = document.querySelector('#signUpEmail')
var signUpPasswordInput = document.querySelector('#signUpPassword')

var usersLog ;
if (localStorage.getItem('usersInfo') == null) {
    usersLog = []
} else {
    usersLog = JSON.parse(localStorage.getItem('usersInfo'))
}

function isSignUpEmpty() {
    if (signUpNameInput.value == "" || signUpEmailInput.value == "" || signUpPasswordInput.value == "") {
        return true ;
    } else {
        return false ;
    }
}

function isLoginEmpty() {
    if (loginEmailInput.value == "" || loginPasswordInput.value == "" ) {
        return true ;
    } else {
        return false ;
    }
}

function isEmailExists() {
    for (var i = 0; i < usersLog.length; i++) {
        if (usersLog[i].userEmail.toLowerCase() == signUpEmailInput.value.toLowerCase()) {
            return true ;
        }
    }
}

function signUp() {
    if ( isSignUpEmpty() ){
        document.querySelector('#userMessage').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
    }
    if ( isEmailExists() ){
        document.querySelector('#userMessage').innerHTML = '<span class="text-danger m-3">email already exists</span>'
    }
    else {
        var newUser = {
            userName : signUpNameInput.value , 
            userEmail : signUpEmailInput.value , 
            userPassword : signUpPasswordInput.value
        }
            usersLog.push (newUser) ;
            localStorage.setItem('usersInfo', JSON.stringify(usersLog))
            document.querySelector('#userMessage').innerHTML = '<span class="text-success m-3">Success</span>'
    }
}


function login(){
    if ( isLoginEmpty()){
           document.querySelector('#userMessage').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
    }
    var email = loginEmailInput.value
    var password = loginPasswordInput.value
    for (var i = 0; i < usersLog.length; i++) {
        if (usersLog[i].userEmailemail.toLowerCase() == email.toLowerCase() && usersLog[i].userPassword.toLowerCase() == password.toLowerCase()) {
            sessionStorage.setItem('sessionUsername', usersLog[i].userEmail)
            document.querySelector('#welcomeUser').classList.remove('d-none')
            document.querySelector('#welcomeMessage').innerHTML = `<p class="fw-bolder text-white shadow-lg">Welcome ${usersLog[i].userName} </p>`
            document.querySelector('section').classList.add('d-none')
        } else {
            document.querySelector('#userMessage').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
        }
    }
}

function logout(){
    sessionStorage.removeItem('sessionUsername');
}