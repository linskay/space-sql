class LessonPage {
    constructor() {
        this.lessonId = new URLSearchParams(window.location.search).get('id');
        this.apiBaseUrl = 'http://localhost:8080/api';
        this.taskExamples = {
            1: this.generateSelectTasks(),
            2: this.generateJoinTasks(),
            3: this.generateFilterTasks(),
            4: this.generateAggregationTasks(),
            5: this.generateModificationTasks(),
            6: this.generateSubqueryTasks()
        };
        this.init();
    }

    generateSelectTasks() {
        // Генерация 10 задач для SELECT
        return [...Array(10)].map((_, i) => ({
            id: `select_${i+1}`,
            title: `Задача SELECT ${i+1}`,
            description: `Извлеките данные ${i+1} из таблицы согласно условию`,
            schemaDefinition: `CREATE TABLE planets(id INT, name VARCHAR(50), system VARCHAR(50));\nINSERT INTO planets VALUES ${this.generatePlanetData(5)};`,
            solutionQuery: `SELECT * FROM planets WHERE ${i%2 ? 'id > 3' : 'name LIKE "%a%"'};`
        }));
    }

    generateJoinTasks() {
        // Генерация 10 задач для JOIN
        return [...Array(10)].map((_, i) => ({
            id: `join_${i+1}`,
            title: `Задача JOIN ${i+1}`,
            description: `Соедините таблицы ${i+1} согласно условию`,
            schemaDefinition: `CREATE TABLE users(id INT, name VARCHAR(50));\nCREATE TABLE orders(id INT, user_id INT, amount DECIMAL(10,2));\n${this.generateUserOrderData(5)}`,
            solutionQuery: `SELECT u.name, o.amount FROM users u JOIN orders o ON u.id = o.user_id${i%2 ? ' WHERE o.amount > 100' : ''};`
        }));
    }

    async init() {
        this.createCosmicBackground();
        this.setupBackButton();
        await this.loadLesson();
        this.setupTaskButtons();
    }

    async loadLesson() {
        this.showLoader();
        try {
            const response = await fetch(`${this.apiBaseUrl}/lessons/${this.lessonId}`);
            if (!response.ok) throw new Error('Урок не найден');

            const lesson = await response.json();
            this.renderLesson(lesson);
        } catch (error) {
            this.showError(error.message);
            setTimeout(() => window.location.href = '/', 3000);
        } finally {
            this.hideLoader();
        }
    }

    renderLesson(lesson) {
        document.getElementById('lesson-title').textContent = lesson.title;
        document.getElementById('lesson-description').textContent = lesson.description;

        const container = document.getElementById('tasks-container');
        container.innerHTML = lesson.tasks.map(task => `
            <div class="task-card" data-task-id="${task.id}">
                <h3><i class="fas fa-tasks"></i> ${task.title}</h3>
                <p>${task.description}</p>
                <pre class="sql-schema">${task.schemaDefinition}</pre>
                <textarea class="sql-editor" placeholder="Введите ваш SQL запрос..."></textarea>
                <button class="btn check-solution-btn">
                    <i class="fas fa-rocket"></i> Проверить решение
                </button>
                <div class="result-container"></div>
            </div>
        `).join('');
    }

    setupTaskButtons() {
        document.querySelectorAll('.check-solution-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const taskCard = btn.closest('.task-card');
                const taskId = taskCard.dataset.taskId;
                const query = taskCard.querySelector('.sql-editor').value;
                const resultContainer = taskCard.querySelector('.result-container');

                if (!query.trim()) {
                    this.showResult(resultContainer, false, 'Введите SQL запрос');
                    return;
                }

                this.showLoader();
                try {
                    const response = await fetch(`${this.apiBaseUrl}/query/check`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            taskId: taskId,
                            userQuery: query
                        })
                    });

                    if (!response.ok) throw new Error('Ошибка проверки');
                    const result = await response.json();
                    this.showResult(resultContainer, result.isCorrect, result.feedback, result.expectedQuery);
                } catch (error) {
                    this.showResult(resultContainer, false, 'Ошибка сервера');
                } finally {
                    this.hideLoader();
                }
            });
        });
    }

    showResult(container, isCorrect, message, expectedQuery = null) {
        container.innerHTML = `
            <div class="alert ${isCorrect ? 'alert-success' : 'alert-error'}">
                <i class="fas ${isCorrect ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                ${message}
                ${!isCorrect && expectedQuery ? `
                    <div class="expected-query">
                        <p>Ожидаемый запрос:</p>
                        <pre>${expectedQuery}</pre>
                    </div>
                ` : ''}
            </div>
        `;
    }

    createCosmicBackground() {
        const starsContainer = document.createElement('div');
        starsContainer.className = 'stars';
        document.body.prepend(starsContainer);

        for (let i = 0; i < 200; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            starsContainer.appendChild(star);
        }
    }

    setupBackButton() {
        document.getElementById('back-btn').addEventListener('click', () => {
            window.location.href = '/';
        });
    }

    showLoader() {
        const loader = document.createElement('div');
        loader.className = 'loader-overlay';
        loader.innerHTML = `
            <div class="cosmic-loader">
                <div class="loader-circle"></div>
                <p class="loader-text">Отправка запроса в космос...</p>
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

document.addEventListener('DOMContentLoaded', () => {
    new LessonPage();
});