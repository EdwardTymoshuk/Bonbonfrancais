
//GET PAGE ELEMENTS
const feedbackContainer = document.querySelector('#feedback-articles')
const feedbackModal = document.querySelector('#feedback-modal')
const modalForm = document.querySelector('#modal-form')
const firstNameEl = document.querySelector('#feedback-firstName')
const countryEl = document.querySelector('#feedback-country')
const emailEl = document.querySelector('#feedback-email')
const feedbackEl = document.querySelector('#feedback-textarea')
const sendButton = document.querySelector('#send-feedback-button')
const feedbackArticles = document.querySelector('#feedback-articles')
const feedbackCaptcha = document.querySelector('#feedback-captcha')


//DEFINE GLOBAL VARIABLES
let validatedFirstName, validatedEmail, validatedCountry, validatedFeedbackText, validatedCaptcha

//ADD ATTRIBUTES TO PAGE ELLEMENTS
feedbackCaptcha.setAttribute('data-callback', 'validateFeedbackCaptcha')
feedbackCaptcha.setAttribute('data-expired-callback', 'grecaptcha.reset()')


//HELPFULL FUNCTIONS
//hide modal window
const hideModalWindow = (modal) => {
  $(`#${modal}`).modal('hide')
}
//remove element from page
const removeElement = (el) => {
  document.querySelector(`#${el}`).classList.remove('openWindow')
  document.querySelector(`#${el}`).classList.add('closeWindow')
  setTimeout(() => document.querySelector(`#${el}`).remove(), 750)
}

const acceptModal = () => {
  let modalWindow = document.createElement('div')
  modalWindow.setAttribute('id', 'feedback-thanks-container')
  modalWindow.classList.add('container', 'openWindow', 'feedback-thanks-container')
  modalWindow.innerHTML = `
  <div class="feedback-thanks-modal" id="feedback-thanks-modal">
  <button id="close-thanks-modal-btn" class="close" onclick="removeElement('feedback-thanks-container')">✖</button>
  <i class="fas fa-check-circle"></i>
  <p>Твій відгук успішно додано.</p>
  <button id="great-thanks-modal-btn" class="btn feedback-btn" onclick="removeElement('feedback-thanks-container')">Чудово!</button>
</div>
  `
  feedbackArticles.appendChild(modalWindow)

}

//INPUT VALIDATION
//email validation
const validateEmail = (email) => {
  !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && (emailEl.classList.add('input-error'), emailEl.nextSibling.nextSibling.innerHTML = `Будь ласка введіть email адресу у правильному форматі "example@example.com"`)
}

//input validation
const validateInput = (input, fieldName, min, max) => {
  let validated
  !input.value ? (input.classList.add('input-error'), input.nextSibling.nextSibling.innerHTML = `Поле ${fieldName} є обов'язковим`) :
    input.value.length < min ? (input.classList.add('input-error'), input.nextSibling.nextSibling.innerHTML = `Поле ${fieldName} не може бути коротше, ніж ${min} символи(-ів)`) :
      input.value.length > max ? (input.classList.add('input-error'), input.nextSibling.nextSibling.innerHTML = `Поле ${fieldName} не може бути довше, ніж ${max} символи(-ів)`) : (input.classList.remove('input-error'), input.nextSibling.nextSibling.innerHTML = ``, validated = true)
  return validated
}

//captcha validation
const validateFeedbackCaptcha = async () => {
  let captcha = await grecaptcha.getResponse()
  captcha !== '' ?
    (feedbackCaptcha.nextSibling.nextSibling.innerHTML = ``, validatedCaptcha = true) :
    (feedbackCaptcha.nextSibling.nextSibling.innerHTML = `Підтвердіть будь ласка, що ви не робот.`, validatedCaptcha = false)
}

window.validateFeedbackCaptcha = validateFeedbackCaptcha

//reset validated variables
const resetValidatedVariables = () => {
  validatedFirstName = validatedEmail = validatedCountry = validatedFeedbackText = validatedCaptcha = false
}

//input onChange validation
//first name validation
firstNameEl.addEventListener('change', e => {
  validateInput(e.currentTarget, `Ім'я`, 3, 15) ? validatedFirstName = true : validatedFirstName = false
})
//email validation
emailEl.addEventListener('change', e => {
  validateInput(e.currentTarget, `Email`, 3, 30) ? validatedEmail = true : validatedEmail = false
  validateEmail(emailEl.value)
})
//country validation
countryEl.addEventListener('change', e => {
  validateInput(e.currentTarget, `Країна`, 3, 15) ? validatedCountry = true : validatedCountry = false
})
//feedback text validation
feedbackEl.addEventListener('change', e => {
  validateInput(e.currentTarget, `Відгук`, 3, 750) ? validatedFeedbackText = true : validatedFeedbackText = false
})

//SEND REQUEST TO API TO SET NEW FEEDBACK
const setFeedbackAPI = async (firstName, country, email, feedback, date) => {
  const data = {
    'firstName': firstName,
    'email': email,
    'country': country,
    'feedback': feedback,
    'date': date,
    'accepted': false
  }
  const settings = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTU2OGI3ZGVhNWE4MzQxM2U0M2RjMTIiLCJpYXQiOjE1ODMwODU3NDN9.xX8_VysEZVWlYVLItbV-Azk88ZT772zjyn0PxyZ0x9Q'
    },
    body: JSON.stringify(data)
  }
  let url = 'https://bonbonfrancais.herokuapp.com/feedback/'
  try {
    return await fetch(url, settings)
  } catch (err) {
    console.warn(err)
  }

}

//FUNCTION TO ADD NEW FEEDBACK TO THE PAGE
const setFeedback = async () => {

  const article = document.createElement('article')

  firstName = firstNameEl.value
  country = countryEl.value
  email = emailEl.value
  feedback = feedbackEl.value
  date = new Date().toJSON()

  validateInput(firstNameEl, `Ім'я`, 3, 15)
  validateInput(countryEl, `Країна`, 3, 15)
  validateInput(emailEl, `Email`, 3, 30)
  validateInput(feedbackEl, `Відгук`, 3, 750)
  validateFeedbackCaptcha()

  !!validatedFirstName && !!validatedEmail && !!validatedCountry && !!validatedFeedbackText && !!validatedCaptcha &&
    (loadingBtnToggle(true, sendButton),

      await setFeedbackAPI(firstName, country, email, feedback, date).then(res => {
        if (res.status !== 200) {
          console.warn('Looks like there was a problem. Status Code: ' + res.status, res)
        } else {
          article.innerHTML = `
    <article class="feedback-content container-fluid not-accepted">
    <div class="feedback-container row">
    <div class="feedback-left-col col-sm-12 col-md-3">
    <h3>${firstName}</h3>
    <h4>${country}</h4>
  </div>
      <div class="feedback-right-col col-sm-12 col-md-9">
        <span>"${feedback}"</span>
        <p>${date.split('T')[0]}</p>
      </div>
      <div class="col-sm-12 feedback-thanks">
      <span>Дякую за витрачений час, це дуже важливо для мене! Твій відгук з'явиться на сторінці після модерації.</span>
      </div>
    </div>
  </article>
    `
        }
      }
      ),
      feedbackContainer.appendChild(article),
      acceptModal(firstName, feedback),
      hideModalWindow('feedback-modal'),
      modalForm.reset(),
      grecaptcha.reset(),
      resetValidatedVariables(),
      loadingBtnToggle(false, sendButton))
}

sendButton.addEventListener('click', () => setFeedback())