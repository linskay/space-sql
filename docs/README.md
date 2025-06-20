# Space SQL Trainer

[Инструкция по запуску фронтенда](./FRONTEND.md)

Космический тренажер для изучения SQL

## Настройка окружения

1. **Скопируйте файл настроек**:
```bash
cp .env.example .env
```

2. **Заполните параметры** в созданном `.env` файле:
- Настройки PostgreSQL
- Секретные ключи
- Параметры API

## Запуск фронтенда

1. **Установите зависимости**:
```bash
cd frontend
npm install
```

2. **Запустите development сервер**:
```bash
npm start
```
Приложение будет доступно по адресу: [http://localhost:3000](http://localhost:3000)

3. **Сборка для production**:
```bash
npm run build
```
Собранные файлы появятся в папке `build`

## Запуск бекенда

1. **Установите зависимости**:
```bash
cd backend
npm install
```

2. **Запустите сервер**:
```bash
npm start
```
API будет доступно на порту 8080

## Важные переменные окружения

| Переменная | Описание | Пример |
|------------|----------|--------|
| `DB_URL` | URL PostgreSQL | `postgres://user:pass@localhost:5432/space-sql` |
| `DB_HOST` | Хост БД | `localhost` |
| `DB_PORT` | Порт БД | `5432` |
| `DB_NAME` | Имя БД | `space-sql` |
| `DB_USER` | Пользователь БД | `postgres` |
| `DB_PASSWORD` | Пароль БД | `secret` |
| `JWT_SECRET` | Секрет для JWT | Сложная строка |
| `API_PORT` | Порт бекенда | `8080` |
| `REACT_APP_API_URL` | URL API для фронтенда | `http://localhost:8080` |

## Требования
- Node.js 16+
- npm 8+
- PostgreSQL 14+

## Структура проекта
- `frontend/src` - исходники React-приложения
- `frontend/public` - статические файлы
- `backend` - API сервер (должен быть запущен отдельно)
