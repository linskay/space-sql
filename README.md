![Текст абзаца (1)](https://github.com/user-attachments/assets/62c98eae-5051-4fde-afdb-89ef6c5e2f96)

<div align="center">
  <h1>🚀 Space SQL</h1>
  <p><em>Интерактивная платформа для изучения SQL в космическом стиле</em></p>
  
  [![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
  [![Java](https://img.shields.io/badge/Java-17%2B-orange.svg)](https://java.com/)
  [![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F.svg)](https://spring.io/projects/spring-boot)
  [![React](https://img.shields.io/badge/React-18.x-61DAFB.svg)](https://reactjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-38B2AC.svg)](https://tailwindcss.com/)
  [![Framer Motion](https://img.shields.io/badge/Framer%20Motion-10.x-FF0055.svg)](https://www.framer.com/motion/)

  [📚 Документация](docs/README.md) | [⚡ Быстрый старт](#быстрый-старт) | [🎨 Дизайн-система](docs/DESIGN_SYSTEM.md) | [🧩 Компоненты](docs/COMPONENTS.md)
</div>

## 📋 О проекте

Space SQL - это современная интерактивная образовательная платформа с космической тематикой для изучения SQL. Проект сочетает в себе мощный бэкенд на Spring Boot и красивый фронтенд на React с анимациями и космическим дизайном.

### ✨ Особенности

- 🌌 **Космический дизайн** - уникальная тематика с анимированными звездами и плавными переходами
- 📚 **Интерактивные уроки** - пошаговое изучение SQL от основ до продвинутых тем
- ⚡ **Практические задания** - реальные задачи с автоматической проверкой SQL запросов
- 🎭 **Современный UI** - кастомная дизайн-система на Tailwind CSS и Framer Motion
- 🔐 **Безопасная аутентификация** - JWT токены и защищенные API endpoints
- 📱 **Адаптивность** - полная поддержка мобильных устройств и планшетов

### 🛠️ Технологический стек

**Backend:**
- ☕ Java 17 + Spring Boot 3.x
- 🗄️ PostgreSQL + Liquibase
- 🔒 Spring Security + JWT
- 📡 REST API + Swagger

**Frontend:**
- ⚛️ React 18 + React Router
- 🎨 Tailwind CSS + кастомная дизайн-система
- 🎭 Framer Motion для анимаций
- 📡 Axios для API запросов

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

### 📁 Структура проекта

```
space-sql/
├── src/                    # Backend (Spring Boot)
│   ├── main/java/com/spacesql/
│   │   ├── controller/     # REST контроллеры
│   │   ├── service/        # Бизнес-логика
│   │   ├── repository/     # Data Access Layer
│   │   ├── entity/         # JPA сущности
│   │   ├── dto/           # Data Transfer Objects
│   │   ├── config/        # Конфигурация Spring
│   │   └── security/      # Безопасность и JWT
│   └── main/resources/
│       ├── db/changelog/   # Liquibase миграции
│       └── application.properties
├── frontend/              # Frontend (React)
│   ├── src/
│   │   ├── components/    # React компоненты
│   │   │   ├── ui/       # Базовые UI компоненты
│   │   │   └── layout/   # Компоненты макета
│   │   ├── pages/        # Страницы приложения
│   │   ├── contexts/     # React контексты
│   │   ├── services/     # API сервисы
│   │   └── styles/       # Стили и дизайн-система
│   ├── tailwind.config.js # Конфигурация Tailwind
│   └── package.json
├── docs/                 # Документация
│   ├── FRONTEND.md       # Документация фронтенда
│   ├── COMPONENTS.md     # Документация компонентов
│   ├── DESIGN_SYSTEM.md  # Дизайн-система
│   └── api/             # API документация
├── pom.xml              # Maven конфигурация
└── README.md            # Этот файл
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

### 📖 Полная документация

| Документ | Описание |
|----------|----------|
| [📚 Фронтенд](docs/FRONTEND.md) | Подробная документация по React приложению |
| [🧩 Компоненты](docs/COMPONENTS.md) | Описание всех UI компонентов и их API |
| [🎨 Дизайн-система](docs/DESIGN_SYSTEM.md) | Космическая дизайн-система и стили |
| [📡 API](docs/api/SPECIFICATION.md) | Спецификация REST API |
| [🗄️ База данных](docs/architecture/database.md) | Схема и архитектура БД |

### 🚀 Скриншоты

<details>
<summary>🏠 Главная страница</summary>

*Космическая главная страница с анимированным фоном и hero секцией*

</details>

<details>
<summary>🔐 Аутентификация</summary>

*Красивые формы входа и регистрации с космическими эффектами*

</details>

<details>
<summary>📚 Уроки</summary>

*Интерактивные карточки уроков с hover эффектами*

</details>

<details>
<summary>⚡ Практика</summary>

*SQL редактор с подсветкой синтаксиса и проверкой запросов*

</details>

## 🤝 Участие в разработке

Мы приветствуем вклад в проект! 

### 🛠️ Как начать разработку

1. Форкните репозиторий
2. Создайте ветку для новой функции (`git checkout -b feature/amazing-feature`)
3. Следуйте [стандартам кодирования](#стандарты-кодирования)
4. Убедитесь, что все тесты проходят
5. Создайте Pull Request

### 📋 Стандарты кодирования

**Frontend:**
- Используйте функциональные компоненты с хуками
- Следуйте космической дизайн-системе
- Добавляйте анимации с Framer Motion
- Тестируйте на всех устройствах

**Backend:**
- Следуйте принципам SOLID
- Используйте Spring Boot best practices  
- Покрывайте код тестами
- Документируйте API с помощью Swagger

## 📄 Лицензия

Этот проект лицензирован в соответствии с лицензией MIT - подробности см. в файле [LICENSE](LICENSE).

---

<div align="center">
  <p>Создано с ❤️ командой No php - No problems</p>
</div>