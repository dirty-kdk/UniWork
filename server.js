import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './server/config/db.js';
import userRoutes from './server/routes/userRoutes.js';
import jobRoutes from './server/routes/jobRoutes.js';
import applicationRoutes from './server/routes/applicationRoutes.js';

// Get directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Загрузка переменных окружения
dotenv.config();

// Инициализация Express
const app = express();
const PORT = process.env.PORT || 5000;

// Функция для подключения к MongoDB с повторными попытками
const connectWithRetry = async (maxRetries = 5, delayMs = 5000) => {
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      console.log(`Попытка подключения к MongoDB (${retries + 1}/${maxRetries})...`);
      await connectDB();
      console.log('Подключение к MongoDB успешно установлено!');
      return true;
    } catch (error) {
      retries++;
      
      if (retries >= maxRetries) {
        console.error(`Не удалось подключиться к MongoDB после ${maxRetries} попыток. Сервер не может быть запущен.`);
        console.error('Пожалуйста, проверьте ваши настройки подключения в файле .env или запустите MongoDB локально.');
        return false;
      }
      
      console.log(`Не удалось подключиться к MongoDB. Повторная попытка через ${delayMs/1000} секунд...`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  
  return false;
};

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

// Базовый маршрут
app.get('/', (req, res) => {
  res.send('University Job Platform API is running');
});

// Обработка ошибок
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Запускаем сервер с подключением к MongoDB
(async () => {
  if (await connectWithRetry()) {
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  }
})(); 