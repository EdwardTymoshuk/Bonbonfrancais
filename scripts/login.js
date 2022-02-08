const { log } = console

const loginButton = document.querySelector("#login-button")

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

