//GET ELEMENTS FROM PAGE
const contactFormEl = document.querySelector('#contact-form')
const contactFirstNameEl = document.querySelector('#contact-firstName')
const contactEmailEl = document.querySelector('#contact-email')
const contactMessageEl = document.querySelector('#contact-message')
const contactCaptcha = document.querySelector('#contact-captcha')


//DEFINE GLOBAL VARIABLES
//define variables for validation and set defaut value to false
let validatedContactFirstName = validatedContactEmail = validatedContactMessage = validatedContactCaptcha = false

//ADD ATTRIBUTES TO PAGE ELLEMENTS
contactCaptcha.setAttribute('data-callback', 'validateContactCaptcha')
contactCaptcha.setAttribute('data-expired-callback', 'grecaptcha.reset()')

//INPUTs ONCHANGE VALIDATION
//first name validation
contactFirstNameEl.addEventListener('change', e => {
  validateInput(e.currentTarget, `Ім'я`, 3, 30) ? validatedContactFirstName = true : validatedContactFirstName = false
})

//email validation
contactEmailEl.addEventListener('change', e => {
  validateInput(e.currentTarget, `Email`, 3, 30) ? validatedContactFirstName = true : validatedContactEmail = false
  validateEmail(contactEmailEl)
})

//contact message validation
contactMessageEl.addEventListener('change', e => {
  validateInput(e.currentTarget, `Повідомлення`, 10, 1000) ? validatedContactMessage = true : validatedContactMessage = false
})

//captcha validation
const validateContactCaptcha = async () => {
  let captcha = await grecaptcha.getResponse(1)
  captcha !== '' ?
    (contactCaptcha.nextSibling.nextSibling.innerHTML = ``, validatedContactCaptcha = true) :
    (contactCaptcha.nextSibling.nextSibling.innerHTML = `Підтвердіть будь ласка, що ви не робот.`, validatedContactCaptcha = false)
}

  window.validateContactCaptcha = validateContactCaptcha

//MAIN FUNCTIONS
//API to send contact form`s data
const sendContactMessageAPI = async (firstName, email, message) => {
  const data = {
    firstName,
    email,
    message
  }
  const settings = {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Methods': 'HEAD, GET, POST, PUT, DELETE',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(data)
  }
  const url = '/mail.php'

  try {
    return await fetch(url, settings)
  } catch (err) {
    console.warn(err)
  }
}

//Send message from contact form function
const sendContactMessage = () => {

  //input validation
  validateInput(contactFirstNameEl, `Ім'я`, 3, 30)
  validateInput(contactEmailEl, `Email`, 3, 30)
  validateInput(contactMessageEl, `Повідомлення`, 10, 1000)
  validateContactCaptcha()

  !!validatedContactFirstName && !!validatedContactFirstName && !!validatedContactMessage && sendContactMessageAPI(contactFirstNameEl.value, contactEmailEl.value, contactMessageEl.value)
  return true
}

//HELPFUL FUNCTIONS
//Reset validation variales function
const resetValidationVariables = () => validatedContactFirstName = validatedContactEmail = validatedContactMessage = validatedContactCaptcha = false

//ADD CLICK EVENT TO CONTACT FORM`S BUTTON
sendContactButton.addEventListener('click', (e) => {
  e.preventDefault()
  sendContactMessage()
 !!validatedContactFirstName && !!validatedContactFirstName && !!validatedContactMessage && !!validatedContactCaptcha &&
  (acceptMail(),
  contactFormEl.reset(),
  resetValidationVariables()
  )
})