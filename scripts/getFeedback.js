//GET ELEMENTS FROM PAGE
const moreFeedbackBtn = document.querySelector('#more-feedback-btn')
console.log(localStorageName)
// const localStorageName = localStorage.getItem('localStorageName')

//DEFINE VARIABLES
let start = 0
let end = start + 4
let listLength

//DEFINE FUNCTIONS
//Helpful Functions
//increase start and end of the 
const increaseStartEnd = () => {
  start += 4
  end += 4
}

//Main Functions
//accept feedback
const acceptFeedback = async (elem) => {
  const { firstName, email, country, feedback, date, accepted, _id } = elem
  const data = {
    'firstName': firstName,
    'email': email,
    'country': country,
    'feedback': feedback,
    'date': date || '',
    'accepted': true
  }
  let url = 'https://bonbonfrancais.herokuapp.com/feedback/'
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
    await fetch(url + _id, settings).then(res => {
      document.querySelector(`#feedback-btns-${_id}`).innerHTML = `<div class="feedback-accepted"><i class="fas fa-check-circle"></i><span>Коментар від "${firstName}" з текстом "${feedback}" успішно затвердженно.</span></div>`
    })
  } catch (err) {
    console.log(err)
  }
}

//function to delete feedback 
const rejectFeedback = async (elem) => {
  const { firstName, feedback, _id } = elem
  let url = 'https://bonbonfrancais.herokuapp.com/feedback/'
  const settings = {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTU2OGI3ZGVhNWE4MzQxM2U0M2RjMTIiLCJpYXQiOjE1ODMwODU3NDN9.xX8_VysEZVWlYVLItbV-Azk88ZT772zjyn0PxyZ0x9Q',
      'Access-Control-Allow-Origin': '*'
    }
  }
  try {
    await fetch(url + _id, settings).then(res => {
      document.querySelector(`#feedback-btns-${_id}`).innerHTML = `<div class="feedback-rejected"><i class="fas fa-times-circle"></i><span>Коментар від "${firstName}" з текстом "${feedback}" успішно видаленно.</span></div>`
    })
  } catch (err) {
    console.log(err)
  }
}

//Function to get feedback from API
const getFeedbackAPI = async (acceptToggle) => {
  const settings = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTU2OGI3ZGVhNWE4MzQxM2U0M2RjMTIiLCJpYXQiOjE1ODMwODU3NDN9.xX8_VysEZVWlYVLItbV-Azk88ZT772zjyn0PxyZ0x9Q',
      'Access-Control-Allow-Origin': '*'
    }
  }
  let data = { start, end }
  let url = new URL('https://bonbonfrancais.herokuapp.com/feedback/' + acceptToggle)
  for (let k in data) { url.searchParams.append(k, data[k]) }
  try {
    await fetch(url, settings).then(res => {
      return res.json()
    }
    ).then(data => {
      listLength = data.length
      data.map(v => {
        let article = document.createElement('article');
        (article.innerHTML = `
        <div class="feedback-container row openWindow">
        <div class="feedback-left-col col-sm-12 col-md-3">
        <h3>${v.firstName}</h3>
        <h4>${v.country}</h4>
      </div>
          <div class="feedback-right-col col-sm-12 col-md-9">
            <span>"${v.feedback}"</span>
            <p>${v.date.split('T')[0]}</p>
          </div>
          ${!!localStorageName ?
            `<div id="feedback-btns-${v._id}">
           <button id="acceptFeedback-${v._id}" type="button" class="btn btn-success">
  Затвердити
</button>
          <button id="rejectFeedback-${v._id}" type="button" class="btn btn-danger">
  Відхилити
</button>
          </div>
          ` : ''}
        </div>
        `,
          feedbackContainer.appendChild(article),
          article.classList.add('feedback-content', 'container-fluid'),
          !!localStorageName && v.accepted == acceptToggle ?
            (document.querySelector(`#acceptFeedback-${v._id}`).addEventListener('click', () => acceptFeedback(v)),
              document.querySelector(`#rejectFeedback-${v._id}`).addEventListener('click', () => rejectFeedback(v)))
            : ''
        )
      })
    })
  } catch (err) {
    console.warn(err)
  }
}
//Get feedback function
const getFeedback = async () => {
  loadingBtnToggle(true, moreFeedbackBtn)

  !!localStorageName ?
    await getFeedbackAPI(false) :
    await getFeedbackAPI(true)

  listLength < 4 && (moreFeedbackBtn.style.display = 'none')

  loadingBtnToggle(false, moreFeedbackBtn)
  increaseStartEnd()

}

moreFeedbackBtn.addEventListener('click', () => getFeedback())