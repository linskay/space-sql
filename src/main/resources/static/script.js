let currentLesson = null;
let tasks = [];
let currentTaskIndex = 0;
let schemaTimeout = null;

const motivationalMessages = [
    "SELECT * FROM success;",
    "Ты можешь больше, чем думаешь!",
    "JOIN усилий и практики приведет к мастерству!",
    "Каждый запрос - шаг к цели!",
    "WHERE есть желание - там путь!",
    "GROUP BY твоим достижениям!",
    "ORDER BY уровню мастерства DESC!",
    "Не бойся ошибок - они часть обучения!",
    "UPDATE твоих знаний каждый день!",
    "INSERT INTO практики VALUES (результат);",
    "DELETE FROM сомнений;",
    "CREATE TABLE успехов (id SERIAL PRIMARY KEY);",
    "ALTER TABLE навыков ADD COLUMN уверенность;",
    "Ты на правильном пути!",
    "С каждой задачей ты становишься лучше!",
    "Коммить свой прогресс!",
    "Индексы твоего роста растут!",
    "Транзакция обучения завершится успехом!",
    "Вид на твой прогресс впечатляет!",
    "Функция успеха() возвращает true!"
];

document.addEventListener('DOMContentLoaded', async () => {
    createFloatingSymbols();
    await loadLessons();
    setupEventListeners();
    checkAuthStatus();
    startMysticEyeMessages();
});

async function checkAuthStatus() {
    try {
        const response = await fetch('/api/auth/status');
        if (response.ok) {
            const user = await response.json();
            updateAuthUI(user);
        }
    } catch (error) {
        console.error('Auth check error:', error);
    }
}

function updateAuthUI(user) {
    const authButton = document.querySelector('.github-login');
    const userInfo = document.querySelector('.user-info');
    const avatar = document.querySelector('.user-avatar');
    const userName = document.querySelector('.user-name');

    if (user && user.authenticated) {
        authButton.style.display = 'none';
        userInfo.style.display = 'flex';
        avatar.src = user.avatarUrl || 'https://via.placeholder.com/40';
        userName.textContent = user.username || 'Пользователь';
    } else {
        authButton.style.display = 'flex';
        userInfo.style.display = 'none';
    }
}

function createFloatingSymbols() {
    const symbols = ['@', '#', '$', '%', '&', '*', ';', 'SELECT', 'FROM', 'WHERE', 'JOIN'];
    const container = document.body;

    for (let i = 0; i < 15; i++) {
        const symbol = document.createElement('div');
        symbol.className = 'floating-symbol';

        if (Math.random() < 0.3) {
            const keywords = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'GROUP BY', 'ORDER BY'];
            symbol.textContent = keywords[Math.floor(Math.random() * keywords.length)];
            symbol.classList.add('sql-keyword');
        } else {
            symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        }

        symbol.style.left = `${Math.random() * 90 + 5}%`;
        symbol.style.top = `${Math.random() * 90 + 5}%`;
        symbol.style.animationDelay = `${Math.random() * 5}s`;
        symbol.style.animationDuration = `${Math.random() * 6 + 4}s`;

        container.appendChild(symbol);
    }
}

function startMysticEyeMessages() {
    setTimeout(showRandomEyeMessage, 10000);
    setInterval(() => {
        if (Math.random() > 0.3) showRandomEyeMessage();
    }, 30000);
}

function showRandomEyeMessage() {
    const message = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    showEyeMessage(message);
}

function showEyeMessage(message) {
    const eye = document.getElementById('mystic-eye');
    const messageElement = document.createElement('div');
    messageElement.className = 'eye-message';
    messageElement.textContent = message;

    const oldMessage = eye.querySelector('.eye-message');
    if (oldMessage) oldMessage.remove();

    eye.appendChild(messageElement);

    setTimeout(() => {
        messageElement.remove();
    }, 6000);
}

async function loadLessons() {
    try {
        const response = await fetch('/api/lessons');
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

    const lessonIcons = {
        'Основы SQL': 'fa-database',
        'Работа с несколькими таблицами': 'fa-project-diagram',
        'Фильтрация и сортировка': 'fa-filter',
        'Модификация данных': 'fa-edit',
        'Продвинутые техники': 'fa-code-branch'
    };

    lessons.forEach(lesson => {
        const icon = lessonIcons[lesson.topic] || 'fa-star';
        const lessonCard = document.createElement('div');
        lessonCard.className = 'link-card';
        lessonCard.innerHTML = `
            <h3 class="link-title">
                <i class="fas ${icon} link-icon"></i>
                ${lesson.title}
            </h3>
            <p class="link-description">${lesson.description}</p>
            <div class="sql-query">${getExampleQuery(lesson.topic)}</div>
            <button class="link-url start-lesson" data-id="${lesson.id}">
                ${getButtonText(lesson.topic)}
            </button>
        `;
        container.appendChild(lessonCard);
    });
}

function getExampleQuery(topic) {
    const examples = {
        'Основы SQL': "SELECT * FROM users WHERE age > 25;",
        'Фильтрация': "SELECT * FROM products WHERE price > 1000;",
        'Сортировка': "SELECT * FROM products ORDER BY price DESC;",
        'Агрегация': "SELECT department, AVG(salary) FROM employees GROUP BY department;",
        'Модификация': "UPDATE products SET price = price * 1.1 WHERE category = 'electronics';",
        'Подзапросы': "SELECT name FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);"
    };

    for (const [key, query] of Object.entries(examples)) {
        if (topic.includes(key)) return query;
    }
    return "SELECT * FROM table;";
}

function getButtonText(topic) {
    const texts = {
        'Основы SQL': "Начать обучение",
        'Фильтрация': "Фильтровать данные",
        'Сортировка': "Сортировать данные",
        'Агрегация': "Анализировать",
        'Модификация': "Моделировать",
        'Подзапросы': "Использовать подзапросы"
    };

    for (const [key, text] of Object.entries(texts)) {
        if (topic.includes(key)) return text;
    }
    return "Начать урок";
}

async function loadLessonDetails(lessonId) {
    try {
        const [lessonResponse, tasksResponse] = await Promise.all([
            fetch(`/api/lessons/${lessonId}`),
            fetch(`/api/lessons/${lessonId}/tasks`)
        ]);

        if (!lessonResponse.ok || !tasksResponse.ok) {
            throw new Error('Ошибка загрузки данных урока');
        }

        currentLesson = await lessonResponse.json();
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

async function showTask(taskIndex) {
    if (taskIndex < 0 || taskIndex >= tasks.length) return;

    currentTaskIndex = taskIndex;
    const task = tasks[taskIndex];

    document.getElementById('lesson-title').innerHTML = `
        <i class="fas ${getLessonIcon(currentLesson.topic)}"></i> ${currentLesson.title}
    `;
    document.getElementById('lesson-description').textContent = currentLesson.description;

    const taskContainer = document.querySelector('.task-container');
    taskContainer.querySelector('.task-title').textContent = task.title;
    taskContainer.querySelector('.task-counter').textContent = `Задание ${currentTaskIndex + 1} из ${tasks.length}`;
    taskContainer.querySelector('.task-description').textContent = task.description;
    taskContainer.querySelector('.schema-definition').textContent = task.schemaDefinition;

    try {
        const response = await fetch(`/api/tasks/${task.id}/examples`);
        if (response.ok) {
            const exampleData = await response.json();
            displayExampleData(exampleData);
        } else {
            displayGeneratedExampleData(task.schemaDefinition, task.description);
        }
    } catch (error) {
        console.error('Ошибка загрузки примеров данных:', error);
        displayGeneratedExampleData(task.schemaDefinition, task.description);
    }

    document.getElementById('lessons-container').style.display = 'none';
    document.getElementById('lesson-details').style.display = 'block';
    document.getElementById('query-result').style.display = 'none';
    document.getElementById('query-input').value = '';
}

function displayExampleData(exampleData) {
    const container = document.querySelector('.example-data-content');

    if (exampleData && exampleData.rows && exampleData.rows.length > 0) {
        const columns = Object.keys(exampleData.rows[0]);
        let html = `<div class="scrollable-table"><table class="example-table"><thead><tr>`;

        columns.forEach(col => {
            html += `<th>${col}</th>`;
        });
        html += `</tr></thead><tbody>`;

        exampleData.rows.forEach((row, idx) => {
            html += `<tr${idx % 2 === 0 ? ' class="even-row"' : ''}>`;
            columns.forEach(col => {
                html += `<td>${row[col] ?? 'NULL'}</td>`;
            });
            html += `</tr>`;
        });

        html += `</tbody></table></div>`;
        container.innerHTML = html;
    } else {
        container.innerHTML = '<p>Пример данных не доступен</p>';
    }
}

function displayGeneratedExampleData(schemaDefinition, description) {
    const container = document.querySelector('.example-data-content');
    container.innerHTML = generateExampleData(schemaDefinition, description);
}

function generateExampleData(schemaDefinition, description) {
    const tables = parseSchema(schemaDefinition);
    if (tables.length === 0) return '<p>Нет данных для отображения</p>';

    const table = tables[0];
    const rows = [];
    const fieldsToShow = detectRelevantFields(description, table.columns);

    for (let i = 1; i <= 5; i++) {
        const row = {};
        fieldsToShow.forEach(col => {
            row[col.name] = generateFieldValue(col, i);
        });
        rows.push(row);
    }

    let html = `<div class="scrollable-table"><table class="example-table"><thead><tr>`;
    fieldsToShow.forEach(col => {
        html += `<th>${col.name}</th>`;
    });
    html += `</tr></thead><tbody>`;

    rows.forEach((row, idx) => {
        html += `<tr${idx % 2 === 0 ? ' class="even-row"' : ''}>`;
        fieldsToShow.forEach(col => {
            html += `<td>${row[col.name] ?? 'NULL'}</td>`;
        });
        html += `</tr>`;
    });

    html += `</tbody></table></div>`;
    return html;
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

function detectRelevantFields(description, columns) {
    const mentionedFields = columns.filter(col =>
        description.toLowerCase().includes(col.name.toLowerCase())
    );
    return mentionedFields.length > 0 ? mentionedFields : columns.slice(0, Math.min(5, columns.length));
}

function generateFieldValue(column, index) {
    const colName = column.name.toLowerCase();
    const colType = column.type.toLowerCase();

    if (colName.includes('id')) return index;
    if (colName.includes('name')) return ['Иван', 'Мария', 'Алексей', 'Елена', 'Дмитрий'][index % 5];
    if (colName.includes('email')) return `user${index}@example.com`;
    if (colName.includes('age')) return 20 + index * 5;
    if (colName.includes('date')) return new Date(2023, index % 12, (index % 28) + 1).toISOString().split('T')[0];
    if (colType.includes('int')) return index * 10;
    if (colType.includes('varchar') || colType.includes('text')) return `Значение ${index}`;
    if (colType.includes('bool')) return index % 2 === 0 ? 'true' : 'false';
    return `Данные ${index}`;
}

async function checkQuery() {
    const task = tasks[currentTaskIndex];
    if (!task) {
        showResult('Задание не загружено', false);
        return;
    }

    const query = document.getElementById('query-input').value.trim();
    if (!query) {
        showResult('Введите SQL запрос', false);
        return;
    }

    try {
        const response = await fetch('/api/tasks/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                taskId: task.id,
                query: query
            })
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'Ошибка сервера');
        }

        showResult(result.message, result.correct);
        if (result.correct) {
            createJoinEffect();
        }
    } catch (error) {
        showResult(error.message || 'Ошибка при проверке запроса', false);
    }
}

function showResult(message, isSuccess) {
    const container = document.getElementById('query-result');
    const content = container.querySelector('.result-content');

    content.innerHTML = `
        <i class="fas ${isSuccess ? 'fa-check-circle' : 'fa-times-circle'}"></i>
        ${message}
    `;
    container.className = `result-container ${isSuccess ? 'success' : 'error'}`;
    container.style.display = 'block';
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

    schemaContent.innerHTML = html || '<p>Схема не доступна</p>';
    modal.style.display = 'block';
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

function setupEventListeners() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('start-lesson')) {
            const lessonId = e.target.getAttribute('data-id');
            loadLessonDetails(lessonId);
        }
    });

    document.getElementById('back-button').addEventListener('click', () => {
        document.getElementById('lesson-details').style.display = 'none';
        document.getElementById('lessons-container').style.display = 'grid';
    });

    document.getElementById('show-schema').addEventListener('click', () => {
        if (tasks[currentTaskIndex]) {
            showDatabaseSchema(tasks[currentTaskIndex].schemaDefinition);
        }
    });

    document.getElementById('query-submit').addEventListener('click', checkQuery);

    document.getElementById('query-input').addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            checkQuery();
        }
    });

    document.getElementById('mystic-eye').addEventListener('click', function() {
        const helpModal = document.getElementById('help-modal');
        helpModal.style.display = 'block';

        if (Math.random() > 0.5) {
            showRandomEyeMessage();
        }
    });

    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    });
}