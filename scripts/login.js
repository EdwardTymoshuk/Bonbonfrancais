const { log } = console

const loginButton = document.querySelector("#login-button")

//get name from local storage and refirect to index.html
let localStorageName = localStorage.getItem('localStorageName')
localStorageName != null && (window.location.href = '../index.html' )
log(localStorageName)

//set login name
const headerPanelRow = document.querySelector('#header-languages')
const divEl = document.createElement('div')
localStorage.localStorageName != null && headerPanelRow.appendChild(divEl)
divEl.innerHTML = `<p>Привіт, <strong>${localStorage.localStorageName}</strong>.</p>`

//add onclick event listener
loginButton.addEventListener("click", (e) => {
    e.preventDefault()
    login()
})

//login function
const login = async () => {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    const data = {
        'email': username,
        'password': password
    }
    log(data)
    const settings = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTU2OGI3ZGVhNWE4MzQxM2U0M2RjMTIiLCJpYXQiOjE1ODMwODU3NDN9.xX8_VysEZVWlYVLItbV-Azk88ZT772zjyn0PxyZ0x9Q'
        },
        body: JSON.stringify(data)
    }
    try {
        await fetch(`http://localhost:3001/admin-panel/login`, settings).then(res => {
            res.status !== 200 ?
            log('Looks like there was a problem. Status Code: ' + res.status) :
            // res.then(data => {
            //     localStorage.setItem("localStorageName", data.name)
            //     log(localStorage)
            //     window.location.href = './index.html';
            // })
            log(res.JSON.stringify(data))
            
    }
        )
    } catch (err) {
        log(err)
    }
    return false
}

