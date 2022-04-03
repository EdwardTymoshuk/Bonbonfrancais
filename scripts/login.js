//GET ELEMENTS FROM PAGE
const headerPanelRow = document.querySelector('.header-navbar')
const logoutBtn = document.querySelector('#logout-btn')
const loginButton = document.querySelector("#login-button")

//CREATE NAVBAR GREETING DIV ELEMENT AND ADD STYLE
const navbarGreeting = document.createElement('div')
navbarGreeting.classList.add('navbar-greeting')

//GET NAME FROM LOCAL STORAGE AND PUT IT TO NAVBAR GREETING DIV
let localStorageName = localStorage.getItem('localStorageName')
localStorageName && (navbarGreeting.innerHTML = `<p>Привіт, <strong>${localStorageName}</strong>.</p><button id="logout-btn" class="btn btn-danger logout-btn ">Log out</button>`, headerPanelRow.appendChild(navbarGreeting))

//MAIN FUNCTIONS
//login function
const login = async () => {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    const data = {
        'email': username,
        'password': password
    }
    const settings = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTU2OGI3ZGVhNWE4MzQxM2U0M2RjMTIiLCJpYXQiOjE1ODMwODU3NDN9.xX8_VysEZVWlYVLItbV-Azk88ZT772zjyn0PxyZ0x9Q',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(data)
    }
    try {
        await fetch(`https://bonbonfrancais.herokuapp.com/admin-panel/login`, settings).then(res => {
            res.status !== 200 &&
            log('Looks like there was a problem. Status Code: ' + res.status)
            return res.json()
    }).then(data => {
                localStorage.setItem("localStorageName", data.name)
                window.location.href = './index.html'
    })
    } catch (err) {
        return err
    }
    return false
}

//logout function
const logout = () => {
    localStorage.removeItem('localStorageName')
    window.location.href = './index.html'
}

//ADD ONCLICK EVENT LISTENERS TO LOGIN AND LOGOUT BUTTONS
//login button
loginButton.addEventListener("click", (e) => {
    e.preventDefault()
    login()
})

//logout button
logoutBtn && logoutBtn.addEventListener('click', logout)


