# 🧩 Документация по компонентам Space SQL

## Обзор

Этот документ описывает все компоненты, используемые в приложении Space SQL, их API, примеры использования и лучшие практики.

## 🎨 UI Компоненты

### Button

Универсальная кнопка с космической тематикой и анимациями.

#### Props

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `children` | `ReactNode` | - | Содержимое кнопки |
| `variant` | `'primary' \| 'secondary' \| 'danger' \| 'ghost'` | `'primary'` | Вариант стиля |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Размер кнопки |
| `disabled` | `boolean` | `false` | Отключена ли кнопка |
| `loading` | `boolean` | `false` | Показывать ли спиннер загрузки |
| `onClick` | `() => void` | - | Обработчик клика |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Тип кнопки |

#### Примеры использования

```jsx
import { Button } from './components/ui';

// Основная кнопка
<Button variant="primary" size="large">
  Начать обучение
</Button>

// Кнопка с загрузкой
<Button loading={isSubmitting} disabled={isSubmitting}>
  {isSubmitting ? 'Отправка...' : 'Отправить'}
</Button>

// Кнопка-призрак
<Button variant="ghost" onClick={handleCancel}>
  Отмена
</Button>
```

### Card

Карточка с эффектами hover и glow для отображения контента.

#### Props

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `children` | `ReactNode` | - | Содержимое карточки |
| `hover` | `boolean` | `true` | Включить hover эффекты |
| `glow` | `boolean` | `false` | Добавить эффект свечения |
| `onClick` | `() => void` | - | Обработчик клика |
| `className` | `string` | `''` | Дополнительные CSS классы |

#### Примеры использования

```jsx
import { Card } from './components/ui';

// Простая карточка
<Card>
  <h3>Заголовок</h3>
  <p>Описание карточки</p>
</Card>

// Интерактивная карточка с эффектами
<Card hover={true} glow={true} onClick={handleClick}>
  <div className="p-4">
    <h3>Кликабельная карточка</h3>
  </div>
</Card>

// Карточка урока
<Card className="h-full">
  <div className="flex flex-col justify-between h-full">
    <div>
      <h3>Урок 1: Основы SQL</h3>
      <p>Изучите основы языка запросов</p>
    </div>
    <Button variant="secondary">Начать урок</Button>
  </div>
</Card>
```

### Input

Поле ввода с анимированными лейблами и валидацией.

#### Props

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `label` | `string` | - | Лейбл поля |
| `type` | `string` | `'text'` | Тип input |
| `value` | `string` | - | Значение |
| `onChange` | `(e: ChangeEvent) => void` | - | Обработчик изменения |
| `placeholder` | `string` | - | Плейсхолдер |
| `error` | `string` | - | Текст ошибки |
| `disabled` | `boolean` | `false` | Отключено ли поле |
| `required` | `boolean` | `false` | Обязательное ли поле |

#### Примеры использования

```jsx
import { Input } from './components/ui';

// Простое поле
<Input
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>

// Поле с ошибкой
<Input
  label="Пароль"
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  error={passwordError}
  required
/>

// Отключенное поле
<Input
  label="Имя пользователя"
  value={username}
  disabled={true}
/>
```

### Loading

Компонент загрузки с космическим спиннером.

#### Props

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `message` | `string` | `'Загрузка...'` | Текст сообщения |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Размер спиннера |
| `className` | `string` | `''` | Дополнительные CSS классы |

#### Примеры использования

```jsx
import { Loading } from './components/ui';

// Простая загрузка
<Loading />

// Кастомное сообщение
<Loading message="Загрузка уроков..." size="large" />

// Встроенная загрузка
<div className="min-h-screen flex items-center justify-center">
  <Loading message="Подготовка космического путешествия..." />
</div>
```

## 🏗 Layout Компоненты

### CosmicNavigation

Главная навигация приложения с поддержкой мобильных устройств.

#### Особенности
- Адаптивный дизайн
- Интеграция с системой аутентификации
- Анимированные переходы
- Мобильное меню

#### Примеры использования

```jsx
import CosmicNavigation from './components/layout/CosmicNavigation';

// Использование в App.js
<CosmicNavigation />
```

### StarBackground

Анимированный звездный фон с параллакс эффектами.

#### Props

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `children` | `ReactNode` | - | Дочерние элементы |
| `isMainPage` | `boolean` | `true` | Главная страница или нет |

#### Примеры использования

```jsx
import StarBackground from './components/StarBackground';

// Для главной страницы
<StarBackground isMainPage={true}>
  <HomePage />
</StarBackground>

// Для внутренних страниц
<StarBackground isMainPage={false}>
  <LessonsPage />
</StarBackground>
```

## 📄 Page Компоненты

### Home

Главная страница с hero секцией.

#### Особенности
- Анимированное появление контента
- Адаптивный дизайн
- Интеграция с аутентификацией

### Login/Register

Страницы аутентификации с космическими формами.

#### Особенности
- Анимированные формы
- Валидация в реальном времени
- Обработка ошибок

### Lessons

Страница со списком уроков.

#### Особенности
- Сетка уроков с анимациями
- Состояния загрузки и ошибок
- Фильтрация и поиск

### Practice

Страница с практическими заданиями.

#### Особенности
- Интерактивный SQL редактор
- Проверка запросов
- Система подсказок

## 🎭 Анимационные паттерны

### Page Transitions

```jsx
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);
```

### Stagger Children

```jsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};
```

### Hover Effects

```jsx
const hoverVariants = {
  hover: {
    scale: 1.05,
    y: -5,
    transition: { type: 'spring', stiffness: 300 }
  }
};
```

## 🔧 Utility Компоненты

### ProtectedRoute

Компонент для защиты приватных роутов.

```jsx
import ProtectedRoute from './components/common/ProtectedRoute';

<ProtectedRoute>
  <PrivatePage />
</ProtectedRoute>
```

## 🎨 Стилевые компоненты

### CSS Utility классы

```css
/* Кнопки */
.cosmic-button
.cosmic-button:hover

/* Карточки */
.cosmic-card
.cosmic-card:hover

/* Инпуты */
.cosmic-input
.cosmic-input:focus

/* Текст */
.cosmic-title
.glow-text

/* Анимации */
.animate-float
.animate-twinkle
.loading-spinner
```

## 📱 Адаптивность

### Рекомендации по использованию

```jsx
// Адаптивные сетки
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Адаптивный текст
<h1 className="text-3xl lg:text-5xl">

// Скрытие на мобильных
<div className="hidden md:block">

// Показ только на мобильных
<div className="block md:hidden">
```

## 🧪 Тестирование компонентов

### Примеры тестов

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './components/ui';

test('кнопка отображается с правильным текстом', () => {
  render(<Button>Тест</Button>);
  expect(screen.getByText('Тест')).toBeInTheDocument();
});

test('кнопка вызывает onClick при клике', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Клик</Button>);
  
  fireEvent.click(screen.getByText('Клик'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

## 🚀 Производительность

### Оптимизация компонентов

```jsx
import React, { memo, useMemo, useCallback } from 'react';

// Мемоизация компонента
const ExpensiveComponent = memo(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({ ...item, processed: true }));
  }, [data]);

  return <div>{/* рендер */}</div>;
});

// Мемоизация колбэков
const ParentComponent = () => {
  const handleClick = useCallback(() => {
    // обработка клика
  }, []);

  return <ChildComponent onClick={handleClick} />;
};
```

## 🎯 Лучшие практики

### Создание новых компонентов

1. **Структура файла:**
```jsx
import React from 'react';
import { motion } from 'framer-motion';

const MyComponent = ({ prop1, prop2, ...props }) => {
  // логика компонента
  
  return (
    <motion.div {...props}>
      {/* JSX */}
    </motion.div>
  );
};

export default MyComponent;
```

2. **PropTypes или TypeScript:**
```jsx
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number
};
```

3. **Стилизация:**
- Используйте Tailwind классы
- Следуйте космической цветовой схеме
- Добавляйте hover эффекты

4. **Анимации:**
- Используйте Framer Motion
- Применяйте consistent timing
- Тестируйте на мобильных

---

*Документация обновляется по мере добавления новых компонентов*
