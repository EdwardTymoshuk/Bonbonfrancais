//GET ELEMENTS FROM PAGE
//Header
const headerPanelRow = document.querySelector('.header-navbar')
const headerEl = document.querySelector('#header-block')
const headerBlock = document.querySelector('#header-block')
const headerPanel = document.querySelector('#header-panel')
const langCheckBox = document.querySelector('#lang-checkbox')
//Contact page
const contactPage = document.querySelector('#contact')
const contactForm = document.querySelector('#contact-form')
const contactMessage = document.querySelector('#contact-message')
//Lessons booking buttons
const bookLessonBtns = document.querySelectorAll('.book-lesson-btn')
const firstBlockBtn = document.querySelector('#first-block-btn')
const secondBlockBtn = document.querySelector('#second-block-btn')
const thirdBlockBtn = document.querySelector('#third-block-btn')

//SWITCH WEB PAGE LANGUAGE
!!langCheckBox.checked ? localStorage.setItem('lang', 'en') : localStorage.setItem('lang', 'ua')
langCheckBox.addEventListener('change', (e) => {
 !e.currentTarget.checked ? (localStorage.setItem('lang', 'ua'), window.location.href = '/index.html') : (localStorage.setItem('lang', 'en'),  window.location.href = '/index-en.html') 
})

//GET PAGE LANGUAGE FROM LOCAL STORAGE
let pageLang = localStorage.getItem('lang')
const localStorageName = localStorage.getItem('localStorageName')

//CREATE NAVBAR GREETING DIV ELEMENT AND ADD STYLE
const navbarGreeting = document.createElement('div')
navbarGreeting.classList.add('navbar-greeting')

//PUT LOCALSTORAGENAME TO NAVBAR GREETING DIV
!!localStorageName && (navbarGreeting.innerHTML = `<p>Привіт, <strong>${localStorageName}</strong>.</p><button id="logout-btn" class="btn btn-danger logout-btn" onclick="logout()">Log out</button>`, headerPanelRow.appendChild(navbarGreeting))

//HEADER TRANSFORM
window.addEventListener('scroll', function () {
    for (let i = 0; i <= 100; i += 10) {
        if (pageYOffset >= document.documentElement.clientHeight / (100 / i)) {
            headerEl.style.background = `rgba(243, 238, 238, 0.${i / 10})`
            headerPanel.style.opacity = `.${90 - i}`
        }
        if (pageYOffset >= document.documentElement.clientHeight - headerEl.offsetHeight) {
            headerEl.style.background = `rgba(243, 238, 238, 1)`
        }
    }
    for (let i = 0; i <= headerPanel.offsetHeight; i += 10) {
        if (pageYOffset >= document.documentElement.clientHeight / (100 / i)) {
            headerBlock.style.top = `-${i}px`
        }
    }
})

//ADD EVENT LISTENERS TO BUTTONS
//Order trial lesson
bookLessonBtns.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault()
        contactMessage.value = `${pageLang === 'ua' ? `Доброго дня, я б хотів(-ла) замовити урок французької.` : `Hello. I'd like to book a lesson.`}`
        contactForm.scrollIntoView()
    })
})

//Order first price block
firstBlockBtn.addEventListener('click', (e) => {
    e.preventDefault()
    contactMessage.value = `${pageLang === 'ua' ? `Доброго дня, я б хотів(-ла) замовити курс "Загальна (розмовна) французька".` : `Hello. I'd like to book a cours "Common (speeking) french".`}`
    contactForm.scrollIntoView()
})

//Order second price block
secondBlockBtn.addEventListener('click', (e) => {
    e.preventDefault()
    contactMessage.value = `${pageLang === 'ua' ? `Доброго дня, я б хотів(-ла) замовити курс "Підготовка до іспитів DELF/DALF".` : `Hello. I'd like to book a cours "Prepearing to DELF/DALF exams".`}`
    contactForm.scrollIntoView()
})

//Order third price block
thirdBlockBtn.addEventListener('click', (e) => {
    e.preventDefault()
    contactMessage.value = `${pageLang === 'ua' ? `Доброго дня, я б хотів(-ла) замовити курс "Ділова французька".` : `Hello. I'd like to book a cours "Business french".`}`
    contactForm.scrollIntoView()
})

//SWITCH BUTTON ACTIVITY AND SHOW LOAD PICTURE
const loadingBtnToggle = (boolean, btn) => {
    btn.classList.toggle('btn-loading')
    boolean === true ?
        btn.setAttribute("disabled", "true") :
        btn.removeAttribute("disabled")
}

//LOGOUT FUNCTION 
const logout = () => {
    localStorage.removeItem('localStorageName')
    window.location.href = './index.html'
}

//ADD SUCCESSFUL MODAL WINDOW
const acceptSuccessfulModal = (pageElement) => {
    let modalWindow = document.createElement('div')
    modalWindow.setAttribute('id', 'thanks-container')
    modalWindow.classList.add('container', 'openWindow', 'thanks-container')
    modalWindow.innerHTML = `
    <div class="thanks-modal" id="thanks-modal">
    <button id="close-thanks-modal-btn" class="close" onclick="removeElement('thanks-container')">✖</button>
    <i class="fas fa-check-circle"></i>
    ${pageElement == feedbackContainer ? 
        pageLang === 'ua' ? 
        `<p>Твій відгук успішно додано. Гарного дня!</p>` :
        `<p>Your feedback was succesfuly added. Have a nice day!</p>` :
        pageLang === 'ua' ? 
         `<p>Твоє повідомлення успішно відправлено. Гарного дня!</p>` :
         `<p>Your message was succesfuly sent. Have a nice day!</p>`
        }
    <button id="great-thanks-modal-btn" class="btn feedback-btn" onclick="removeElement('thanks-container')">${ pageLang === 'ua' ? 'Чудово!' : 'Greate!'}</button>
  </div>
    `
    pageElement.appendChild(modalWindow)
}

//REMOVE SUCCESSFUL MODAL WINDOW
const removeElement = (el) => {
    document.querySelector(`#${el}`).classList.remove('openWindow')
    document.querySelector(`#${el}`).classList.add('closeWindow')
    setTimeout(() => document.querySelector(`#${el}`).remove(), 750)
}

//VALIDATION
//Email validation
const validateEmail = (emailEl) => {
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailEl.value) ? (emailEl.classList.add('input-error'), emailEl.nextSibling.nextSibling.innerHTML = `${pageLang === 'ua' ? `Будь ласка введіть email адресу у правильному форматі "example@example.com"` : `Please enter an email address in the correct format "example@example.com"`}`, validatedFeedbackEmail = false) : validatedFeedbackEmail = true
}

//Input validation
const validateInput = (input, fieldName, min, max) => {
    let validated
    !input.value ? (input.classList.add('input-error'), input.nextElementSibling.innerHTML = `${pageLang === 'ua' ? `Поле ${fieldName} є обов'язковим` : `The field ${fieldName} is required.`}`) :
        input.value.length < min ? (input.classList.add('input-error'), input.nextElementSibling.innerHTML = `${pageLang === 'ua' ? `Поле ${fieldName} не може бути коротше, ніж ${min} символи(-ів)` : `Field ${fieldName} must be at least ${min} characters`}`) :
            input.value.length > max ? (input.classList.add('input-error'), input.nextElementSibling.innerHTML = `${pageLang === 'ua' ? `Поле ${fieldName} не може бути довше, ніж ${max} символи(-ів)` : `Field ${fieldName} can't be konger than ${max} characters`}`) : (input.classList.remove('input-error'), input.nextSibling.nextSibling.innerHTML = ``, validated = true)
    return validated
}

//BACK TO TOP BUTTON
const backToTopBtn = document.querySelector('#back-to-to-btn')
const homePage = document.querySelector('#home')
backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault()
    homePage.scrollIntoView()
})