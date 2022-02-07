(function LayoutEn() {
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

    // PAGE BUTTONS ENGLISH
    // FREE LESSON BUTTONS
    const contactForm = document.querySelector('#contact-form');
    const contactMessage = document.getElementById('message');
    let bookLessonsBtns = document.querySelectorAll('.book-lesson-btn-en');

    bookLessonsBtns.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            contactMessage.value = `Hello. I'd like to book a lesson.`;
            contactForm.scrollIntoView();
        })
    })
    // ORDER LESSONS BUTTONS
    let firstBlockBtn = document.querySelector('#first-block-btn-en');
    let secondBlockBtn = document.querySelector('#second-block-btn-en');
    let thirdBlockBtn = document.querySelector('#third-block-btn-en');
    // order first price block
    firstBlockBtn.addEventListener('click', (e) => {
        e.preventDefault();
        contactMessage.value = `Hello. I'd like to book a cours "Common (speeking) french".`;
        contactForm.scrollIntoView();
    })
    // order second price block
    secondBlockBtn.addEventListener('click', (e) => {
        e.preventDefault();
        contactMessage.value = `Hello. I'd like to book a cours "Prepearing to DELF/DALF exams".`;
        contactForm.scrollIntoView();
    })
    // order third price block
    thirdBlockBtn.addEventListener('click', (e) => {
        e.preventDefault();
        contactMessage.value = `Hello. I'd like to book a cours "Business french".`;
        contactForm.scrollIntoView();
    })

    const submitBtn = document.querySelector('#submit');
    const result = document.querySelector('.result');

    const zalupa = () => {
        result.innerHTML = '';
    }
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault;
        setTimeout(zalupa, 5000);
    })

}())