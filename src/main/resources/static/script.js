let currentLesson = null;
let tasks = [];
let currentTaskIndex = 0;
let schemaTimeout = null;
let isEyeAnimationEnabled = true;

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

const SQL_KEYWORDS = [
    'SELECT', 'FROM', 'WHERE', 'JOIN', 'INNER JOIN', 'LEFT JOIN',
    'RIGHT JOIN', 'GROUP BY', 'ORDER BY', 'HAVING', 'INSERT INTO',
    'UPDATE', 'DELETE FROM', 'CREATE TABLE', 'ALTER TABLE', 'DROP TABLE',
    'AND', 'OR', 'NOT', 'IN', 'BETWEEN', 'LIKE', 'IS NULL', 'COUNT',
    'SUM', 'AVG', 'MIN', 'MAX', 'DISTINCT', 'AS', 'LIMIT', 'OFFSET'
];

// Основная функция инициализации
async function initializeApp() {
    createFloatingSymbols();
    await loadLessons();
    setupEventListeners();
    await checkAuthStatus();
    startMysticEyeMessages();
    setupQueryInput();
}

// Функции аутентификации
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

// Функции работы с уроками
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
    if (!container) return;

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

// Функции работы с заданиями
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
    if (!container) return;

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
    if (!container) return;
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
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': getCsrfToken()
            },
            credentials: 'include',
            body: JSON.stringify({
                taskId: task.id,
                userQuery: query
            })
        });

        const result = await response.json();

        if (!response.ok) {
            showResult(result.feedback || 'Ошибка сервера', false, result);
            return;
        }

        const isCorrect = result.correct || result.isCorrect || false;
        const feedback = result.feedback || result.message || (isCorrect ? 'Запрос верный!' : 'Запрос неверный');
        const expectedQuery = result.expectedQuery || null;

        showResult(feedback, isCorrect, {
            expectedQuery: expectedQuery
        });

        if (isCorrect) {
            document.getElementById('query-input').value = '';
        }
    } catch (error) {
        console.error('Ошибка:', error);
        showResult('Произошла ошибка при проверке запроса', false);
    }
}

function getCsrfToken() {
    return document.cookie
        .split('; ')
        .find(row => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1] || '';
}

function showResult(message, isSuccess, resultData = {}) {
    const container = document.getElementById('query-result');
    if (!container) return;

    container.className = 'result-container';
    container.classList.add(isSuccess ? 'success' : 'error');
    container.style.display = 'block';

    let contentHTML = `
        <div class="result-content">
            <i class="fas ${isSuccess ? 'fa-check-circle' : 'fa-times-circle'}"></i>
            <div class="result-message">${message}</div>
    `;

    if (!isSuccess && resultData.expectedQuery) {
        contentHTML += `
            <div class="expected-query">
                <h4>Ожидаемый запрос:</h4>
                <pre>${resultData.expectedQuery}</pre>
            </div>
        `;
    }

    if (isSuccess) {
        if (currentTaskIndex < tasks.length - 1) {
            contentHTML += `
                <button id="next-task-btn" class="next-task-button">
                    Следующее задание <i class="fas fa-arrow-right"></i>
                </button>
            `;
        } else {
            contentHTML += `
                <div class="lesson-complete">
                    🎉 Поздравляем! Вы завершили урок
                </div>
            `;
        }
    }

    contentHTML += `</div>`;
    container.innerHTML = contentHTML;

    const nextBtn = document.getElementById('next-task-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            resetVisualization();
            showTask(currentTaskIndex + 1);
            container.style.display = 'none';
        });
    }

    if (isSuccess) {
        createSuccessEffects();
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

// Функции работы с UI
function setupQueryInput() {
    const queryInput = document.getElementById('query-input');
    const hintsContainer = document.getElementById('query-hints');

    queryInput.addEventListener('input', function() {
        const cursorPos = this.selectionStart;
        const textBeforeCursor = this.value.substring(0, cursorPos);
        const lastWord = textBeforeCursor.split(/\s+/).pop().toUpperCase();

        if (lastWord.length > 1) {
            const matchingKeywords = SQL_KEYWORDS.filter(kw =>
                kw.startsWith(lastWord)
            );

            if (matchingKeywords.length > 0) {
                hintsContainer.innerHTML = matchingKeywords.map(kw =>
                    `<span class="query-hint">${kw}</span>`
                ).join('');
                hintsContainer.style.display = 'block';
            } else {
                hintsContainer.style.display = 'none';
            }
        } else {
            hintsContainer.style.display = 'none';
        }
    });

    queryInput.addEventListener('keydown', function(e) {
        if (e.key === 'Tab' && hintsContainer.style.display === 'block') {
            e.preventDefault();
            const hint = hintsContainer.querySelector('.query-hint');
            if (hint) {
                const wordToComplete = hint.textContent;
                const cursorPos = this.selectionStart;
                const textBeforeCursor = this.value.substring(0, cursorPos);
                const lastSpacePos = textBeforeCursor.lastIndexOf(' ');
                const textToInsert = wordToComplete.substring(
                    textBeforeCursor.substring(lastSpacePos + 1).length
                );

                this.value = this.value.substring(0, cursorPos) +
                    textToInsert +
                    this.value.substring(cursorPos);
                this.selectionStart = cursorPos + textToInsert.length;
                this.selectionEnd = cursorPos + textToInsert.length;
                hintsContainer.style.display = 'none';
            }
        }
    });

    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    queryInput.parentNode.insertBefore(cursor, queryInput.nextSibling);

    const submitBtn = document.getElementById('query-submit');
    submitBtn.addEventListener('click', async () => {
        const query = queryInput.value.trim();
        if (!query) return;
        // Космическая визуализация
        const visContainer = document.getElementById('visualizationContainer');
        visContainer.classList.add('active');
        visualizeQuery(query);
        // Ждем завершения анимации (1.3 сек), только потом проверяем запрос и показываем результат
        await new Promise(res => setTimeout(res, 1300));
        await checkQuery();
        visContainer.classList.remove('active');
    });
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

    document.getElementById('query-input').addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            checkQuery();
        }
    });

    document.getElementById('mystic-eye').addEventListener('click', function() {
        const helpModal = document.getElementById('help-modal');
        helpModal.style.display = 'block';

        if (isEyeAnimationEnabled) {
            createJoinEffect();
            if (Math.random() > 0.5) {
                showRandomEyeMessage();
            }
        }
        isEyeAnimationEnabled = !isEyeAnimationEnabled;
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
    if (!container) return;

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

// Эффекты и анимации
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
    if (!eye) return;

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

function createSuccessEffects() {
    const effectsContainer = document.querySelector('.success-effects');
    if (!effectsContainer) return;

    createJoinEffect();

    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const effect = document.createElement('div');
            effect.className = 'floating-symbol success-symbol';
            effect.innerHTML = ['✓', '✔', '⭐', '🎉', '👏'][Math.floor(Math.random() * 5)];
            effect.style.color = ['#00ff9d', '#00ffff', '#9d00ff', '#ff00ff', '#2b00ff'][Math.floor(Math.random() * 5)];
            effect.style.left = `${Math.random() * 70 + 15}%`;
            effect.style.top = `${Math.random() * 70 + 15}%`;
            effect.style.fontSize = `${Math.random() * 1 + 1.5}rem`;
            effectsContainer.appendChild(effect);

            setTimeout(() => {
                effect.remove();
            }, 2000);
        }, i * 200);
    }
}

function createJoinEffect() {
    const keywords = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'GROUP BY', 'ORDER BY',
        'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'ALTER'];
    const colors = ['#00ff9d', '#00ffff', '#9d00ff', '#ff00ff', '#2b00ff'];

    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const effect = document.createElement('div');
            effect.className = 'join-effect';
            effect.textContent = keywords[Math.floor(Math.random() * keywords.length)];
            effect.style.color = colors[Math.floor(Math.random() * colors.length)];
            effect.style.left = `${Math.random() * 70 + 15}%`;
            effect.style.top = `${Math.random() * 70 + 15}%`;
            effect.style.fontSize = `${Math.random() * 2 + 1.5}rem`;

            document.body.appendChild(effect);

            setTimeout(() => {
                effect.remove();
            }, 1500);
        }, i * 200);
    }
}

// Космическая визуализация запроса
function visualizeQuery(sqlQuery) {
    const container = document.getElementById('visualizationContainer');
    container.innerHTML = '';

    // Смайлик-пользователь 👨‍💻 + подпись
    const userBlock = document.createElement('div');
    userBlock.className = 'cosmo-user';
    userBlock.innerHTML = '<span class="user-emoji">👨‍💻</span><div class="user-label">Вы</div>';
    container.appendChild(userBlock);

    // Найти блок примера данных (БД)
    const dbSidebar = document.querySelector('.data-example-sidebar');
    if (!dbSidebar) return;

    // Получить координаты блока БД относительно visualizationContainer
    const visRect = container.getBoundingClientRect();
    const dbRect = dbSidebar.getBoundingClientRect();
    const offsetLeft = dbRect.left - visRect.left;
    const offsetTop = dbRect.top - visRect.top;
    const dbWidth = dbRect.width;
    const dbHeight = dbRect.height;

    // Динамически создать подпись <сервер> над примером данных (появляется только на время анимации)
    const serverLabel = document.createElement('div');
    serverLabel.className = 'server-label cosmo-server-label-anim';
    serverLabel.textContent = '</сервер>';
    serverLabel.style.left = (offsetLeft + dbWidth/2) + 'px';
    serverLabel.style.top = (offsetTop - 38) + 'px';
    serverLabel.style.opacity = '0';
    serverLabel.style.position = 'absolute';
    serverLabel.style.transform = 'translateX(-50%)';
    container.appendChild(serverLabel);

    // Неоновое облако вокруг блока БД
    const dbGlow = document.createElement('div');
    dbGlow.className = 'cosmo-db-glow';
    dbGlow.style.left = offsetLeft + 'px';
    dbGlow.style.top = offsetTop + 'px';
    dbGlow.style.width = dbWidth + 'px';
    dbGlow.style.height = dbHeight + 'px';
    dbGlow.style.opacity = '0';
    container.appendChild(dbGlow);

    // Тонкая кривая стрелка (SVG), не заходит на пример данных
    const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    arrow.setAttribute('class', 'cosmo-arrow-curve');
    arrow.setAttribute('width', Math.max(180, offsetLeft + dbWidth/2));
    arrow.setAttribute('height', Math.max(100, offsetTop - 10));
    arrow.style.position = 'absolute';
    arrow.style.left = '0px';
    arrow.style.top = '0px';
    // Старт: смайлик, конец — чуть выше блока сервера
    const startX = 55, startY = 65;
    const endX = offsetLeft + dbWidth/2, endY = offsetTop - 18;
    const c1x = startX + 60, c1y = startY - 40;
    const c2x = endX - 60, c2y = endY + 40;
    arrow.innerHTML = `
        <defs>
            <linearGradient id="arrow-curve-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#00f0ff"/>
                <stop offset="100%" stop-color="#a259ff"/>
            </linearGradient>
        </defs>
        <path d="M${startX},${startY} C${c1x},${c1y} ${c2x},${c2y} ${endX},${endY}" stroke="url(#arrow-curve-gradient)" stroke-width="2.1" fill="none" class="cosmo-arrow-path"/>
        <circle id="arrowDot" r="6" fill="#fffbe6" filter="url(#glow)"/>
        <polygon id="arrowHead" points="0,0 10,3 0,6" fill="#a259ff" filter="url(#glow)"/>
    `;
    container.appendChild(arrow);

    // Анимация стрелки, кружочка и появления <сервер>
    setTimeout(() => {
        const path = arrow.querySelector('.cosmo-arrow-path');
        if (path) path.classList.add('drawn');
        animateDotAlongPath(arrow, path, arrow.querySelector('#arrowDot'), arrow.querySelector('#arrowHead'), 1800);
        setTimeout(() => {
            dbGlow.classList.add('active');
            dbGlow.style.opacity = '1';
            serverLabel.style.opacity = '1';
        }, 900);
    }, 200);
}

// Анимация кружочка по SVG-пути (без изменений)
function animateDotAlongPath(svg, path, dot, arrowHead, duration) {
    if (!path || !dot || !arrowHead) return;
    const len = path.getTotalLength();
    let start = null;
    function step(ts) {
        if (!start) start = ts;
        let progress = Math.min((ts - start) / duration, 1);
        const point = path.getPointAtLength(len * progress);
        dot.setAttribute('cx', point.x);
        dot.setAttribute('cy', point.y);
        // Поворот стрелки
        if (arrowHead) {
            const angle = progress < 0.99
                ? Math.atan2(
                    path.getPointAtLength(len * progress + 1).y - point.y,
                    path.getPointAtLength(len * progress + 1).x - point.x
                  ) * 180 / Math.PI
                : Math.atan2(
                    point.y - path.getPointAtLength(len * progress - 1).y,
                    point.x - path.getPointAtLength(len * progress - 1).x
                  ) * 180 / Math.PI;
            arrowHead.setAttribute('transform', `translate(${point.x},${point.y - 5}) rotate(${angle})`);
        }
        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            dot.setAttribute('cx', point.x);
            dot.setAttribute('cy', point.y);
        }
    }
    requestAnimationFrame(step);
}

// Сброс космической визуализации
function resetVisualization() {
    const container = document.getElementById('visualizationContainer');
    if (container) container.innerHTML = '';
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});