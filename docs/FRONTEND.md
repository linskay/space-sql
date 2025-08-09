# 🚀 Space SQL Frontend Documentation

## Обзор

Фронтенд Space SQL — это современное React-приложение с космической тематикой, построенное на принципах единого дизайна и плавных анимаций. Приложение использует кастомную систему дизайна с Tailwind CSS и Framer Motion для создания захватывающего пользовательского опыта.

## 🛠 Технологический стек

### Основные технологии
- **React 18** - основной фреймворк
- **React Router Dom 6** - маршрутизация
- **Framer Motion** - анимации и переходы
- **Tailwind CSS** - utility-first CSS фреймворк
- **Axios** - HTTP клиент для API запросов

### Дизайн система
- **Кастомная космическая тема** с CSS переменными
- **Responsive дизайн** для всех устройств
- **Анимированные компоненты** с Framer Motion
- **Единая типографика** (Orbitron, Press Start 2P, Roboto Mono)

## 📦 Установка и запуск

### Требования
- Node.js 16.x или выше
- npm или yarn

### Установка зависимостей

```bash
# Переходим в директорию фронтенда
cd frontend

# Устанавливаем зависимости
npm install
```

### Запуск в режиме разработки

```bash
# Запускаем фронтенд
npm start
```

Приложение будет доступно по адресу: [http://localhost:3000](http://localhost:3000)

## 🏗 Архитектура проекта

### Структура файлов

```
frontend/
├── public/                 # Статические файлы
├── src/
│   ├── components/         # React компоненты
│   │   ├── ui/            # Базовые UI компоненты
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Loading.jsx
│   │   │   └── index.js
│   │   ├── layout/        # Компоненты макета
│   │   │   └── CosmicNavigation.jsx
│   │   ├── common/        # Общие компоненты
│   │   ├── StarBackground.js
│   │   ├── Footer.js
│   │   └── ...
│   ├── pages/             # Страницы приложения
│   │   ├── Home/
│   │   ├── auth/
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── Lessons/
│   │   └── Practice/
│   ├── contexts/          # React контексты
│   │   └── AuthContext.js
│   ├── services/          # API сервисы
│   │   └── authService.js
│   ├── styles/            # Стили
│   │   └── globals.css    # Главный файл стилей
│   ├── App.js            # Корневой компонент
│   └── index.js          # Точка входа
├── tailwind.config.js     # Конфигурация Tailwind
└── package.json          # Зависимости и скрипты
```

## 🎨 Система дизайна

### Цветовая палитра

```css
/* Космические цвета */
--space-dark: #0d0221      /* Основной фон */
--space-purple: #2d0b59    /* Темно-фиолетовый */
--space-deep: #0f0c29      /* Глубокий космос */

/* Акцентные цвета */
--cosmic-blue: #2de2e6     /* Космический голубой */
--cosmic-purple: #8a2be2   /* Космический фиолетовый */
--cosmic-green: #00ff9d    /* Космический зеленый */
--cosmic-pink: #ff2e88     /* Космический розовый */
```

### Типографика

- **Заголовки**: Press Start 2P (космический пиксельный шрифт)
- **Основной текст**: Roboto Mono (моноширинный)
- **UI элементы**: Orbitron (футуристический)

### Utility классы

```css
/* Кнопки */
.cosmic-button          /* Основная космическая кнопка */

/* Карточки */
.cosmic-card           /* Базовая карточка с эффектами */

/* Инпуты */
.cosmic-input          /* Стилизованное поле ввода */

/* Заголовки */
.cosmic-title          /* Анимированный заголовок */

/* Эффекты */
.glow-text            /* Текст с эффектом свечения */
.animate-float        /* Анимация плавания */
```

## 🧩 UI Компоненты

### Button
Универсальная кнопка с различными вариантами:

```jsx
import { Button } from './components/ui';

<Button variant="primary" size="large" loading={isLoading}>
  Нажми меня
</Button>

// Варианты: primary, secondary, danger, ghost
// Размеры: small, medium, large
```

### Card
Карточка с hover эффектами:

```jsx
import { Card } from './components/ui';

<Card hover={true} glow={true}>
  <h3>Заголовок</h3>
  <p>Содержимое карточки</p>
</Card>
```

### Input
Поле ввода с анимированными лейблами:

```jsx
import { Input } from './components/ui';

<Input
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errorMessage}
/>
```

### Loading
Космический спиннер загрузки:

```jsx
import { Loading } from './components/ui';

<Loading 
  message="Загрузка данных..." 
  size="large" 
/>
```

## 🎭 Анимации

### Page Transitions
Плавные переходы между страницами:

```jsx
import { motion, AnimatePresence } from 'framer-motion';

<AnimatePresence mode="wait">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

### Stagger Animations
Последовательные анимации для списков:

```jsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};
```

## 🛣 Маршрутизация

### Структура роутов

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  
  {/* Защищенные роуты */}
  <Route path="/lessons" element={
    <ProtectedRoute>
      <Lessons />
    </ProtectedRoute>
  } />
  <Route path="/lessons/:id" element={
    <ProtectedRoute>
      <LessonDetails />
    </ProtectedRoute>
  } />
  <Route path="/practice" element={
    <ProtectedRoute>
      <Practice />
    </ProtectedRoute>
  } />
</Routes>
```

## 🔐 Аутентификация

### AuthContext
Глобальное состояние аутентификации:

```jsx
import { useAuth } from './contexts/AuthContext';

const { currentUser, login, logout, isLoading } = useAuth();

// Вход в систему
await login(email, password);

// Выход
logout();

// Проверка авторизации
if (currentUser) {
  // Пользователь авторизован
}
```

### ProtectedRoute
Компонент для защиты приватных страниц:

```jsx
<ProtectedRoute>
  <PrivatePage />
</ProtectedRoute>
```

## 📱 Адаптивность

### Breakpoints (Tailwind CSS)

```css
sm: 640px    /* Планшеты */
md: 768px    /* Небольшие ноутбуки */
lg: 1024px   /* Десктопы */
xl: 1280px   /* Большие экраны */
2xl: 1536px  /* Очень большие экраны */
```

### Примеры использования

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Адаптивная сетка */}
</div>

<h1 className="text-3xl lg:text-5xl">
  {/* Адаптивный размер текста */}
</h1>
```

## 🔧 Конфигурация

### Tailwind Config
Кастомная конфигурация в `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        space: { /* космические цвета */ },
        cosmic: { /* акцентные цвета */ }
      },
      fontFamily: {
        'cosmic': ['"Press Start 2P"', 'cursive'],
        'space': ['"Orbitron"', 'sans-serif']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'twinkle': 'twinkle 3s infinite alternate'
      }
    }
  }
}
```

### Environment Variables

```env
REACT_APP_API_URL=http://localhost:8080/api
```

## 📚 Доступные скрипты

```bash
npm start          # Запуск в режиме разработки
npm test           # Запуск тестов
npm run build      # Сборка для продакшена
npm run eject      # Извлечение конфигурации (необратимо)
```

## 🚀 Деплой

### Сборка для продакшена

```bash
# Сборка приложения
npm run build

# Собранное приложение будет в папке build/
```

### Рекомендации для деплоя
- Настройте правильные переменные окружения
- Убедитесь, что все статические файлы доступны
- Настройте fallback для SPA роутинга

## 🎯 Лучшие практики

### Компоненты
- Используйте функциональные компоненты с хуками
- Выносите логику в кастомные хуки
- Применяйте мемоизацию для оптимизации

### Стили
- Используйте Tailwind utility классы
- Создавайте переиспользуемые компоненты
- Следуйте космической цветовой схеме

### Анимации
- Используйте Framer Motion для сложных анимаций
- Применяйте `will-change` для оптимизации
- Тестируйте производительность на мобильных

## 🐛 Отладка

### Полезные инструменты
- React Developer Tools
- Redux DevTools (если используется)
- Framer Motion DevTools

### Логирование
```js
console.log('Debug info:', data);
// В продакшене используйте более продвинутые решения
```

## 📖 Дополнительные ресурсы

- [React Documentation](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Router](https://reactrouter.com/)

## 🤝 Вклад в проект

При добавлении новых компонентов:
1. Следуйте существующей структуре папок
2. Используйте космическую тематику
3. Добавляйте анимации с Framer Motion
4. Тестируйте на всех устройствах
5. Обновляйте документацию

---

*Создано с ❤️*