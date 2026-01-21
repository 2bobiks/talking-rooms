# Talking Rooms

Клиентская часть для отображения встречь и статуса переговорных комнат.

Проект предоставляет интерфейс для просмотра статуса переговорок и списка встреч. Реализованы фильтры, сортировка по дате и отображение встреч по календарям.

Технологии:

[![](https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![](https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![](https://img.shields.io/badge/-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![](https://img.shields.io/badge/-Redux%20Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![](https://img.shields.io/badge/-CSS%20Modules-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://github.com/css-modules/css-modules)

Особенности:

- Просмотр встреч по дате и по календарю
- Статусы комнат и актуальные встречи
- Фильтрация и сортировка встреч
- Интеграция с календарными API

Структура проекта:

- `src/` — исходники приложения
  - `components/` — React-компоненты
  - `pages/` — страницы приложения
  - `redux/` — состояние и слайсы Redux Toolkit
  - `lib/` — вспомогательные утилиты
  - `theme/` — тема

Установка (dev):

```bash
npm install
npm run start
```

Сборка:

```bash
npm run build
```
