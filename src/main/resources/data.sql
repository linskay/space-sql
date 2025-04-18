-- Основы SELECT
INSERT INTO lesson (id, title, description, topic, difficulty)
VALUES (1, 'Базовый SELECT', 'Научитесь извлекать данные из таблиц', 'Основы SELECT', 'Легкий');

INSERT INTO task (id, lesson_id, title, description, schema_definition, solution_query)
VALUES (1, 1, 'Выбор всех данных', 'Выберите все записи из таблицы users',
        'CREATE TABLE users(id INT, name VARCHAR(100), age INT);', 'SELECT * FROM users;'),
       (2, 1, 'Выбор с условием', 'Выберите пользователей старше 25 лет',
        'CREATE TABLE users(id INT, name VARCHAR(100), age INT);', 'SELECT * FROM users WHERE age > 25;');

-- JOIN и отношения
INSERT INTO lesson (id, title, description, topic, difficulty)
VALUES (2, 'Основы JOIN', 'Освойте соединение таблиц', 'JOIN и отношения', 'Средний');

INSERT INTO task (id, lesson_id, title, description, schema_definition, solution_query)
VALUES (3, 2, 'Простой JOIN', 'Соедините таблицы users и orders',
        'CREATE TABLE users(id INT, name VARCHAR(100)); CREATE TABLE orders(id INT, user_id INT, total DECIMAL(10,2));',
        'SELECT u.name, o.total FROM users u JOIN orders o ON u.id = o.user_id;');