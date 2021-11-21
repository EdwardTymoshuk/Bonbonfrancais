(function setFeedback() {

  //GET PAGE ELEMENTS
  const feedbackContainer = document.querySelector('#feedback-articles')
  const feedbackModal = document.querySelector('#feedback-modal')
  const modalForm = document.querySelector('#modal-form')
  const firstNameEl = document.querySelector('#feedback-firstName')
  const countryEl = document.querySelector('#feedback-country')
  const emailEl = document.querySelector('#feedback-email')
  const feedbackEl = document.querySelector('#feedback-textarea')
  const photoEl = document.querySelector('#feedback-photo')
  const button = document.querySelector('#feedback-button')

  //DEFINE GLOBAL VARIABLES
  let  validatedFirstName, validatedEmail, validatedCountry, validatedFeedbackText

  //HELPFULL FUNCTIONS
  //hide modal window
  const hideModalWindow = () => {
    $('#feedback-modal').modal('hide')
  }

  //INPUT VALIDATION
  //email validation
  const validateEmail = (email) => {
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && (emailEl.classList.add('input-error'), emailEl.nextSibling.nextSibling.innerHTML = `Будь ласка введіть email адресу у правильному форматі "example@example.com"`)
  }

  //input validation: 
  const validateInput = (input, fieldName, min, max) => {
    let validated
  !input.value ? (input.classList.add('input-error'), input.nextSibling.nextSibling.innerHTML = `Поле ${fieldName} є обов'язковим`) :
      input.value.length < min ? (input.classList.add('input-error'), input.nextSibling.nextSibling.innerHTML = `Поле ${fieldName} не може бути коротше, ніж ${min} символи(-ів)`) :
      input.value.length > max ? (input.classList.add('input-error'), input.nextSibling.nextSibling.innerHTML = `Поле ${fieldName} не може бути довше, ніж ${max} символи(-ів)`) : (input.classList.remove('input-error'), input.nextSibling.nextSibling.innerHTML = ``, validated = true)
      return validated
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
    validateInput(e.currentTarget, `Відгук`, 3, 100) ? validatedFeedbackText = true : validatedFeedbackText = false
  })


  //ADD FEEDBACK TO PAGE FUNCTION
  const addElement = async () => {
    firstName = firstNameEl.value
    country = countryEl.value
    email = emailEl.value
    feedback = feedbackEl.value
    photo = photoEl.value

    validateInput(firstNameEl, `Ім'я`, 3, 15)
    validateInput(countryEl, `Країна`, 3, 15)
    validateInput(emailEl, `Email`, 3, 30)
    validateInput(feedbackEl, `Відгук`, 3, 100)

// // // 
    const data = {
        'firstName': firstName,
        'email': email,
        'country': country,
        'feedback': feedback,
        'photo': photo || '',
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
    if (validatedFirstName, validatedEmail, validatedCountry, validatedFeedbackText  === true || undefined) {
    try {
        await fetch(`http://localhost:3001/feedback`, settings).then(res => {
            if (res.status !== 200)  {
                console.warn('Looks like there was a problem. Status Code: ' + res.status, res)
            } else {
    let article = document.createElement('article')
    article.innerHTML = `
        <article class="feedback-content container-fluid not-accepted">
        <div class="feedback-container row">
          <div class="feedback-img col-sm-12 col-md-3">
            <img src="../img/feedback-photo-2.jpeg" alt="feebback photo">
          </div>
          <div class="col-sm-12 col-md-9">
            <h3>${firstName}, ${country}</h3>
            <span>"${feedback}"</span>
          </div>
          <div class="col-sm-12 feedback-thanks">
          <span>Дякую за Твій відгук, це важливо для мене! Відгук з'явиться на сторінці після модерації.</span>
          </div>
        </div>
      </article>
        `

      !!validatedFirstName && !!validatedEmail && !!validatedCountry && !!validatedFeedbackText && (feedbackContainer.appendChild(article),
      hideModalWindow(),
      modalForm.reset())
  }
        }
        )
    } catch (err) {
        console.log(err)
    }
  }
    return false


    }

  button.addEventListener('click', () => addElement())



}())