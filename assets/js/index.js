// ========================================================================
// АККОРДЕОН (РАСКРЫВАЮЩИЕСЯ БЛОКИ)
// ========================================================================
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
        // Закрываем все остальные открытые элементы
        accordionItems.forEach(other => {
            if (other !== item && other.classList.contains('active')) {
                other.classList.remove('active');
            }
        });
        // Открываем/закрываем текущий
        item.classList.toggle('active');
    });
});

// ========================================================================
// ТАБЫ (ПЕРЕКЛЮЧЕНИЕ МЕЖДУ РАЗДЕЛАМИ)
// ========================================================================
const tabs = document.querySelectorAll('.filter-tab');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('data-tab');
        
        // Убираем активный класс со всех табов и контента
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(content => content.classList.remove('active'));
        
        // Активируем текущий таб и соответствующий контент
        tab.classList.add('active');
        document.getElementById(`tab-${targetId}`).classList.add('active');
    });
});

// ========================================================================
// ФОРМА ОБРАТНОЙ СВЯЗИ
// ========================================================================
const feedbackForm = document.getElementById('feedbackForm');
const modal = document.getElementById('feedbackModal');
const closeModal = document.getElementById('closeFeedbackModal');

if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();                 // Отменяем отправку формы
        modal.classList.add('active');      // Показываем модальное окно
        feedbackForm.reset();               // Очищаем форму
    });
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');   // Закрываем модальное окно
    });
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {           // Закрытие по клику на фон
            modal.classList.remove('active');
        }
    });
}

// ========================================================================
// ПЕРЕКЛЮЧЕНИЕ ТЕМЫ (ТЁМНАЯ / СВЕТЛАЯ)
// ========================================================================
const themeSwitch = document.getElementById('theme-switch');
const darkmode = localStorage.getItem('darkmode');

const enableDarkmode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
};

const disableDarkmode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', null);
};

if (darkmode === 'active') enableDarkmode();

themeSwitch.addEventListener('click', () => {
    const isDark = localStorage.getItem('darkmode');
    isDark !== 'active' ? enableDarkmode() : disableDarkmode();
});