// ========================================================================
// ДАННЫЕ ИГР (10 САМЫХ ИНТЕРЕСНЫХ С ЦЕНАМИ)
// ========================================================================
const games = [
    { id: "mafia", name: "Мафия", desc: "Психологическая детективная игра для большой компании", players: "6-12", age: "14+", img: "../img/card_1.png", price: 1290 },
    { id: "danetki", name: "Данетки", desc: "Загадочные истории, которые разгадываются вопросами да/нет", players: "4-10", age: "10+", img: "../img/card_2.png", price: 890 },
    { id: "fanty", name: "Фанты", desc: "Смешные задания из подручных средств", players: "5-15", age: "6+", img: "../img/card_3.png", price: 590 },
    { id: "chepuha", name: "Чепуха", desc: "Ассоциативная игра с бумагой", players: "4-8", age: "12+", img: "../img/card_4.png", price: 750 },
    { id: "twister", name: "Твистер", desc: "Подвижная игра на ловкость и гибкость", players: "2-6", age: "8+", img: "../img/card_5.png", price: 1990 },
    { id: "crocodile", name: "Крокодил", desc: "Игра с жестами и эмоциями", players: "4-12", age: "10+", img: "../img/card_6.png", price: 990 },
    { id: "imaginarium", name: "Имаджинариум", desc: "Ассоциативная игра с картами", players: "4-8", age: "12+", img: "../img/card_7.png", price: 1490 },
    { id: "gossip", name: "Сплетни", desc: "Весёлая игра на скорость реакции", players: "6-12", age: "14+", img: "../img/card_8.png", price: 850 },
    { id: "monopoly", name: "Монополия", desc: "Экономическая стратегия", players: "2-6", age: "12+", img: "../img/card_9.png", price: 2490 },
    { id: "jenga", name: "Дженга", desc: "Башня из деревянных блоков", players: "2-6", age: "6+", img: "../img/card_10.png", price: 1090 }
];

// Переменные для фильтрации и сортировки
let selectedHoliday = null;      // Выбранный праздник
let currentSearchTerm = '';      // Текущий поисковый запрос
let currentSort = 'default';     // Текущий тип сортировки

// ========================================================================
// ЕДИНАЯ КОРЗИНА (РАБОТАЕТ НА ВСЁМ САЙТЕ)
// ========================================================================
const CART_KEY = 'agefun_cart';   // Ключ для хранения корзины в localStorage

// Получить корзину из localStorage
function getCart() {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
}

// Сохранить корзину в localStorage
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();    // Обновляем счётчик на иконке
    updateCartModal();    // Обновляем содержимое модального окна
}

// Обновить счётчик товаров на иконке корзины
function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountSpan = document.getElementById('cart-count');
    if (cartCountSpan) {
        cartCountSpan.textContent = count;
        cartCountSpan.style.display = count > 0 ? 'flex' : 'none';
    }
}

// Отрисовка модального окна корзины
function updateCartModal() {
    const cart = getCart();
    const cartItemsList = document.getElementById('cartItemsList');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItemsList) return;
    
    // Если корзина пуста
    if (cart.length === 0) {
        cartItemsList.innerHTML = '<div class="empty-cart-message">Корзина пуста</div>';
        if (cartTotal) cartTotal.textContent = 'Итого: 0 ₽';
        return;
    }
    
    // Формируем HTML для каждого товара в корзине
    let total = 0;
    cartItemsList.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-name">${escapeHtml(item.name)}</div>
                <div class="cart-item-price">${item.price} ₽</div>
                <div class="cart-item-quantity">
                    <button class="cart-qty-btn" data-id="${item.id}" data-change="-1">-</button>
                    <span>${item.quantity}</span>
                    <button class="cart-qty-btn" data-id="${item.id}" data-change="1">+</button>
                </div>
                <div class="cart-item-total">${itemTotal} ₽</div>
                <button class="cart-remove-btn" data-id="${item.id}">🗑️</button>
            </div>
        `;
    }).join('');
    
    if (cartTotal) cartTotal.textContent = `Итого: ${total} ₽`;
    
    // Добавляем обработчики для кнопок изменения количества
    document.querySelectorAll('.cart-qty-btn').forEach(btn => {
        btn.removeEventListener('click', handleQuantityChange);
        btn.addEventListener('click', handleQuantityChange);
    });
    
    // Добавляем обработчики для кнопок удаления
    document.querySelectorAll('.cart-remove-btn').forEach(btn => {
        btn.removeEventListener('click', handleRemoveFromCart);
        btn.addEventListener('click', handleRemoveFromCart);
    });
}

// Обработчик изменения количества товара
function handleQuantityChange(e) {
    const id = e.currentTarget.dataset.id;
    const change = parseInt(e.currentTarget.dataset.change);
    changeCartQuantity(id, change);
}

// Обработчик удаления товара
function handleRemoveFromCart(e) {
    const id = e.currentTarget.dataset.id;
    removeFromCart(id);
}

// Изменить количество товара в корзине
function changeCartQuantity(id, change) {
    const cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === id);
    
    if (itemIndex !== -1) {
        const newQuantity = cart[itemIndex].quantity + change;
        if (newQuantity <= 0) {
            cart.splice(itemIndex, 1);   // Удаляем если количество стало 0
        } else {
            cart[itemIndex].quantity = newQuantity;
        }
        saveCart(cart);
        showNotification(newQuantity <= 0 ? 'Товар удален из корзины' : 'Количество изменено');
    }
}

// Удалить товар из корзины
function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
    showNotification('Товар удален из корзины');
}

// Добавить товар в корзину
function addToCart(game, cardElement) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === game.id);
    
    if (existingItem) {
        existingItem.quantity += 1;   // Увеличиваем количество
    } else {
        cart.push({
            id: game.id,
            name: game.name,
            price: game.price,
            quantity: 1
        });
    }
    
    saveCart(cart);
    showNotification(`🛒 ${game.name} добавлена в корзину!`);
    
    // Анимация кнопки добавления
    if (cardElement) {
        const btn = cardElement.querySelector('.add-to-cart');
        if (btn) {
            btn.style.transform = 'scale(1.2)';
            setTimeout(() => { btn.style.transform = 'scale(1)'; }, 200);
        }
    }
}

// Показать всплывающее уведомление
function showNotification(message) {
    let notification = document.querySelector('.custom-notification');
    if (notification) notification.remove();
    
    notification = document.createElement('div');
    notification.className = 'custom-notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) notification.remove();
        }, 300);
    }, 2000);
}

// Инициализация модального окна корзины
function initCartModal() {
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cartModal');
    const closeCartModalBtn = document.getElementById('closeCartModalBtn');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (!cartIcon || !cartModal) return;
    
    // Открытие корзины по клику на иконку
    cartIcon.addEventListener('click', () => {
        updateCartModal();
        cartModal.classList.add('active');
    });
    
    // Закрытие по кнопке "×"
    if (closeCartModalBtn) {
        closeCartModalBtn.addEventListener('click', () => {
            cartModal.classList.remove('active');
        });
    }
    
    // Закрытие по клику вне окна
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });
    
    // Оформление заказа
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const cart = getCart();
            if (cart.length === 0) {
                showNotification('Корзина пуста!');
                return;
            }
            showNotification('🎉 Спасибо за заказ! Мы свяжемся с вами.');
            saveCart([]);   // Очищаем корзину
            cartModal.classList.remove('active');
        });
    }
}

// Экранирование HTML-символов для безопасности
function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// ========================================================================
// АНИМАЦИЯ ПОЛЁТА КАРТОЧКИ В КОРЗИНУ
// ========================================================================
function flyToCart(cardElement, callback) {
    // Создаём клон карточки для анимации
    const clone = cardElement.cloneNode(true);
    const rect = cardElement.getBoundingClientRect();
    clone.style.position = 'fixed';
    clone.style.top = `${rect.top}px`;
    clone.style.left = `${rect.left}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.zIndex = '9999';
    clone.style.transition = 'all 0.6s ease-in-out';
    clone.style.opacity = '0.9';
    clone.style.pointerEvents = 'none';
    document.body.appendChild(clone);

    // Получаем координаты иконки корзины
    const cartIcon = document.getElementById('cart-icon');
    const targetRect = cartIcon.getBoundingClientRect();
    const targetX = targetRect.left + targetRect.width / 2;
    const targetY = targetRect.top + targetRect.height / 2;

    const cloneRect = clone.getBoundingClientRect();
    const deltaX = targetX - (cloneRect.left + cloneRect.width / 2);
    const deltaY = targetY - (cloneRect.top + cloneRect.height / 2);

    // Запускаем анимацию полёта
    setTimeout(() => {
        clone.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.2)`;
        clone.style.opacity = '0';
    }, 10);

    // Удаляем клон и вызываем колбэк
    setTimeout(() => {
        clone.remove();
        if (callback) callback();
    }, 600);
}

// ========================================================================
// РЕНДЕР КАРТОЧЕК ИГР
// ========================================================================
function renderGames(gamesArray) {
    const grid = document.getElementById('gamesGrid');
    if (!gamesArray.length) {
        grid.innerHTML = '<div class="empty-message">Игры не найдены. Попробуйте изменить поиск.</div>';
        return;
    }
    
    // Формируем HTML для каждой карточки
    grid.innerHTML = gamesArray.map(game => `
        <div class="game-card" data-id="${game.id}">
            <div class="game-img" style="background-image: url('${game.img}'); background-size: cover;"></div>
            <h3>${game.name}</h3>
            <div class="game-meta"><span>${game.players} чел</span><span>${game.age}</span><span>${game.price} ₽</span></div>
            <p>${game.desc}</p>
            <div class="game-actions">
                <a href="#" class="game-btn" data-game-id="${game.id}" data-game-name="${game.name}">Подробнее →</a>
                <button class="add-to-cart" data-game-id="${game.id}" data-game-name="${game.name}" data-game-price="${game.price}">+</button>
            </div>
        </div>
    `).join('');

    // Обработчики для кнопок "Подробнее"
    document.querySelectorAll('.game-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const gameId = btn.getAttribute('data-game-id');
            window.location.href = `game.html?id=${gameId}`;
        });
    });

    // Обработчики для кнопок "В корзину" (с анимацией полёта)
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = btn.closest('.game-card');
            const gameId = btn.getAttribute('data-game-id');
            const gameName = btn.getAttribute('data-game-name');
            const gamePrice = parseInt(btn.getAttribute('data-game-price'));
            
            const game = { id: gameId, name: gameName, price: gamePrice };
            flyToCart(card, () => {
                addToCart(game, card);
            });
        });
    });
}

// ========================================================================
// ФИЛЬТРАЦИЯ И СОРТИРОВКА
// ========================================================================
function filterAndSort() {
    let filtered = [...games];
    
    // Фильтрация по поисковому запросу
    if (currentSearchTerm) {
        filtered = filtered.filter(game => 
            game.name.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
            game.desc.toLowerCase().includes(currentSearchTerm.toLowerCase())
        );
    }
    
    // Сортировка
    if (currentSort === 'name-asc') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentSort === 'name-desc') {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else if (currentSort === 'players') {
        filtered.sort((a, b) => parseInt(a.players.split('-')[0]) - parseInt(b.players.split('-')[0]));
    }
    
    renderGames(filtered);
}

// ========================================================================
// ПОИСК
// ========================================================================
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const sortSelect = document.getElementById('sortSelect');

searchBtn?.addEventListener('click', () => {
    currentSearchTerm = searchInput.value;
    filterAndSort();
});

searchInput?.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        currentSearchTerm = searchInput.value;
        filterAndSort();
    }
});

sortSelect?.addEventListener('change', (e) => {
    currentSort = e.target.value;
    filterAndSort();
});

// ========================================================================
// ВЫБОР ПРАЗДНИКА (МОДАЛЬНОЕ ОКНО)
// ========================================================================
const holidayBtns = document.querySelectorAll('.holiday-btn');
const holidayModal = document.getElementById('holidayAgeModal');
const closeHolidayModalBtn = document.getElementById('closeHolidayModalBtn');
const holidayAgeLinks = document.querySelectorAll('.holiday-age-link');

holidayBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        holidayBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedHoliday = btn.getAttribute('data-holiday');
        
        // Определяем название праздника для отображения
        let holidayName = '';
        switch(selectedHoliday) {
            case 'newyear': holidayName = 'Новый год'; break;
            case 'birthday': holidayName = 'День рождения'; break;
            case 'family': holidayName = 'Семейный праздник'; break;
            case 'corporate': holidayName = 'Корпоратив'; break;
        }
        document.getElementById('selectedHolidayName').textContent = `${holidayName} — выберите возраст`;
        holidayModal.classList.add('active');
    });
});

// Обновляем ссылки для выбора возраста
function updateHolidayAgeLinks() {
    holidayAgeLinks.forEach(link => {
        const age = link.getAttribute('data-age');
        if (selectedHoliday) {
            link.href = `game.html?holiday=${selectedHoliday}&age=${age}`;
        } else {
            link.href = `game.html?age=${age}`;
        }
    });
}

closeHolidayModalBtn?.addEventListener('click', () => holidayModal.classList.remove('active'));
holidayModal?.addEventListener('click', (e) => { if (e.target === holidayModal) holidayModal.classList.remove('active'); });
holidayAgeLinks.forEach(link => link.addEventListener('click', updateHolidayAgeLinks));

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

themeSwitch?.addEventListener('click', () => {
    const isDark = localStorage.getItem('darkmode');
    isDark !== 'active' ? enableDarkmode() : disableDarkmode();
});

// ========================================================================
// ИНИЦИАЛИЗАЦИЯ
// ========================================================================
initCartModal();    // Настройка корзины
updateCartCount();  // Обновление счётчика
renderGames(games); // Отрисовка карточек игр