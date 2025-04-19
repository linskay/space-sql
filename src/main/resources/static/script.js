let currentLesson = null;
let tasks = [];
let currentTaskIndex = 0;
let schemaTimeout = null;

document.addEventListener('DOMContentLoaded', async function () {
    createFloatingSymbols();
    await loadLessons();
    setupEventListeners();
});

function createFloatingSymbols() {
    const symbols = ['@', '#', '$', '%', '&', '*', ';'];
    const container = document.body;

    for (let i = 0; i < 12; i++) {
        const symbol = document.createElement('div');
        symbol.className = 'floating-symbol';
        symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];

        symbol.style.left = `${Math.random() * 90 + 5}%`;
        symbol.style.top = `${Math.random() * 90 + 5}%`;
        symbol.style.animationDelay = `${Math.random() * 5}s`;
        symbol.style.animationDuration = `${Math.random() * 6 + 4}s`;

        container.appendChild(symbol);
    }
}

function createJoinEffect() {
    const keywords = ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN', 'CROSS JOIN'];
    const colors = ['#00ff9d', '#00ffff', '#9d00ff', '#ff00ff', '#2b00ff'];

    for (let i = 0; i < 4; i++) {
        setTimeout(() => {
            const effect = document.createElement('div');
            effect.className = 'join-effect';
            effect.textContent = keywords[Math.floor(Math.random() * keywords.length)];
            effect.style.color = colors[Math.floor(Math.random() * colors.length)];
            effect.style.left = `${Math.random() * 70 + 15}%`;
            effect.style.top = `${Math.random() * 70 + 15}%`;

            document.body.appendChild(effect);

            setTimeout(() => {
                effect.remove();
            }, 1500);
        }, i * 400);
    }
}

function createSqlKeywordsEffect() {
    const keywords = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'GROUP BY', 'ORDER BY', 'INSERT', 'UPDATE', 'DELETE'];
    const colors = ['#00ff9d', '#00ffff', '#9d00ff', '#ff00ff', '#2b00ff'];

    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const effect = document.createElement('div');
            effect.className = 'join-effect';
            effect.textContent = keywords[Math.floor(Math.random() * keywords.length)];
            effect.style.color = colors[Math.floor(Math.random() * colors.length)];
            effect.style.left = `${Math.random() * 70 + 15}%`;
            effect.style.top = `${Math.random() * 70 + 15}%`;

            document.body.appendChild(effect);

            setTimeout(() => {
                effect.remove();
            }, 1500);
        }, i * 200);
    }
}

async function loadLessons() {
    try {
        const response = await fetch('http://localhost:8080/api/lessons');
        if (!response.ok) throw new Error('Ошибка загрузки уроков');

        const lessons = await response.json();
        displayLessons(lessons);
    } catch (error) {
        console.error('Ошибка:', error);
        showError('Не удалось загрузить уроки');
    }
}

function displayLessons(lessons) {
    const container = document.getElementById('lessons-container');
    container.innerHTML = '';

    const lessonTemplates = [
        {
            title: "Основы SELECT",
            description: "Научитесь извлекать данные из таблиц с помощью базовых запросов SELECT",
            query: "SELECT * FROM users WHERE age > 25;",
            icon: "fa-database",
            buttonText: "Начать обучение"
        },
        {
            title: "Сортировка и агрегация",
            description: "Используйте ORDER BY и агрегатные функции для анализа данных",
            query: "SELECT department, AVG(salary) FROM employees GROUP BY department ORDER BY AVG(salary) DESC;",
            icon: "fa-sort-amount-down",
            buttonText: "Анализировать"
        },
        {
            title: "JOIN и отношения",
            description: "Освойте соединение таблиц и работу с реляционными данными",
            query: "SELECT u.name, o.total FROM users u JOIN orders o ON u.id = o.user_id;",
            icon: "fa-project-diagram",
            buttonText: "Изучить JOIN"
        },
        {
            title: "Изменение данных",
            description: "Научитесь добавлять, изменять и удалять данные с помощью INSERT, UPDATE, DELETE",
            query: "UPDATE products SET price = price * 1.1 WHERE category = 'electronics';",
            icon: "fa-edit",
            buttonText: "Моделировать"
        },
        {
            title: "Фильтрация данных",
            description: "Научитесь точно фильтровать данные с помощью WHERE и HAVING",
            query: "SELECT product, COUNT(*) FROM sales GROUP BY product HAVING COUNT(*) > 10;",
            icon: "fa-filter",
            buttonText: "Фильтровать"
        },
        {
            title: "Подзапросы",
            description: "Освойте мощь подзапросов для сложных выборок данных",
            query: "SELECT name FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);",
            icon: "fa-code-branch",
            buttonText: "Использовать подзапросы"
        }
    ];

    lessonTemplates.forEach((template, index) => {
        const lesson = lessons[index] || {};
        const lessonCard = document.createElement('div');
        lessonCard.className = 'link-card';

        lessonCard.innerHTML = `
            <h3 class="link-title">
                <i class="fas ${template.icon} link-icon"></i>
                ${template.title}
            </h3>
            <p class="link-description">${template.description}</p>
            <div class="sql-query">${template.query}</div>
            <button class="link-url start-lesson" data-id="${lesson.id || index}">
                ${template.buttonText}
            </button>
        `;
        container.appendChild(lessonCard);
    });
}

async function loadLessonDetails(lessonId) {
    try {
        const response = await fetch(`http://localhost:8080/api/lessons/${lessonId}`);
        if (!response.ok) throw new Error('Ошибка загрузки урока');

        currentLesson = await response.json();

        const tasksResponse = await fetch(`http://localhost:8080/api/lessons/${lessonId}/tasks`);
        if (!tasksResponse.ok) throw new Error('Ошибка загрузки заданий');

        tasks = await tasksResponse.json();

        if (tasks.length === 0) {
            throw new Error('Для этого урока нет заданий');
        }

        showTask(0);
    } catch (error) {
        console.error('Ошибка:', error);
        showResult(error.message, false);
    }
}

function showTask(taskIndex) {
    if (taskIndex < 0 || taskIndex >= tasks.length) return;

    currentTaskIndex = taskIndex;
    const task = tasks[taskIndex];

    document.getElementById('lesson-title').innerHTML = `
        <i class="fas ${getLessonIcon(currentLesson.topic)}"></i> ${currentLesson.title}
    `;
    document.getElementById('lesson-description').textContent = currentLesson.description;

    const taskContainer = document.querySelector('.task-container');
    taskContainer.querySelector('.task-title').textContent = task.title || 'Задание';
    taskContainer.querySelector('.task-counter').textContent = `Задание ${currentTaskIndex + 1} из ${tasks.length}`;
    taskContainer.querySelector('.task-description').textContent = task.description || 'Описание отсутствует';
    taskContainer.querySelector('.schema-definition').textContent = task.schemaDefinition || 'Схема не предоставлена';

    document.getElementById('lessons-container').style.display = 'none';
    document.getElementById('lesson-details').style.display = 'block';
    document.getElementById('query-result').style.display = 'none';
    document.getElementById('query-input').value = '';
}

function showDatabaseSchema(schemaDefinition) {
    const modal = document.getElementById('schema-modal');
    const schemaContent = document.getElementById('schema-content');

    const tables = parseSchema(schemaDefinition);

    let html = '';
    tables.forEach(table => {
        html += `
            <div class="schema-table-container">
                <h4>Таблица: ${table.name}</h4>
                <table class="schema-table">
                    <thead>
                        <tr>
                            <th>Поле</th>
                            <th>Тип</th>
                            <th>Описание</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${table.columns.map(col => `
                            <tr>
                                <td>${col.name}</td>
                                <td>${col.type}</td>
                                <td>${col.primaryKey ? 'PRIMARY KEY' : ''}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    });

    schemaContent.innerHTML = html;
    modal.style.display = 'block';

    clearTimeout(schemaTimeout);
    schemaTimeout = setTimeout(() => {
        modal.style.display = 'none';
    }, 3000);
}

function showHelpModal() {
    const modal = document.getElementById('help-modal');
    modal.style.display = 'block';
    createSqlKeywordsEffect();
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function parseSchema(schemaDefinition) {
    const tables = [];
    const tableRegex = /CREATE TABLE (\w+)\s*\(([^)]+)\)/g;
    let match;

    while ((match = tableRegex.exec(schemaDefinition)) !== null) {
        const tableName = match[1];
        const columnsDef = match[2];
        const columns = [];

        columnsDef.split(',').forEach(colDef => {
            colDef = colDef.trim();
            if (colDef) {
                const parts = colDef.split(/\s+/);
                const name = parts[0];
                const type = parts[1];
                const isPrimary = colDef.includes('PRIMARY KEY');

                columns.push({
                    name: name,
                    type: type,
                    primaryKey: isPrimary
                });
            }
        });

        tables.push({
            name: tableName,
            columns: columns
        });
    }

    return tables;
}

async function checkQuery() {
    const task = tasks[currentTaskIndex];
    if (!task) {
        showResult('Задание не загружено', false);
        return;
    }

    const userQuery = document.getElementById('query-input').value.trim();
    if (!userQuery) {
        showResult('Введите SQL запрос', false);
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/api/query/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                taskId: task.id,
                userQuery: userQuery
            })
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.message || 'Ошибка сервера');

        showResult(result.message, result.correct);

        if (result.correct) {
            createJoinEffect();
        }
    } catch (error) {
        showResult(`Ошибка: ${error.message}`, false);
    }
}

function showResult(message, isSuccess) {
    const resultContainer = document.getElementById('query-result');
    const resultContent = resultContainer.querySelector('.result-content');

    resultContent.innerHTML = `
        <i class="fas ${isSuccess ? 'fa-check-circle' : 'fa-times-circle'}"></i>
        ${message}
    `;
    resultContainer.className = `result-container ${isSuccess ? 'success' : 'error'}`;
    resultContainer.style.display = 'block';
}

function showError(message) {
    const container = document.getElementById('lessons-container');
    container.innerHTML = `
        <div class="link-card" style="grid-column: 1 / -1; text-align: center;">
            <h3 class="link-title"><i class="fas fa-exclamation-triangle"></i> Ошибка</h3>
            <p>${message}</p>
            <button class="link-url" onclick="location.reload()">
                <i class="fas fa-sync-alt"></i> Попробовать снова
            </button>
        </div>
    `;
}

// Получить иконку для урока
function getLessonIcon(topic) {
    const icons = {
        'SELECT': 'fa-database',
        'JOIN': 'fa-project-diagram',
        'INSERT': 'fa-plus-circle',
        'UPDATE': 'fa-edit',
        'DELETE': 'fa-trash-alt',
        'WHERE': 'fa-filter',
        'GROUP BY': 'fa-chart-bar',
        'default': 'fa-star'
    };

    if (!topic) return icons.default;

    topic = topic.toUpperCase();
    for (const [key, icon] of Object.entries(icons)) {
        if (topic.includes(key)) return icon;
    }

    return icons.default;
}

function setupEventListeners() {
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('start-lesson')) {
            const lessonId = e.target.getAttribute('data-id');
            loadLessonDetails(lessonId);
        }
    });

    document.getElementById('back-button').addEventListener('click', function () {
        document.getElementById('lesson-details').style.display = 'none';
        document.getElementById('lessons-container').style.display = 'grid';
    });

    document.getElementById('show-schema').addEventListener('click', function () {
        if (tasks[currentTaskIndex]) {
            showDatabaseSchema(tasks[currentTaskIndex].schemaDefinition);
        }
    });

    document.getElementById('mystic-eye').addEventListener('click', showHelpModal);

    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function () {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
        });
    });

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function (e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    });

    document.getElementById('query-submit').addEventListener('click', checkQuery);

    document.getElementById('query-input').addEventListener('keydown', function (e) {
        if (e.ctrlKey && e.key === 'Enter') {
            checkQuery();
        }
    });
}