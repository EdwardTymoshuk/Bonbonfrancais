//GET PAGE ELEMENTS
const feedbackContainer = document.querySelector('#feedback-articles')
const feedbackModal = document.querySelector('#feedback-modal')
const modalForm = document.querySelector('#modal-form')
const firstNameEl = document.querySelector('#feedback-firstName')
const countryEl = document.querySelector('#feedback-country')
const emailEl = document.querySelector('#feedback-email')
const feedbackEl = document.querySelector('#feedback-textarea')
const sendFeedbackBtn = document.querySelector('#send-feedback-button')
const feedbackArticles = document.querySelector('#feedback-articles')
const feedbackCaptcha = document.querySelector('#feedback-captcha')

//DEFINE VALIDATION VARIABLES
let validatedFeedbackFirstName, validatedFeedbackEmail, validatedFeedbackCountry, validatedFeedbackText, validatedFeedbackCaptcha

//ADD ATTRIBUTES TO PAGE ELLEMENTS
feedbackCaptcha.setAttribute('data-callback', ' validateFeedbackCaptcha')
feedbackCaptcha.setAttribute('data-expired-callback', 'grecaptcha.reset()')

//ADD INPUT ONCHANGE VALIDATION
//First name validation
firstNameEl.addEventListener('change', e => {
        validateInput(e.currentTarget, `Ім'я`, 3, 30) ? validatedFeedbackFirstName = true : validatedFeedbackFirstName = false
    })
    //Email validation
emailEl.addEventListener('change', e => {
        validateInput(e.currentTarget, `Email`, 3, 45) ? validatedFeedbackEmail = true : validatedFeedbackEmail = false
        validateEmail(emailEl)
    })
    //Country validation
countryEl.addEventListener('change', e => {
        validateInput(e.currentTarget, `Країна`, 3, 30) ? validatedFeedbackCountry = true : validatedFeedbackCountry = false
    })
    //Feedback text validation
feedbackEl.addEventListener('change', e => {
    validateInput(e.currentTarget, `Відгук`, 3, 1000) ? validatedFeedbackText = true : validatedFeedbackText = false
})

//MAIN FUNCTIONS
//Add new feedback api
const setFeedbackAPI = async(firstName, country, email, feedback, date) => {
    const data = { firstName, email, country, feedback, date, 'accepted': false }
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

//Add new feedback
const setFeedback = async() => {
    const article = document.createElement('article')
    const firstName = firstNameEl.value
    const country = countryEl.value
    const email = emailEl.value
    const feedback = feedbackEl.value
    const date = new Date().toJSON()

    validateInput(firstNameEl, `Ім'я`, 3, 15)
    validateInput(countryEl, `Країна`, 3, 15)
    validateInput(emailEl, `Email`, 3, 30)
    validateEmail(emailEl)
    validateInput(feedbackEl, `Відгук`, 3, 750)
    validateFeedbackCaptcha()

    !!validatedFeedbackFirstName && !!validatedFeedbackEmail && !!validatedFeedbackCountry && !!validatedFeedbackText && !!validatedFeedbackCaptcha &&
        (loadingBtnToggle(true, sendFeedbackBtn),

            await setFeedbackAPI(firstName, country, email, feedback, date).then(res => {
                if (res.status !== 200) {
                    console.warn('Looks like there was a problem. Status Code: ' + res.status, res)
                } else {
                    article.innerHTML = `
    <article class="feedback-content container-fluid not-accepted-feedback">
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
            }),
            feedbackContainer.appendChild(article),
            acceptSuccessfulModal(feedbackContainer),
            hideFeedbackModalWindow('feedback-modal'),
            modalForm.reset(),
            grecaptcha.reset(),
            resetValidatedVariables(),
            loadingBtnToggle(false, sendFeedbackBtn))
}

//ADDITIONAL FUNCTIONS
//Hide feedback modal window
const hideFeedbackModalWindow = (modal) => {
    $(`#${modal}`).modal('hide')
}

//Reset validated variables
const resetValidatedVariables = () => {
    validatedFeedbackFirstName = validatedFeedbackEmail = validatedFeedbackCountry = validatedFeedbackText = validatedFeedbackCaptcha = false
}

//Captcha feedback validation
const validateFeedbackCaptcha = async() => {
    let captcha = await grecaptcha.getResponse(0)
    captcha !== '' ?
        (feedbackCaptcha.nextSibling.nextSibling.innerHTML = ``, validatedFeedbackCaptcha = true) :
        (feedbackCaptcha.nextSibling.nextSibling.innerHTML = `Підтвердіть будь ласка, що ви не робот.`, validatedFeedbackCaptcha = false)
}
window.validateFeedbackCaptcha = validateFeedbackCaptcha

//ADD CLICK EVENT TO SEND FEEDBACK BUTTON
sendFeedbackBtn.addEventListener('click', () => setFeedback())