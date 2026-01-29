const fullName = document.getElementById('name')
const email = document.getElementById('email')
const phone = document.getElementById('phone')
const city = document.getElementById('city')
const password = document.getElementById('password')
const confirmPassword = document.getElementById('confirmPassword')
const regForm = document.getElementById('regForm')
const showPasswordBtn = document.getElementById('showPasswordBtn')
let users = JSON.parse(localStorage.getItem('users'))
const loginForm = document.getElementById('loginForm')

//toggle for show password
if (showPasswordBtn) {
    showPasswordBtn.addEventListener('click', () => {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password'
        password.setAttribute("type", type)
    })
}


//email validation
if (email) {
    email.addEventListener('change', () => {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const errMsg = document.querySelector('#emailErr')
        if (!email.value.match(validRegex)) {
            errMsg.style.color = 'red'
            errMsg.textContent = 'Invalid Email Format'
            return
        } else {
            errMsg.style.color = 'green'
            errMsg.innerHTML = 'Looks Good!'
        }
    })
}


//phone validation
if (phone) {
    phone.addEventListener('change', () => {
        const errMsg = document.querySelector('#phoneErr')
        if (phone.value.length !== 10) {
            errMsg.style.color = 'red'
            errMsg.textContent = 'Phone number should be 10 numbers'
            return
        } else {
            errMsg.style.color = 'green'
            errMsg.innerHTML = 'Looks Good!'
        }
    })

}

//city validation
if (city) {
    city.addEventListener('change', () => {
        const alphaPattern = /^[A-Za-z]+$/;
        const errMsg = document.querySelector('#cityErr')
        if (!city.value.match(alphaPattern)) {
            errMsg.style.color = 'red'
            errMsg.textContent = 'City must contain only alphabets'
            return
        } else {
            errMsg.style.color = 'green'
            errMsg.innerHTML = 'Looks Good!'
        }
    })
}

//password validation
if (password) {
    password.addEventListener('change', () => {
        const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        const errMsg = document.querySelector('#passwordErr')
        if (!password.value.match(pattern)) {
            errMsg.style.color = 'red'
            errMsg.textContent = 'Password must be at least 8 characters and include letters and numbers'
            return
        }
        else {
            errMsg.style.color = 'green'
            errMsg.innerHTML = 'Looks Good!'
        }
    })
}


if (confirmPassword) {
    confirmPassword.addEventListener('change', () => {
        const errMsg = document.querySelector('#passwordErr')
        if (password.value !== confirmPassword.value) {
            errMsg.style.color = 'red'
            errMsg.textContent = 'Password does not match'
            return
        }
        else {
            errMsg.style.color = 'green'
            errMsg.innerHTML = 'Looks Good!'
        }
    })
}

if (regForm) {
    regForm.addEventListener('submit', (e) => {
        e.preventDefault()
        if (fullName.value.trim() === '' || email.value.trim() === '' || phone.value.trim() === '' || city.value.trim() === '' || password.value.trim() === '') {
            alert('All Fields are Mandatory')
            return
        }

        let existingUser = users.some(user => user.email === email.value)
        console.log(existingUser)
        newUsers = {
            id: Date.now(),
            name: fullName.value,
            email: email.value,
            phone: phone.value,
            city: city.value,
            password: password.value
        }
        if (existingUser === true) {
            alert('User already Registered with this email')
            return
        }
        users.push(newUsers)
        localStorage.setItem('users', JSON.stringify(users))
        // alert('User registered successfully')
        window.location.href = 'SignIn.html'
        //   console.log(users)


    })
}


//login
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {

        e.preventDefault()
        const loginEmail = document.getElementById('loginEmail').value
        const loginPassword = document.getElementById('loginPassword').value
        const emailErr = document.getElementById('emailErr')
        const passErr = document.getElementById('passErr')
        if (loginEmail.trim() === '' || loginPassword.trim() === '') {
            return alert('Username or password is missing')
        }
        const registeredUsers = JSON.parse(localStorage.getItem('users'))
        // console.log(registeredUsers)
        let loginUser = registeredUsers.find(user => user.email === loginEmail)
        if(loginUser === undefined)
        {
            emailErr.style.color = 'red'
            emailErr.textContent = 'Email not Found'
            return
        }
        let isValid = loginUser.password == loginPassword
        // console.log(isValid)
        if(isValid == false)
        {
            passErr.style.color = 'red'
            passErr.textContent = 'Incorrect Password'
            return
        }
        let currentUser = loginUser
        localStorage.setItem('currentUser',JSON.stringify(currentUser))
        window.location.href = 'https://jahanakhaleel04-code.github.io/Module-1-Assignment/'
    })
}
