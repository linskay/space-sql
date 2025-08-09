# 🎨 Space SQL Design System

## Обзор

Space SQL использует кастомную дизайн-систему с космической тематикой, построенную на основе Tailwind CSS и дополненную уникальными компонентами и анимациями.

## 🌌 Философия дизайна

### Принципы
- **Космическая тематика** - все элементы вдохновлены космосом
- **Плавные анимации** - создание ощущения невесомости
- **Интуитивность** - простота использования несмотря на сложную тематику
- **Консистентность** - единообразие во всех компонентах

### Целевая аудитория
- Разработчики, изучающие SQL
- Студенты компьютерных наук
- Энтузиасты космической тематики

## 🎨 Цветовая палитра

### Основные цвета

```css
/* Космический фон */
--space-dark: #0d0221      /* Глубокий космос */
--space-purple: #2d0b59    /* Темно-фиолетовый */
--space-deep: #0f0c29      /* Космическая глубина */
--space-medium: #302b63    /* Средний космос */
--space-light: #24243e     /* Светлый космос */
```

### Акцентные цвета

```css
/* Неоновые акценты */
--cosmic-blue: #2de2e6     /* Электрический голубой */
--cosmic-purple: #8a2be2   /* Магический фиолетовый */
--cosmic-pink: #ff2e88     /* Космический розовый */
--cosmic-green: #00ff9d    /* Матричный зеленый */
--cosmic-cyan: #00aaff     /* Киберпанк голубой */
--cosmic-magenta: #ff00ff  /* Неоновый пурпур */
```

### Текстовые цвета

```css
--starlight: #ffffff       /* Звездный белый */
--text-muted: #b8b8b8     /* Приглушенный текст */
```

### Использование в Tailwind

```jsx
// Фоны
<div className="bg-space-dark">
<div className="bg-cosmic-purple">

// Текст
<h1 className="text-cosmic-blue">
<p className="text-starlight">

// Границы
<div className="border-cosmic-purple">
```

## 🎭 Градиенты

### Основные градиенты

```css
/* Космические градиенты */
--cosmic-gradient: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
--cosmic-purple-gradient: linear-gradient(90deg, #8a2be2, #00ff9d);
--cosmic-blue-gradient: linear-gradient(45deg, #2de2e6, #8a2be2);
--space-dark-gradient: linear-gradient(135deg, #0a081a 0%, #201d47 50%, #18182f 100%);
```

### Применение

```jsx
// Кнопки
<button className="bg-gradient-to-r from-cosmic-purple to-cosmic-green">

// Заголовки
<h1 className="bg-cosmic-gradient bg-clip-text text-transparent">

// Фоны
<div className="bg-cosmic-gradient">
```

## 📝 Типографика

### Шрифтовые семейства

```css
/* Космические шрифты */
--font-cosmic: "Press Start 2P", cursive;    /* Пиксельный ретро */
--font-mono: "Roboto Mono", monospace;       /* Код и данные */
--font-space: "Orbitron", sans-serif;        /* Футуристический */
```

### Иерархия заголовков

```jsx
// Главный заголовок (H1)
<h1 className="font-cosmic text-4xl lg:text-6xl text-cosmic-purple">
  Space SQL
</h1>

// Заголовок секции (H2)
<h2 className="font-space text-2xl lg:text-3xl text-cosmic-blue">
  Уроки SQL
</h2>

// Заголовок подсекции (H3)
<h3 className="font-space text-xl text-starlight">
  Основы SELECT
</h3>

// Заголовок карточки (H4)
<h4 className="font-mono text-lg text-cosmic-green">
  Урок 1
</h4>
```

### Основной текст

```jsx
// Обычный текст
<p className="font-mono text-base text-starlight">
  Описание урока
</p>

// Приглушенный текст
<p className="font-mono text-sm text-text-muted">
  Дополнительная информация
</p>

// Код
<code className="font-mono text-cosmic-green bg-space-dark p-2 rounded">
  SELECT * FROM users;
</code>
```

## 🎯 Spacing System

### Размеры отступов

```jsx
// Tailwind spacing scale
space-1   // 4px
space-2   // 8px
space-3   // 12px
space-4   // 16px
space-6   // 24px
space-8   // 32px
space-12  // 48px
space-16  // 64px
space-20  // 80px
space-24  // 96px
```

### Применение

```jsx
// Внутренние отступы
<div className="p-4">        // 16px со всех сторон
<div className="px-6 py-4">  // 24px по горизонтали, 16px по вертикали

// Внешние отступы
<div className="m-4">        // 16px со всех сторон
<div className="mb-8">       // 32px снизу

// Промежутки между элементами
<div className="space-y-6">  // 24px между дочерними элементами по вертикали
<div className="gap-4">      // 16px в grid/flex
```

## 🔘 Компоненты

### Кнопки

#### Варианты

```jsx
// Primary - основная кнопка
<button className="cosmic-button">
  Начать обучение
</button>

// Secondary - вторичная кнопка
<button className="border-2 border-cosmic-blue text-cosmic-blue hover:bg-cosmic-blue hover:text-white">
  Подробнее
</button>

// Danger - кнопка удаления/отмены
<button className="bg-red-600 hover:bg-red-700 text-white">
  Удалить
</button>

// Ghost - прозрачная кнопка
<button className="text-cosmic-purple hover:bg-cosmic-purple hover:bg-opacity-10">
  Отмена
</button>
```

#### Размеры

```jsx
// Small
<button className="px-4 py-2 text-sm">Маленькая</button>

// Medium (по умолчанию)
<button className="px-6 py-3 text-base">Средняя</button>

// Large
<button className="px-8 py-4 text-lg">Большая</button>
```

### Карточки

```jsx
// Базовая карточка
<div className="cosmic-card">
  <h3>Заголовок</h3>
  <p>Содержимое</p>
</div>

// Интерактивная карточка
<div className="cosmic-card hover:transform hover:-translate-y-2 cursor-pointer">
  <h3>Кликабельная карточка</h3>
</div>

// Карточка с эффектом свечения
<div className="cosmic-card shadow-cosmic hover:shadow-cosmic-lg">
  <h3>Светящаяся карточка</h3>
</div>
```

### Поля ввода

```jsx
// Базовое поле
<input className="cosmic-input" placeholder="Введите текст" />

// Поле с ошибкой
<input className="cosmic-input border-red-500" />

// Поле с фокусом
<input className="cosmic-input focus:border-cosmic-purple focus:shadow-cosmic" />
```

## ✨ Эффекты и анимации

### Эффекты свечения

```css
/* Текст с эффектом свечения */
.glow-text {
  text-shadow: 0 0 10px currentColor, 0 0 20px currentColor;
}

/* Тень с эффектом свечения */
.shadow-cosmic {
  box-shadow: 0 0 20px rgba(138, 43, 226, 0.5);
}

.shadow-cosmic-lg {
  box-shadow: 0 0 30px rgba(138, 43, 226, 0.7);
}
```

### Анимации

```css
/* Плавание */
@keyframes float {
  0% { transform: translatey(0px); }
  50% { transform: translatey(-10px); }
  100% { transform: translatey(0px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* Мерцание звезд */
@keyframes twinkle {
  0% { opacity: 0.3; }
  100% { opacity: 1; }
}

.animate-twinkle {
  animation: twinkle 3s infinite alternate;
}

/* Пульсация свечения */
@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 10px rgba(138, 43, 226, 0.5); }
  50% { box-shadow: 0 0 20px rgba(138, 43, 226, 0.8); }
}

.animate-glow-pulse {
  animation: glow-pulse 2s infinite;
}
```

## 📱 Адаптивность

### Breakpoints

```css
/* Tailwind breakpoints */
sm: 640px   /* Мобильные устройства (большие) */
md: 768px   /* Планшеты */
lg: 1024px  /* Ноутбуки */
xl: 1280px  /* Десктопы */
2xl: 1536px /* Большие экраны */
```

### Адаптивные компоненты

```jsx
// Адаптивная сетка
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Адаптивный текст
<h1 className="text-3xl md:text-4xl lg:text-6xl">

// Адаптивные отступы
<div className="p-4 md:p-6 lg:p-8">

// Скрытие/показ на разных экранах
<div className="hidden md:block">Только на десктопе</div>
<div className="block md:hidden">Только на мобильных</div>
```

## 🌟 Специальные эффекты

### Звездный фон

```jsx
// Компонент StarBackground
<StarBackground isMainPage={true}>
  <div>Контент с звездным фоном</div>
</StarBackground>
```

### Параллакс эффекты

```jsx
// Элементы с параллаксом
<div className="transform transition-transform duration-300 hover:scale-105">
  Элемент с увеличением при hover
</div>
```

### Космические частицы

```jsx
// Анимированные частицы
<div className="relative">
  {[...Array(5)].map((_, i) => (
    <div
      key={i}
      className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
      style={{
        left: `${Math.random() * 100}px`,
        top: `${Math.random() * 50}px`,
        animationDelay: `${i * 0.2}s`
      }}
    />
  ))}
</div>
```

## 🎮 Интерактивные состояния

### Hover эффекты

```jsx
// Кнопки
<button className="transform transition-all duration-300 hover:scale-105 hover:-translate-y-1">

// Карточки
<div className="transition-all duration-300 hover:shadow-cosmic-lg hover:-translate-y-2">

// Ссылки
<a className="text-cosmic-blue hover:text-cosmic-purple transition-colors duration-300">
```

### Focus состояния

```jsx
// Поля ввода
<input className="focus:outline-none focus:ring-2 focus:ring-cosmic-purple focus:border-cosmic-purple">

// Кнопки
<button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cosmic-purple">
```

### Active состояния

```jsx
// Кнопки
<button className="active:transform active:scale-95 active:translate-y-1">
```

## 🔧 Utility классы

### Кастомные утилиты

```css
/* Космическая кнопка */
.cosmic-button {
  @apply px-6 py-3 rounded-full font-bold text-white cursor-pointer transition-all duration-300 transform hover:scale-105;
  background: linear-gradient(90deg, #8a2be2, #00ff9d);
  box-shadow: 0 0 15px rgba(138, 43, 226, 0.4);
}

/* Космическая карточка */
.cosmic-card {
  @apply bg-opacity-80 backdrop-blur-sm rounded-2xl p-6 border border-opacity-30;
  background: rgba(26, 26, 46, 0.8);
  border-color: #8a2be2;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

/* Космическое поле ввода */
.cosmic-input {
  @apply w-full p-4 rounded-lg font-mono text-white bg-opacity-50 border border-opacity-50 outline-none transition-all duration-300;
  background: rgba(0, 0, 0, 0.5);
  border-color: #2de2e6;
}

/* Космический заголовок */
.cosmic-title {
  @apply font-cosmic text-4xl lg:text-6xl mb-6;
  background: linear-gradient(90deg, #8a2be2, #00ff9d);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(138, 43, 226, 0.5);
}

/* Спиннер загрузки */
.loading-spinner {
  @apply w-8 h-8 border-4 border-cosmic-purple border-t-transparent rounded-full animate-spin;
}
```

## 🎨 Темы и кастомизация

### Переключение тем

```css
/* Основная тема (по умолчанию) */
:root {
  --theme-primary: #8a2be2;
  --theme-secondary: #2de2e6;
}

/* Альтернативная тема */
[data-theme="alternative"] {
  --theme-primary: #ff2e88;
  --theme-secondary: #00ff9d;
}
```

### Кастомизация компонентов

```jsx
// Переопределение стилей через className
<Button className="bg-gradient-to-r from-purple-500 to-pink-500">
  Кастомная кнопка
</Button>

// Использование CSS переменных
<div style={{ backgroundColor: 'var(--cosmic-purple)' }}>
  Элемент с переменной
</div>
```

## 🚀 Производительность

### Оптимизация анимаций

```css
/* Оптимизация для анимаций */
.animate-optimized {
  will-change: transform;
  backface-visibility: hidden;
  transform: translateZ(0);
}
```

### Ленивая загрузка эффектов

```jsx
// Условные анимации
const shouldAnimate = useReducedMotion();

<motion.div
  animate={shouldAnimate ? {} : { scale: 1.1 }}
>
  Контент
</motion.div>
```

## 📋 Чек-лист для новых компонентов

- [ ] Использует космическую цветовую палитру
- [ ] Имеет hover эффекты
- [ ] Адаптивен для всех экранов
- [ ] Включает анимации с Framer Motion
- [ ] Следует принципам доступности
- [ ] Оптимизирован для производительности
- [ ] Документирован с примерами

## 🎯 Лучшие практики

### Do's ✅
- Используйте установленные цвета из палитры
- Добавляйте плавные переходы ко всем интерактивным элементам
- Следуйте космической тематике в иконографии
- Тестируйте на всех устройствах
- Используйте семантически правильные HTML теги

### Don'ts ❌
- Не используйте цвета вне установленной палитры
- Не создавайте резких переходов без анимаций
- Не забывайте про доступность (контрастность, фокус)
- Не перегружайте анимациями
- Не нарушайте космическую тематику

---

*Дизайн-система создана для покорения космоса через красивый и функциональный интерфейс* ✨
