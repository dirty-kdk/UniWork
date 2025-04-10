# Инструкции по настройке и запуску проекта

## Необходимые требования

1. Node.js версии 14 или выше
2. MongoDB (или доступ к MongoDB Atlas)

## Исправление ошибки подключения к MongoDB

### Проверка подключения к MongoDB

Сначала проверьте подключение к MongoDB:

```
npm run check-mongodb
```

Если вы видите ошибку подключения, у вас есть два варианта:

### Вариант 1: Использование MongoDB Atlas (рекомендуется)

1. Создайте бесплатный аккаунт на [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Создайте новый кластер (бесплатный тариф)
3. В разделе Security > Database Access создайте пользователя с паролем
4. В разделе Security > Network Access добавьте ваш IP адрес (или 0.0.0.0/0 для доступа отовсюду)
5. В разделе Databases нажмите "Connect" → "Connect your application" и скопируйте строку подключения
6. Откройте файл `.env` в корне проекта и измените значение `MONGODB_URI`:

```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/university-job-platform?retryWrites=true&w=majority
```

Замените `<username>`, `<password>` и `<cluster>` вашими данными.

### Вариант 2: Установка и запуск локальной MongoDB

#### Windows:
1. Скачайте и установите [MongoDB Community Server](https://www.mongodb.com/try/download/community)
2. При установке выберите "Complete" и включите опцию "Install MongoDB as a Service"
3. После установки MongoDB должна запуститься автоматически
4. Проверьте запущена ли служба MongoDB через Диспетчер задач → Службы

#### macOS:
```
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Linux (Ubuntu/Debian):
```
sudo apt update
sudo apt install -y mongodb
sudo systemctl enable mongodb
sudo systemctl start mongodb
```

## Устранение проблем при запуске

### Шаг 1: Установка зависимостей

```
npm install
```

### Шаг 2: Проверка структуры папок

Проект должен содержать следующие папки и файлы:
- server/
  - config/
  - controllers/
  - data/
  - middleware/
  - models/
  - routes/
- src/
- .env (в корне проекта)
- server.js (в корне проекта)

Запустите скрипт настройки для автоматического создания структуры:
```
npm run setup
```

### Шаг 3: Проверка файла .env

Файл .env должен содержать:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/university-job-platform
JWT_SECRET=university_job_platform_secret_key
NODE_ENV=development
```

Или с MongoDB Atlas:
```
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/university-job-platform?retryWrites=true&w=majority
JWT_SECRET=university_job_platform_secret_key
NODE_ENV=development
```

### Шаг 4: Проверка соединения с MongoDB

```
npm run check-mongodb
```

### Шаг 5: Запуск сервера

```
npm run dev:server
```

Если всё настроено правильно, вы должны увидеть сообщение:
```
Server running on port 5000
MongoDB Connected: <hostname>
```

### Шаг 6: Импорт тестовых данных

```
npm run data:import
```

### Шаг 7: Запуск клиента

```
npm run dev
```

### Шаг 8: Запуск полного стека (сервер + клиент)

```
npm run dev:all
```

## Типичные ошибки и решения

### Ошибка: "Error: connect ECONNREFUSED ::1:27017, connect ECONNREFUSED 127.0.0.1:27017"

Решение: 
1. MongoDB не запущена на локальном компьютере
2. Следуйте инструкциям в разделе "Исправление ошибки подключения к MongoDB"

### Ошибка: "MongooseError: Operation `jobs.find()` buffering timed out after 10000ms"

Решение: 
1. Проблема с подключением к MongoDB
2. Запустите `npm run check-mongodb` для диагностики
3. Перейдите на MongoDB Atlas или запустите локальную MongoDB

### Ошибка: "Error: Cannot find module 'bcrypt'"

Решение: Используйте bcryptjs вместо bcrypt
```
npm uninstall bcrypt
npm install bcryptjs
```

И обновите импорты в файлах:
```javascript
import bcrypt from 'bcryptjs';
```

### Ошибка: "MongooseError: The `uri` parameter to `openUri()` must be a string"

Решение: Проверьте наличие файла .env в корне проекта с правильной строкой подключения к MongoDB.

### Ошибка: "Error: Cannot find module './server/routes/userRoutes.js'"

Решение: 
1. Проверьте структуру каталогов и наличие всех необходимых файлов
2. Запустите `npm run setup` для создания недостающих папок

### Ошибка: "SyntaxError: Cannot use import statement outside a module"

Решение: Убедитесь, что в package.json присутствует строка: `"type": "module"`.

## Дополнительные инструменты для отладки

### Запуск проверки настройки

```
npm run setup
```

Это создаст необходимые каталоги и .env файл, если их нет.

### Проверка подключения к MongoDB

```
npm run check-mongodb
``` 