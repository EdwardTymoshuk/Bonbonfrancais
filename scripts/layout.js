(function Layout() {
    // DETECT MOBILE DEVICE
    let isMobileDevice = function () {
        return ((
            navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/BlackBerry/i) ||
            navigator.userAgent.match(/iPhone|iPad|iPod/i) ||
            navigator.userAgent.match(/Opera Mini/i) ||
            navigator.userAgent.match(/IEMobile/i)
        ) ? true : false);
    }
    //LOGIN 
    //get name from local storage and refirect to index.html
const headerPanelRow = document.querySelector('#header-languages')
let divEl = document.createElement('div')
let localStorageName = localStorage.getItem('localStorageName')
localStorageName && (divEl.innerHTML = `<p>Привіт, <strong>${localStorageName}</strong>.</p><button id="logout-btn" class="logout-btn">Log out</button>`, headerPanelRow.appendChild(divEl))

const logOut = () => {
    localStorage.removeItem('localStorageName') 
    window.location.href = './index.html'
}
let logoutBtn = document.querySelector('#logout-btn')
logoutBtn && logoutBtn.addEventListener('click',logOut )

    // HEADER TRANSFORM
    window.addEventListener('scroll', function () {
        let headerEl = document.getElementById('header-block');
        let headerBlock = document.getElementById('header-block');
        let headerPanel = document.getElementById('header-panel');
        for (let i = 0; i <= 100; i += 10) {
            if (pageYOffset >= document.documentElement.clientHeight / (100 / i)) {
                headerEl.style.background = `rgba(243, 238, 238, 0.${i / 10})`;
                headerPanel.style.opacity = `.${90 - i}`;
            }
            if (pageYOffset >= document.documentElement.clientHeight - headerEl.offsetHeight) {
                headerEl.style.background = `rgba(243, 238, 238, 1)`;
            }
        }
        for (let i = 0; i <= headerPanel.offsetHeight; i += 10) {
            if (pageYOffset >= document.documentElement.clientHeight / (100 / i)) {
                headerBlock.style.top = `-${i}px`;
            }
        }
    });

    // BACK TO TOP
    let btt = document.querySelector('#btt');
    let home = document.querySelector('#home')
    btt.addEventListener('click', (e) => {
        e.preventDefault();
        home.scrollIntoView();
    })

    // PAGE BUTTONS
    // FREE LESSON BUTTONS
    const contactForm = document.querySelector('#contact-form');
    const contactMessage = document.getElementById('message');
    let bookLessonsBtns = document.querySelectorAll('.book-lesson-btn');

    bookLessonsBtns.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            contactMessage.value = `Доброго дня, я б хотів(-ла) замовити урок французької.`;
            contactForm.scrollIntoView();
        })
    })
    // ORDER LESSONS BUTTONS
    let firstBlockBtn = document.querySelector('#first-block-btn');
    let secondBlockBtn = document.querySelector('#second-block-btn');
    let thirdBlockBtn = document.querySelector('#third-block-btn');
    // order first price block
    firstBlockBtn.addEventListener('click', (e) => {
        e.preventDefault();
        contactMessage.value = `Доброго дня, я б хотів(-ла) замовити курс "Загальна (розмовна) французька".`;
        contactForm.scrollIntoView();
    })
    // order second price block
    secondBlockBtn.addEventListener('click', (e) => {
        e.preventDefault();
        contactMessage.value = `Доброго дня, я б хотів(-ла) замовити курс "Підготовка до іспитів DELF/DALF".`;
        contactForm.scrollIntoView();
    })
    // order third price block
    thirdBlockBtn.addEventListener('click', (e) => {
        e.preventDefault();
        contactMessage.value = `Доброго дня, я б хотів(-ла) замовити курс "Ділова французька".`;
        contactForm.scrollIntoView();
    })

    const submitBtn = document.querySelector('#submit');
    const result = document.querySelector('.result');

    const clearResult = () => {
        result.innerHTML = '';
    }
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault;
        setTimeout(clearResult, 5000);
    })
}())