<div align="center">
  <h1>🚀 Space SQL</h1>
  <p>Интерактивная платформа для изучения SQL в игровой форме</p>
  
  [![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
  [![Java](https://img.shields.io/badge/Java-17%2B-orange.svg)](https://java.com/)
  [![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F.svg)](https://spring.io/projects/spring-boot)
  [![React](https://img.shields.io/badge/React-18.x-61DAFB.svg)](https://reactjs.org/)

  [Документация](docs/README.md) | [Установка](#установка) | [Разработка](#разработка) | [Лицензия](#лицензия)
</div>

## 📋 О проекте

Space SQL - это интерактивная образовательная платформа, которая помогает изучить SQL в увлекательной игровой форме. Проект разработан для пользователей, которые хотят освоить основы SQL и улучшить свои навыки работы с базами данных.

### 🎯 Основные возможности

- 📚 Интерактивные уроки по SQL
- 🎯 Практические задания с автоматической проверкой
- 🏆 Система достижений и прогресса
- 👥 Профили пользователей
- 🔐 Безопасная аутентификация

## 🚀 Быстрый старт

### Предварительные требования

- Java 17 или выше
- Node.js 16+ и npm 8+
- PostgreSQL 13+
- Maven 3.8+

### Установка

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/yourusername/space-sql.git
   cd space-sql
   ```

2. Настройте базу данных:
   - Создайте базу данных PostgreSQL
   - Обновите настройки подключения в `src/main/resources/application.properties`

3. Запустите бэкенд:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

4. Запустите фронтенд:
   ```bash
   cd frontend
   npm install
   npm start
   ```

5. Откройте [http://localhost:3000](http://localhost:3000) в браузере

## 🛠️ Разработка

### Структура проекта

```
space-sql/
├── backend/             # Бэкенд на Spring Boot
│   ├── src/            # Исходный код
│   ├── pom.xml         # Maven конфигурация
│   └── ...
├── frontend/           # Фронтенд на React
│   ├── public/         # Статические файлы
│   ├── src/            # Исходный код React
│   └── ...
├── docs/               # Документация
│   ├── api/            # API документация
│   ├── guides/         # Руководства
│   └── ...
└── README.md           # Этот файл
```

### Сборка

Сборка бэкенда:
```bash
cd backend
mvn clean package
```

Сборка фронтенда:
```bash
cd frontend
npm run build
```

### Тестирование

Запуск тестов бэкенда:
```bash
cd backend
mvn test
```

Запуск тестов фронтенда:
```bash
cd frontend
npm test
```

## 📚 Документация

Подробная документация доступна в [документации проекта](docs/README.md).

## 🤝 Участие

Вклады приветствуются! Пожалуйста, прочитайте [руководство по участию](CONTRIBUTING.md) для получения подробной информации о процессе отправки запросов на включение.

## 📄 Лицензия

Этот проект лицензирован в соответствии с лицензией MIT - подробности см. в файле [LICENSE](LICENSE).

---

<div align="center">
  <p>Создано с ❤️ командой No php - No problems</p>
</div>
