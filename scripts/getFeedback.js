(async function getFeedback() {

  const feedbackContainer = document.querySelector('#feedback-articles')

  const settings = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTU2OGI3ZGVhNWE4MzQxM2U0M2RjMTIiLCJpYXQiOjE1ODMwODU3NDN9.xX8_VysEZVWlYVLItbV-Azk88ZT772zjyn0PxyZ0x9Q'
    }
  }

  try {
    await fetch(`http://localhost:3001/feedback`, settings).then(res => {
      return res.json()
    }
    ).then(data => {
      data.map(v => {
        let article = document.createElement('article')
        v.accepted &&
        (article.innerHTML = `
        <article class="feedback-content container-fluid">
        <div class="feedback-container row">
          <div class="feedback-img col-sm-12 col-md-3">
            <img src="${!v.photo || v.photo == 'false' ? '../img/feedback-photo-2.jpeg' : v.photo}" alt="feedback photo">
          </div>
          <div class="col-sm-12 col-md-9">
            <h3>${v.firstName}, ${v.country}</h3>
            <span>"${v.feedback}"</span>
          </div>
        </div>
      </article>
        `,
        feedbackContainer.appendChild(article))
    })

  })
} catch (err) {
  console.log(err)
}
return false

}())