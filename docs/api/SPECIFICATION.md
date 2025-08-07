# Спецификация API Space SQL

## Общая информация

- **Базовый URL**: `/api`
- **Формат данных**: JSON
- **Аутентификация**: JWT (Bearer token)

## Аутентификация

### Регистрация нового пользователя

```
POST /api/auth/register
```

**Параметры запроса (JSON):**
- `email` (string, required) - Email пользователя
- `password` (string, required) - Пароль

**Ответ (успех):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": 1,
  "email": "user@example.com"
}
```

### Аутентификация пользователя

```
POST /api/auth/login
```

**Параметры запроса (JSON):**
- `email` (string, required) - Email пользователя
- `password` (string, required) - Пароль

**Ответ (успех):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": 1,
  "email": "user@example.com"
}
```

## Уроки

### Получить все уроки

```
GET /api/lessons
```

**Заголовки:**
- `Authorization: Bearer <token>`

**Ответ (успех):**
```json
[
  {
    "id": 1,
    "title": "Основы SELECT",
    "description": "Научитесь извлекать данные из таблиц с помощью базовых запросов SELECT",
    "topic": "Основы SQL",
    "difficulty": "Легкий",
    "orderIndex": 1
  },
  ...
]
```

### Получить урок по ID

```
GET /api/lessons/{id}
```

**Параметры пути:**
- `id` (number, required) - ID урока

**Заголовки:**
- `Authorization: Bearer <token>`

**Ответ (успех):**
```json
{
  "id": 1,
  "title": "Основы SELECT",
  "description": "Научитесь извлекать данные из таблиц с помощью базовых запросов SELECT",
  "topic": "Основы SQL",
  "difficulty": "Легкий",
  "orderIndex": 1
}
```

### Получить задания урока

```
GET /api/lessons/{lessonId}/tasks
```

**Параметры пути:**
- `lessonId` (number, required) - ID урока

**Заголовки:**
- `Authorization: Bearer <token>`

**Ответ (успех):**
```json
[
  {
    "id": 1,
    "lessonId": 1,
    "title": "Выбор всех данных",
    "description": "Выберите все записи из таблицы users",
    "schemaDefinition": "CREATE TABLE users(id INT PRIMARY KEY, name VARCHAR(100), age INT, email VARCHAR(100));",
    "solutionQuery": "SELECT * FROM users;"
  },
  ...
]
```

## Задания

### Проверить SQL-запрос

```
POST /api/tasks/check
```

**Параметры запроса (JSON):**
- `taskId` (number, required) - ID задания
- `userQuery` (string, required) - SQL-запрос пользователя

**Заголовки:**
- `Authorization: Bearer <token>`
- `Content-Type: application/json`

**Ответ (успех):**
```json
{
  "isCorrect": true,
  "feedback": "✅ Запрос верный!",
  "expectedQuery": null
}
```

**Ответ (ошибка):**
```json
{
  "isCorrect": false,
  "feedback": "❌ Неверный запрос. Проверьте синтаксис и логику.",
  "expectedQuery": "SELECT * FROM users;"
}
```

## Пользователи

### Получить информацию о текущем пользователе

```
GET /api/users/me
```

**Заголовки:**
- `Authorization: Bearer <token>`

**Ответ (успех):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "githubUsername": "githubuser",
  "avatarUrl": "https://avatars.githubusercontent.com/u/1234567",
  "progress": 25
}
```

## Обработка ошибок

В случае ошибки API возвращает JSON-объект с описанием ошибки:

```json
{
  "timestamp": "2023-08-07T16:49:20.123+00:00",
  "status": 404,
  "error": "Not Found",
  "message": "Урок не найден",
  "path": "/api/lessons/999"
}
```

### Коды состояния HTTP

- `200 OK` - Успешный запрос
- `201 Created` - Ресурс успешно создан
- `400 Bad Request` - Неверные параметры запроса
- `401 Unauthorized` - Требуется аутентификация
- `403 Forbidden` - Недостаточно прав
- `404 Not Found` - Ресурс не найден
- `409 Conflict` - Конфликт (например, email уже используется)
- `500 Internal Server Error` - Внутренняя ошибка сервера
