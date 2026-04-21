// ========================================================================
// ПОЛУЧЕНИЕ ID ИГРЫ ИЗ URL
// ========================================================================
const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('id') || 'mafia';   // По умолчанию "mafia"

// ========================================================================
// ДАННЫЕ ИГР (ВСЕ ДОСТУПНЫЕ ИГРЫ)
// ========================================================================
const gamesData = {
    mafia: {
        id: 'mafia',
        name: 'Мафия',
        desc: '«Мафия» — культовая психологическая игра, в которой мирные жители пытаются вычислить мафию, а мафия — скрытно уничтожить горожан. Эмоции, блеф, дедукция и командная работа делают каждую партию уникальной.',
        players: '6-12',
        time: '30-60 минут',
        age: '14+',
        meta: 'колода карт, ведущий',
        price: 1290,
        image: '../img/mafia_game.webp'
    },
    danetki: {
        id: 'danetki',
        name: 'Данетки',
        desc: 'Загадочные истории, которые разгадываются вопросами да/нет. Ведущий загадывает ситуацию, а игроки задают вопросы, на которые можно ответить только "да" или "нет".',
        players: '4-10',
        time: '20-40 минут',
        age: '10+',
        meta: 'список историй, ведущий',
        price: 890,
        image: '../img/mafia_game.webp'
    },
    fanty: {
        id: 'fanty',
        name: 'Фанты',
        desc: 'Смешные задания из подручных средств. Каждый игрок по очереди вытягивает фант и выполняет забавное задание.',
        players: '5-15',
        time: '20-60 минут',
        age: '6+',
        meta: 'бумажки с заданиями, шляпа',
        price: 590,
        image: '../img/mafia_game.webp'
    },
    chepuha: {
        id: 'chepuha',
        name: 'Чепуха',
        desc: 'Ассоциативная игра с бумагой. Игроки пишут слова, а затем угадывают, кто что написал.',
        players: '4-8',
        time: '30-45 минут',
        age: '12+',
        meta: 'бумага, ручки',
        price: 750,
        image: '../img/mafia_game.webp'
    },
    twister: {
        id: 'twister',
        name: 'Твистер',
        desc: 'Подвижная игра на ловкость и гибкость. Игроки становятся на цветные круги и выполняют команды ведущего.',
        players: '2-6',
        time: '15-30 минут',
        age: '8+',
        meta: 'коврик Твистер, рулетка',
        price: 1990,
        image: '../img/mafia_game.webp'
    },
    crocodile: {
        id: 'crocodile',
        name: 'Крокодил',
        desc: 'Игра с жестами и эмоциями. Нужно объяснить слово без слов, только с помощью жестов.',
        players: '4-12',
        time: '20-40 минут',
        age: '10+',
        meta: 'карточки со словами',
        price: 990,
        image: '../img/mafia_game.webp'
    },
    imaginarium: {
        id: 'imaginarium',
        name: 'Имаджинариум',
        desc: 'Ассоциативная игра с картами. Нужно придумать ассоциацию к картинке, чтобы другие угадали.',
        players: '4-8',
        time: '30-60 минут',
        age: '12+',
        meta: 'колода карт, фишки',
        price: 1490,
        image: '../img/mafia_game.webp'
    },
    gossip: {
        id: 'gossip',
        name: 'Сплетни',
        desc: 'Весёлая игра на скорость реакции. Нужно быстро отвечать на вопросы о других игроках.',
        players: '6-12',
        time: '20-30 минут',
        age: '14+',
        meta: 'вопросы, бланки',
        price: 850,
        image: '../img/mafia_game.webp'
    },
    monopoly: {
        id: 'monopoly',
        name: 'Монополия',
        desc: 'Экономическая стратегия. Покупайте, продавайте, стройте и становитесь самым богатым игроком.',
        players: '2-6',
        time: '60-180 минут',
        age: '12+',
        meta: 'игровое поле, карточки, фишки, кубики',
        price: 2490,
        image: '../img/mafia_game.webp'
    },
    jenga: {
        id: 'jenga',
        name: 'Дженга',
        desc: 'Башня из деревянных блоков. Аккуратно вытаскивайте блоки, чтобы башня не упала.',
        players: '2-6',
        time: '10-30 минут',
        age: '6+',
        meta: 'деревянные блоки',
        price: 1090,
        image: '../img/mafia_game.webp'
    }
};

// Текущая игра (получаем по ID из URL)
const currentGame = gamesData[gameId] || gamesData.mafia;

// ========================================================================
// ЗАПОЛНЕНИЕ СТРАНИЦЫ ДАННЫМИ
// ========================================================================
document.getElementById('gameName').textContent = currentGame.name;
document.getElementById('gameSubtitle').textContent = currentGame.desc.split('.')[0] + '.';
document.querySelector('.game-meta-info span:first-child').textContent = currentGame.players;
document.querySelector('.game-meta-info span:nth-child(2)').textContent = currentGame.time;
document.querySelector('.game-meta-info span:nth-child(3)').textContent = currentGame.age;
document.querySelector('.game-meta-info span:last-child').textContent = currentGame.meta;
document.getElementById('gameDescription').textContent = currentGame.desc;
document.getElementById('gamePrice').textContent = `${currentGame.price} ₽`;
document.getElementById('gameImage').src = currentGame.image;
document.getElementById('gameImage').alt = currentGame.name;

// ========================================================================
// РАБОТА С ИЗБРАННЫМ
// ========================================================================
const FAVORITES_KEY = 'agefun_favorites';   // Ключ для хранения избранного

// Получить список избранных игр
function getFavorites() {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
}

// Сохранить список избранных игр
function saveFavorites(favorites) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

// Проверить, добавлена ли текущая игра в избранное
function isGameInFavorites() {
    const favorites = getFavorites();
    return favorites.some(game => game.id === currentGame.id);
}

// Обновить внешний вид кнопки избранного
function updateFavoriteButton() {
    const favoriteBtn = document.getElementById('favoriteBtn');
    if (!favoriteBtn) return;
    
    const isFavorite = isGameInFavorites();
    
    if (isFavorite) {
        favoriteBtn.innerHTML = '❤️ В избранном';
        favoriteBtn.style.background = '#791919';
        favoriteBtn.style.color = '#ffd966';
        favoriteBtn.style.border = '2px solid #791919';
    } else {
        favoriteBtn.innerHTML = '🤍 В избранное';
        favoriteBtn.style.background = 'transparent';
        favoriteBtn.style.color = '#791919';
        favoriteBtn.style.border = '2px solid #791919';
    }
}

// Добавить в избранное
function addToFavorites() {
    const favorites = getFavorites();
    if (!favorites.some(game => game.id === currentGame.id)) {
        favorites.push(currentGame);
        saveFavorites(favorites);
        showNotification('✅ Игра добавлена в избранное!');
        updateFavoriteButton();
    }
}

// Удалить из избранного
function removeFromFavorites() {
    let favorites = getFavorites();
    favorites = favorites.filter(game => game.id !== currentGame.id);
    saveFavorites(favorites);
    showNotification('🗑️ Игра удалена из избранного');
    updateFavoriteButton();
}

// Переключить состояние избранного
function toggleFavorite() {
    if (isGameInFavorites()) {
        removeFromFavorites();
    } else {
        addToFavorites();
    }
}

// ========================================================================
// ЕДИНАЯ КОРЗИНА (РАБОТАЕТ НА ВСЁМ САЙТЕ)
// ========================================================================
const CART_KEY = 'agefun_cart';   // Ключ для хранения корзины

function getCart() {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
    updateCartModal();
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountSpan = document.getElementById('cart-count');
    if (cartCountSpan) {
        cartCountSpan.textContent = count;
        cartCountSpan.style.display = count > 0 ? 'flex' : 'none';
    }
}

function updateCartModal() {
    const cart = getCart();
    const cartItemsList = document.getElementById('cartItemsList');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItemsList) return;
    
    if (cart.length === 0) {
        cartItemsList.innerHTML = '<div class="empty-cart-message">Корзина пуста</div>';
        if (cartTotal) cartTotal.textContent = 'Итого: 0 ₽';
        return;
    }
    
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
    
    document.querySelectorAll('.cart-qty-btn').forEach(btn => {
        btn.removeEventListener('click', handleQuantityChange);
        btn.addEventListener('click', handleQuantityChange);
    });
    
    document.querySelectorAll('.cart-remove-btn').forEach(btn => {
        btn.removeEventListener('click', handleRemoveFromCart);
        btn.addEventListener('click', handleRemoveFromCart);
    });
}

function handleQuantityChange(e) {
    const id = e.currentTarget.dataset.id;
    const change = parseInt(e.currentTarget.dataset.change);
    changeCartQuantity(id, change);
}

function handleRemoveFromCart(e) {
    const id = e.currentTarget.dataset.id;
    removeFromCart(id);
}

function changeCartQuantity(id, change) {
    const cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === id);
    
    if (itemIndex !== -1) {
        const newQuantity = cart[itemIndex].quantity + change;
        if (newQuantity <= 0) {
            cart.splice(itemIndex, 1);
        } else {
            cart[itemIndex].quantity = newQuantity;
        }
        saveCart(cart);
        showNotification(newQuantity <= 0 ? 'Товар удален из корзины' : 'Количество изменено');
    }
}

function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
    showNotification('Товар удален из корзины');
}

function addToCart() {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === currentGame.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: currentGame.id,
            name: currentGame.name,
            price: currentGame.price,
            quantity: 1
        });
    }
    
    saveCart(cart);
    showNotification(`🛒 ${currentGame.name} добавлена в корзину!`);
    
    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
        cartIcon.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 200);
    }
}

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

function initCartModal() {
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cartModal');
    const closeCartModalBtn = document.getElementById('closeCartModalBtn');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (!cartIcon || !cartModal) return;
    
    cartIcon.addEventListener('click', () => {
        updateCartModal();
        cartModal.classList.add('active');
    });
    
    if (closeCartModalBtn) {
        closeCartModalBtn.addEventListener('click', () => {
            cartModal.classList.remove('active');
        });
    }
    
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const cart = getCart();
            if (cart.length === 0) {
                showNotification('Корзина пуста!');
                return;
            }
            showNotification('🎉 Спасибо за заказ! Мы свяжемся с вами.');
            saveCart([]);
            cartModal.classList.remove('active');
        });
    }
}

function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// ========================================================================
// РЕЙТИНГ (С ВОЗМОЖНОСТЬЮ ПЕРЕОЦЕНКИ)
// ========================================================================
const RATING_KEY = `agefun_rating_${currentGame.id}`;
let selectedRating = 0;

// Загрузить сохранённый рейтинг
function loadRating() {
    const savedRating = localStorage.getItem(RATING_KEY);
    if (savedRating) {
        const { average, count } = JSON.parse(savedRating);
        updateRatingDisplay(average, count);
    }
}

// Обновить отображение рейтинга
function updateRatingDisplay(average, count) {
    const ratingValue = document.getElementById('ratingValue');
    if (ratingValue) {
        if (count > 0) {
            ratingValue.textContent = `${average} / 5 (${count} ${getDeclension(count, 'голос', 'голоса', 'голосов')})`;
        } else {
            ratingValue.textContent = 'Оценок пока нет';
        }
    }
}

// Склонение слов (1 голос, 2 голоса, 5 голосов)
function getDeclension(n, one, two, five) {
    n = Math.abs(n) % 100;
    if (n >= 5 && n <= 20) return five;
    n %= 10;
    if (n === 1) return one;
    if (n >= 2 && n <= 4) return two;
    return five;
}

// Подсветить выбранные звёзды
function highlightSelectedStars(rating) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('selected');
            star.textContent = '★';
        } else {
            star.classList.remove('selected');
            star.textContent = '☆';
        }
    });
}

// Инициализация рейтинга
function initRating() {
    const stars = document.querySelectorAll('.star');
    const submitBtn = document.getElementById('ratingSubmitBtn');
    
    if (!stars.length || !submitBtn) return;
    
    stars.forEach(star => {
        star.addEventListener('mouseenter', () => {
            const value = parseInt(star.dataset.value);
            highlightSelectedStars(value);
        });
        
        star.addEventListener('mouseleave', () => {
            highlightSelectedStars(selectedRating);
        });
        
        star.addEventListener('click', () => {
            selectedRating = parseInt(star.dataset.value);
            highlightSelectedStars(selectedRating);
        });
    });
    
    submitBtn.addEventListener('click', () => {
        if (selectedRating === 0) {
            showNotification('Выберите количество звезд!');
            return;
        }
        
        let savedRatingData = localStorage.getItem(RATING_KEY);
        let ratingData = savedRatingData ? JSON.parse(savedRatingData) : { total: 0, count: 0 };
        
        ratingData.total += selectedRating;
        ratingData.count += 1;
        const average = +(ratingData.total / ratingData.count).toFixed(1);
        
        localStorage.setItem(RATING_KEY, JSON.stringify({
            average: average,
            count: ratingData.count,
            total: ratingData.total
        }));
        
        updateRatingDisplay(average, ratingData.count);
        showNotification(`⭐ Вы оценили игру на ${selectedRating} из 5! Спасибо!`);
        
        // Сбрасываем выбранные звёзды после оценки
        selectedRating = 0;
        highlightSelectedStars(0);
    });
}

// ========================================================================
// ПЕРЕКЛЮЧЕНИЕ ТЕМЫ (ТЁМНАЯ / СВЕТЛАЯ)
// ========================================================================
function initTheme() {
    const themeSwitch = document.getElementById('theme-switch');
    if (!themeSwitch) return;
    
    const savedTheme = localStorage.getItem('agefun_theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('darkmode');
    }
    
    themeSwitch.addEventListener('click', () => {
        document.body.classList.toggle('darkmode');
        const isDark = document.body.classList.contains('darkmode');
        localStorage.setItem('agefun_theme', isDark ? 'dark' : 'light');
        updateFavoriteButton();   // Обновляем кнопку избранного при смене темы
    });
}

// ========================================================================
// ИНИЦИАЛИЗАЦИЯ
// ========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Избранное
    const favoriteBtn = document.getElementById('favoriteBtn');
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', toggleFavorite);
        updateFavoriteButton();
    }
    
    // Корзина
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', addToCart);
    }
    
    initCartModal();
    updateCartCount();
    loadRating();
    initRating();
    initTheme();
});