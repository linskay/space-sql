class SpaceSQL {
    constructor() {
        this.apiBaseUrl = 'http://localhost:8080/api';
        this.sqlKeywords = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'GROUP BY', 'ORDER BY', 'HAVING', 'INSERT', 'UPDATE', 'DELETE'];
        this.lessonCategories = [
            { id: 1, icon: 'fa-database', title: 'Основы SELECT' },
            { id: 2, icon: 'fa-code-branch', title: 'JOIN и отношения' },
            { id: 3, icon: 'fa-filter', title: 'Фильтрация данных' },
            { id: 4, icon: 'fa-sort-amount-up', title: 'Сортировка и агрегация' },
            { id: 5, icon: 'fa-edit', title: 'Изменение данных' },
            { id: 6, icon: 'fa-project-diagram', title: 'Подзапросы' }
        ];
        this.init();
    }

    init() {
        this.createCosmicEffects();
        this.setupMysticEye();
        this.loadLessons();
    }

    async loadLessons() {
        this.showLoader();
        try {
            const response = await fetch(`${this.apiBaseUrl}/lessons`);
            if (!response.ok) throw new Error('Ошибка загрузки уроков');
            const lessons = await response.json();

            // Объединяем категории с данными из БД
            const enhancedCategories = this.lessonCategories.map(category => {
                const lessonData = lessons.find(l => l.id == category.id) || {};
                return { ...category, ...lessonData };
            });

            this.renderLessons(enhancedCategories);
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.hideLoader();
        }
    }

    renderLessons(categories) {
        const container = document.querySelector('.links-container');
        container.innerHTML = categories.map(category => `
            <div class="link-card" data-lesson-id="${category.id}">
                <h3 class="link-title">
                    <i class="fas ${category.icon} link-icon"></i>
                    ${category.title}
                </h3>
                <p class="link-description">${category.description || this.getDefaultDescription(category.id)}</p>
                <div class="sql-query">${this.getCategoryExample(category.id)}</div>
                <a href="/lesson.html?id=${category.id}" class="link-url">Начать обучение</a>
            </div>
        `).join('');

        this.animateIcons();
    }

    getDefaultDescription(categoryId) {
        const descriptions = {
            1: 'Научитесь извлекать данные из таблиц с помощью базовых запросов SELECT.',
            2: 'Освойте соединение таблиц и работу с реляционными данными.',
            3: 'Научитесь точно фильтровать данные с помощью WHERE и HAVING.',
            4: 'Используйте ORDER BY и агрегатные функции для анализа данных.',
            5: 'Научитесь добавлять, изменять и удалять данные с помощью INSERT, UPDATE, DELETE.',
            6: 'Освойте мощь подзапросов для сложных выборок данных.'
        };
        return descriptions[categoryId] || 'Изучите новые возможности SQL';
    }

    getCategoryExample(categoryId) {
        const examples = {
            1: "SELECT * FROM galaxies WHERE stars > 1000000;",
            2: "SELECT u.name, o.total FROM users u JOIN orders o ON u.id = o.user_id;",
            3: "SELECT product, COUNT(*) FROM sales GROUP BY product HAVING COUNT(*) > 10;",
            4: "SELECT department, AVG(salary) FROM employees GROUP BY department ORDER BY AVG(salary) DESC;",
            5: "UPDATE products SET price = price * 1.1 WHERE category = 'electronics';",
            6: "SELECT name FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);"
        };
        return examples[categoryId] || "SELECT * FROM universe;";
    }

    animateIcons() {
        // Анимация для иконок @ (теперь их 6)
        const iconsContainer = document.querySelector('.sql-icons-container');
        iconsContainer.innerHTML = '';

        for (let i = 0; i < 6; i++) {
            const icon = document.createElement('div');
            icon.className = 'sql-icon';
            icon.textContent = '@';
            icon.style.left = `${Math.random() * 80 + 10}%`;
            icon.style.top = `${Math.random() * 80 + 10}%`;
            icon.style.animation = `float 3s ease-in-out ${i * 0.2}s infinite`;
            iconsContainer.appendChild(icon);
        }
    }

    getRandomSQLExample() {
        const examples = [
            "SELECT * FROM galaxies WHERE stars > 1000000;",
            "INSERT INTO planets (name, system) VALUES ('Кеплер-186f', 'Кеплер-186');",
            "UPDATE spaceships SET fuel = 100 WHERE status = 'active';"
        ];
        return examples[Math.floor(Math.random() * examples.length)];
    }

    createCosmicEffects() {
        // Создаем звезды
        const starsContainer = document.getElementById('stars');
        for (let i = 0; i < 300; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            starsContainer.appendChild(star);
        }

        // Создаем SQL-текст на фоне
        const sqlBg = document.getElementById('sql-bg');
        for (let i = 0; i < 30; i++) {
            const sqlText = document.createElement('div');
            sqlText.className = 'sql-text';
            sqlText.textContent = this.sqlKeywords[Math.floor(Math.random() * this.sqlKeywords.length)];
            sqlText.style.left = `${Math.random() * 90}%`;
            sqlText.style.top = `${Math.random() * 90}%`;
            sqlBg.appendChild(sqlText);
        }
    }

    setupMysticEye() {
        const eye = document.querySelector('.mystic-eye');
        eye.addEventListener('click', () => {
            this.createSQLBurst();
            alert('🚀 Подключение к космической базе данных установлено!');
        });
    }

    createSQLBurst() {
        for (let i = 0; i < 10; i++) {
            const sql = document.createElement('div');
            sql.className = 'sql-burst';
            sql.textContent = this.sqlKeywords[Math.floor(Math.random() * this.sqlKeywords.length)];
            sql.style.left = `${Math.random() * 70 + 15}%`;
            sql.style.top = `${Math.random() * 70 + 15}%`;
            document.body.appendChild(sql);
            setTimeout(() => sql.remove(), 2000);
        }
    }

    showLoader() {
        const loader = document.createElement('div');
        loader.className = 'loader-overlay';
        loader.innerHTML = `
            <div class="cosmic-loader">
                <div class="loader-circle"></div>
                <p class="loader-text">Загрузка космических данных...</p>
            </div>
        `;
        document.body.appendChild(loader);
    }

    hideLoader() {
        const loader = document.querySelector('.loader-overlay');
        if (loader) loader.remove();
    }

    showError(message) {
        const error = document.createElement('div');
        error.className = 'cosmic-error';
        error.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(error);
        setTimeout(() => error.remove(), 5000);
    }
}

// Добавляем стили для анимаций
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-15px) rotate(5deg); }
    }
    
    @keyframes sqlBurst {
        0% { transform: scale(0.5); opacity: 0; }
        50% { transform: scale(1.2); opacity: 1; }
        100% { transform: scale(0); opacity: 0; }
    }
    
    .sql-icon {
        position: absolute;
        font-size: 2.5rem;
        animation: float 3s ease-in-out infinite;
        opacity: 0.8;
        color: var(--sql-green);
        text-shadow: 0 0 10px var(--sql-green);
    }
    
    .sql-icon:nth-child(1) {
        top: -30px;
        left: 10%;
        animation-delay: 0s;
    }
    
    .sql-icon:nth-child(2) {
        top: 50px;
        right: 15%;
        animation-delay: 0.5s;
    }
    
    .sql-icon:nth-child(3) {
        bottom: -40px;
        left: 20%;
        animation-delay: 1s;
    }
    
    .sql-burst {
        position: fixed;
        color: var(--sql-green);
        font-size: 1.5rem;
        z-index: 999;
        pointer-events: none;
        text-shadow: 0 0 5px var(--sql-green);
        animation: sqlBurst 2s ease-out forwards;
    }

    .sql-icons-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    }
    
    footer {
        text-align: center;
        margin-top: 4rem;
        font-size: 1rem;
        color: var(--mystic-purple);
        padding: 1.5rem;
        border-top: 1px solid rgba(106, 0, 244, 0.3);
    }
    
    .team-name {
        color: var(--sql-green);
        font-weight: bold;
        text-shadow: 0 0 5px var(--sql-green);
        font-size: 1.1rem;
    }
    
    .link-url {
        transition: all 0.3s ease;
    }
    
    .link-url:hover {
        transform: scale(1.05);
        box-shadow: 0 0 15px var(--sql-green);
    }
`;
document.head.appendChild(additionalStyles);

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    new SpaceSQL();
});