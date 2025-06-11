# Архитектурная визуализация (liam)

## ERD: Архитектурная диаграмма БД

[![View ERD Online](https://img.shields.io/badge/ERD--View%20Online-brightgreen?logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHJ4PSIzIiBmaWxsPSIjM2E4YmZmIi8+PHBhdGggZD0iTTUgN0gxMVY5SDVaIiBmaWxsPSJ3aGl0ZSIvPjxjaXJjbGUgY3g9IjgiIGN5PSI0IiByPSIxIiBmaWxsPSJ3aGl0ZSIvPjxjaXJjbGUgY3g9IjgiIGN5PSIxMiIgcj0iMSIgZmlsbD0id2hpdGUiLz48L3N2Zz4=)](https://liambx.com/erd/p/github.com/linskay/space-sql/blob/master/schema.sql)

### Как посмотреть ERD-диаграмму локально

1. Сгенерируй актуальную схему:
   ```sh
   mvn process-resources
   npx @liam-hq/cli erd build --input schema.sql --format postgres
   ```
2. Запусти локальный сервер в папке dist:
   ```sh
   npx http-server dist/
   ```
3. Открой [http://localhost:8080](http://localhost:8080) (или другой свободный порт) в браузере.

---

- Вся визуализация лежит в папке `dist/` (создаётся автоматически).
- Для документации или wiki можно сделать скриншот ERD или экспортировать SVG.

### Структура папок

- `dist/` — интерактивная ERD-диаграмма (всё, что нужно для просмотра через http-server)
- `docs/README2.md` — инструкция по запуску и использованию ERD
- `schema.sql` — актуальная схема БД (генерируется автоматически)

---
- Файл `schema.sql` всегда актуализируется автоматически через Liquibase.
- Для работы нужен Node.js и npm (см. инструкции выше).
- Если возникнут ошибки — смотри логи или обратись к команде.
