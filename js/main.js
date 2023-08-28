// Мобильное меню 
const mobileMenu = document.querySelector('.menu-wrap');
const mobileMenuContainer = document.querySelector('.menu-wrap__menu-container');
const mobileMenuOpenBtn = document.querySelector('.menu__btn');
const mobileMenuCloseBtn = document.querySelector('.menu-close');

mobileMenuOpenBtn.addEventListener('click', function() {
    mobileMenu.classList.add('active');
    mobileMenuContainer.classList.add('active');
    document.body.classList.add('no-scroll');
});

mobileMenuCloseBtn.addEventListener('click', function() {
    mobileMenu.classList.remove('active');
    mobileMenuContainer.classList.remove('active');
    document.body.classList.remove('no-scroll');
});

mobileMenu.addEventListener('click', function(event) {
    if (event.target === mobileMenu) {
        mobileMenu.classList.remove('active');
        mobileMenuContainer.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
});



// Функция для прокрутки к футеру при нажатии на ссылки в мобильном меню
function scrollToSection() {
    const targetSection = document.getElementById('contacts');
    
    if (targetSection) { // Проверяем, существует ли секция
        const offsetTop = targetSection.offsetTop;

        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Получаем ссылки из мобильного меню и назначаем обработчик события при клике
const mobileMenuItems = document.querySelectorAll('.header__menu-list__item');
mobileMenuItems.forEach((menuItem) => {
    menuItem.addEventListener('click', function(event) {
        event.preventDefault();
        mobileMenu.classList.remove('active');
        mobileMenuContainer.classList.remove('active');
        document.body.classList.remove('no-scroll');
        scrollToSection();
    });
});




// Слайдеры
$(document).ready(function() {
    $('.feedbacks-slider').slick({
        arrows: true,
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 2,
        responsive: [
            {
              breakpoint: 1351,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 1000,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 643,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            },
            
        ]
        
    });
});


// Табы 
// Находим все контейнеры с табами
const tabContainers = document.querySelectorAll('.tabs-container');

tabContainers.forEach(container => {
    const tabButtons = container.querySelectorAll('.tabs-top__btns__item');
    const tabSlider = container.querySelector('.tab-slider');
    const tabContents = container.querySelectorAll('.tab-content');

    function setActiveTab(button) {
        // Удаляем активный класс у всех кнопок в текущем контейнере
        tabButtons.forEach(btn => btn.classList.remove('active'));
        // Добавляем активный класс только для текущей кнопки
        button.classList.add('active');
    }

    function showTabContent(tabId) {
        // Скрываем все контенты в текущем контейнере
        tabContents.forEach(content => content.classList.remove('active'));

        // Находим соответствующий контент и отображаем его
        const tabContent = container.querySelector(`#${tabId}`);
        tabContent.classList.add('active');
    }

    function animateTabSlider(activeButton) {
        // Анимируем сдвиг плашки к активной кнопке
        const offsetX = activeButton.getBoundingClientRect().left - tabSlider.getBoundingClientRect().left;
        tabSlider.style.transform = `translateX(${offsetX}px)`;
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            setActiveTab(button);

            // Находим активные кнопки в текущем контейнере
            const activeButtons = container.querySelectorAll('.tabs-top__btns__item.active');
            // Проверяем, есть ли активные кнопки, кроме первой
            if (activeButtons.length > 1) {
                const activeButton = container.querySelector('.tabs-top__btns__item.active:last-child');
                animateTabSlider(activeButton);
            }

            // Показываем соответствующий контент
            const tabId = button.getAttribute('data-tab');
            showTabContent(tabId);
        });
    });
});




// Аккордион 
document.addEventListener("DOMContentLoaded", function () {
    const initiallyOpenItem = document.querySelector('.accordion-item.open');
    
    if (initiallyOpenItem) {
        const content = initiallyOpenItem.querySelector('.accordion-content');
        content.style.maxHeight = content.scrollHeight + 'px';
    }
});

const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach((item) => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');

    header.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        accordionItems.forEach((otherItem) => {
            otherItem.classList.remove('open');
            otherItem.querySelector('.accordion-content').style.maxHeight = '0';
        });

        if (!isOpen) {
            item.classList.add('open');
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    });
});



// Функция для показа модального окна с анимацией
function showModal(modal, videoSrc) {
    modal.style.display = 'block';

    // Восстанавливаем src видео
    const iframe = modal.querySelector('iframe');
    if (iframe) {
        iframe.src = videoSrc;
    }

    setTimeout(function () {
        modal.classList.add('show');
        document.body.classList.add('no-scroll');
    }, 10); // Задержка для активации анимации
}

// Функция для закрытия модального окна и остановки видео
function closeModal(modal) {
    modal.classList.remove('show');
    setTimeout(function () {
        modal.style.display = 'none';
        document.body.classList.remove('no-scroll');

        // Останавливаем видео и сохраняем его src
        const iframe = modal.querySelector('iframe');
        if (iframe) {
            const videoSrc = iframe.src;
            iframe.src = '';
        }
    }, 300); // Задержка для завершения анимации
}


// Модальное окно для видеообращения
const modalVideo = document.getElementById('modalVideo');
const btnOpenModalVideo = document.getElementById('btnOpenModalVideo');
const btnCloseModalVideo = document.getElementById('btnCloseModalVideo');

let videoSrcForModalVideo; // Сохраняем src видео

btnOpenModalVideo.onclick = function () {
    videoSrcForModalVideo = 'https://www.youtube.com/embed/qFCtQFxDLlY?si=O0v3bemeuh8NwUC9'; // Установите правильный src видео
    showModal(modalVideo, videoSrcForModalVideo);
}

btnCloseModalVideo.onclick = function () {
    closeModal(modalVideo);
}

// Модальное окно для видео по установке AMS 700 LGX IZ
const modalOperation = document.getElementById('modalOperation');
const btnOpenModalOperation = document.getElementById('btnOpenModalOperation');
const btnCloseModalOperation = document.getElementById('btnCloseModalOperation');

let videoSrcForModalOperation; // Сохраняем src видео

btnOpenModalOperation.onclick = function () {
    videoSrcForModalOperation = 'https://www.youtube.com/embed/qFCtQFxDLlY?si=O0v3bemeuh8NwUC9';
    showModal(modalOperation, videoSrcForModalOperation);
}

btnCloseModalOperation.onclick = function () {
    closeModal(modalOperation);
}

// Модальное окно для видео процесс активации импланта
const modalActivation = document.getElementById('modalActivation');
const btnOpenModalActivation = document.getElementById('btnOpenModalActivation');
const btnCloseModalActivation = document.getElementById('btnCloseModalActivation');

let videoSrcForModalActivation; // Сохраняем src видео

btnOpenModalActivation.onclick = function () {
    videoSrcForModalActivation = 'https://www.youtube.com/embed/qFCtQFxDLlY?si=O0v3bemeuh8NwUC9';
    showModal(modalActivation, videoSrcForModalActivation);
}

btnCloseModalActivation.onclick = function () {
    closeModal(modalActivation);
}

// Закрытие модального окна при клике на затемненный фон для всех модальных окон
window.onclick = function (event) {
    if (event.target == modalVideo) {
        closeModal(modalVideo);
    } else if (event.target == modalOperation) {
        closeModal(modalOperation);
    } else if (event.target == modalActivation) {
        closeModal(modalActivation);
    }
}


