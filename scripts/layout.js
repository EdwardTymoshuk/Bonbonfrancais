//SWITCH WEB PAGE LANGUAGE 
const lang = document.querySelector('#lang-checkbox')
lang.addEventListener('change', () => {
    !!lang.checked ? localStorage.setItem('lang', 'en') : localStorage.setItem('lang', 'ua')
    !!localStorage.getItem('lang') && localStorage.getItem('lang') === 'en' ? (lang.checked = true, window.location.href = 'en/index.html')  : (lang.checked = false, window.location.href = '../index.html')
})

//HEADER TRANSFORM
window.addEventListener('scroll', function () {
    let headerEl = document.getElementById('header-block')
    let headerBlock = document.getElementById('header-block')
    let headerPanel = document.getElementById('header-panel')
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

//PAGES BUTTONS
//free lesson button
const contactForm = document.querySelector('#contact-form')
const contactMessage = document.querySelector('#contact-message')
const bookLessonBtns = document.querySelectorAll('.book-lesson-btn')

bookLessonBtns.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault()
        contactMessage.value = `${pageLang === 'ua' ? `Доброго дня, я б хотів(-ла) замовити урок французької.` : `Hello. I'd like to book a lesson.`}`
        contactForm.scrollIntoView()
    })
})

//Order lessons buttons
const firstBlockBtn = document.querySelector('#first-block-btn')
const secondBlockBtn = document.querySelector('#second-block-btn')
const thirdBlockBtn = document.querySelector('#third-block-btn')
//order first price block
firstBlockBtn.addEventListener('click', (e) => {
    e.preventDefault()
    contactMessage.value = `${pageLang === 'ua' ? `Доброго дня, я б хотів(-ла) замовити курс "Загальна (розмовна) французька".` : `Hello. I'd like to book a cours "Common (speeking) french".`}`
    contactForm.scrollIntoView()
})
//order second price block
secondBlockBtn.addEventListener('click', (e) => {
    e.preventDefault()
    contactMessage.value = `${pageLang === 'ua' ? `Доброго дня, я б хотів(-ла) замовити курс "Підготовка до іспитів DELF/DALF".` : `Hello. I'd like to book a cours "Prepearing to DELF/DALF exams".`}`
    contactForm.scrollIntoView()
})
//order third price block
thirdBlockBtn.addEventListener('click', (e) => {
    e.preventDefault()
    contactMessage.value = `${pageLang === 'ua' ? `Доброго дня, я б хотів(-ла) замовити курс "Ділова французька".` : `Hello. I'd like to book a cours "Business french".`}`
    contactForm.scrollIntoView()
})


const sendContactButton = document.querySelector('#send-contact-button')
const contactPage = document.querySelector('#contact')

const acceptMail = () => {
    let modalWindow = document.createElement('div')
    modalWindow.setAttribute('id', 'thanks-container')
    modalWindow.classList.add('container', 'openWindow', 'thanks-container')
    modalWindow.innerHTML = `
    <div class="thanks-modal" id="thanks-modal">
    <button id="close-thanks-modal-btn" class="close" onclick="removeElement('thanks-container')">✖</button>
    <i class="fas fa-check-circle"></i>
    <p>Твоє повідомлення успішно відправлено. Гарного дня!</p>
    <button id="great-thanks-modal-btn" class="btn feedback-btn" onclick="removeElement('thanks-container')">Чудово!</button>
  </div>
    `
    contactPage.appendChild(modalWindow)
  }

//SWITCH BUTTON ACTIVITY AND SHOW LOAD PICTURE
const loadingBtnToggle = (boolean, btn) => {
    btn.classList.toggle('btn-loading')
    boolean === true ?
        btn.setAttribute("disabled", "true") :
        btn.removeAttribute("disabled")
}

// BACK TO TOP
let btt = document.querySelector('#btt')
let home = document.querySelector('#home')
btt.addEventListener('click', (e) => {
    e.preventDefault()
    home.scrollIntoView()
})

//email validation
const validateEmail = (emailEl) => {
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailEl.value) ? (emailEl.classList.add('input-error'), emailEl.nextSibling.nextSibling.innerHTML = `Будь ласка введіть email адресу у правильному форматі "example@example.com"`, validatedFeedbackEmail = false) : validatedFeedbackEmail = true
  }

//input validation
const validateInput = (input, fieldName, min, max) => {
    let validated
    !input.value ? (input.classList.add('input-error'), input.nextElementSibling.innerHTML = `Поле ${fieldName} є обов'язковим`) :
      input.value.length < min ? (input.classList.add('input-error'), input.nextElementSibling.innerHTML = `Поле ${fieldName} не може бути коротше, ніж ${min} символи(-ів)`) :
        input.value.length > max ? (input.classList.add('input-error'), input.nextElementSibling.innerHTML = `Поле ${fieldName} не може бути довше, ніж ${max} символи(-ів)`) : (input.classList.remove('input-error'), input.nextSibling.nextSibling.innerHTML = ``, validated = true)
    return validated
  }

let arr = document.querySelectorAll('[id^="contact"]');
// let txt = document.getElementsByTagName('textarea');

// [...arr].map(v => !!v.name && (v.name !== 'g-recaptcha-response' && v.nodeName === 'INPUT' ? console.log(v.previousElementSibling.innerHTML) : console.log(v.name) ))
[...arr].map(v => !!v.name &&console.log(v.type))
