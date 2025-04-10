# Платформа для студенческих вакансий университета

Веб-приложение для размещения и поиска вакансий в рамках университета.

## Функциональность

- Просмотр доступных вакансий
- Регистрация и авторизация
- Создание и управление профилем
- Подача заявок на вакансии
- Отслеживание статуса заявок

## Технический стек

- Frontend: React, Tailwind CSS
- Backend: Node.js, Express
- База данных: MongoDB
- Аутентификация: JWT

## Установка и запуск

1. Клонировать репозиторий
```
git clone <repository-url>
cd project-new-backend
```

2. Установить зависимости
```
npm install
```

3. Создать файл .env в корне проекта со следующими переменными:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/university-job-platform
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

4. Запустить MongoDB
- Убедитесь, что MongoDB запущена локально на порту 27017, или
- Укажите URL MongoDB Atlas в переменной MONGODB_URI

5. Загрузить начальные данные
```
npm run data:import
```

6. Запустить приложение

Запуск только фронтенда:
```
npm run dev
```

Запуск только бэкенда:
```
npm run dev:server
```

Запуск и фронтенда, и бэкенда одновременно:
```
npm run dev:all
```

## Доступ к приложению

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Тестовый аккаунт

После запуска `npm run data:import` будет создан тестовый пользователь:
- Email: test@example.com
- Пароль: password123
