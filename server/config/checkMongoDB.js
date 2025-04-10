import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { execSync } from 'child_process';

// Загрузка переменных окружения
dotenv.config();

const checkMongoDB = async () => {
  console.log('Проверка подключения к MongoDB...');
  
  // Проверка строки подключения
  const mongoURI = process.env.MONGODB_URI;
  if (!mongoURI) {
    console.error('❌ MONGODB_URI не найден в файле .env');
    return false;
  }
  
  // Подключение к MongoDB
  try {
    // Проверка на локальное подключение
    if (mongoURI.includes('localhost') || mongoURI.includes('127.0.0.1')) {
      console.log('📌 Вы используете локальную MongoDB');
      
      // Проверка запущена ли MongoDB локально
      try {
        console.log('Проверка статуса локального сервера MongoDB...');
        
        // Проверка Windows
        if (process.platform === 'win32') {
          try {
            execSync('sc query MongoDB', { stdio: 'ignore' });
            console.log('✅ Служба MongoDB запущена');
          } catch (e) {
            console.warn('⚠️ Служба MongoDB не запущена или не установлена');
            console.log('📋 Инструкции по установке MongoDB:');
            console.log('1. Скачайте MongoDB Community Server с сайта mongodb.com');
            console.log('2. Установите с опцией "Run as a service"');
            console.log('--- ИЛИ ---');
            console.log('Используйте MongoDB Atlas (облачная версия)');
            return false;
          }
        } 
        // Проверка Linux/macOS
        else if (process.platform === 'linux' || process.platform === 'darwin') {
          try {
            execSync('pgrep mongod', { stdio: 'ignore' });
            console.log('✅ Процесс MongoDB запущен');
          } catch (e) {
            console.warn('⚠️ Процесс MongoDB не запущен');
            console.log('📋 Запустите MongoDB:');
            console.log('Linux: sudo systemctl start mongodb');
            console.log('macOS: brew services start mongodb-community');
            return false;
          }
        }
      } catch (e) {
        console.log('⚠️ Не удалось проверить статус MongoDB');
      }
    } else {
      console.log('📌 Вы используете удаленную MongoDB (Atlas или другой сервер)');
    }
    
    // Пробуем подключиться
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000
    });
    
    console.log('✅ Успешное подключение к MongoDB!');
    mongoose.disconnect();
    return true;
  } catch (error) {
    console.error(`❌ Ошибка подключения к MongoDB: ${error.message}`);
    
    if (mongoURI.includes('mongodb+srv')) {
      console.log('📋 Для MongoDB Atlas проверьте:');
      console.log('1. Правильность имени пользователя и пароля');
      console.log('2. IP адрес добавлен в белый список');
      console.log('3. Кластер активен и доступен');
    } else {
      console.log('📋 Для локальной MongoDB проверьте:');
      console.log('1. MongoDB установлена и запущена');
      console.log('2. Порт 27017 доступен и не блокируется файрволом');
    }
    
    return false;
  }
};

// Запускаем проверку
checkMongoDB()
  .then(success => {
    if (success) {
      console.log('✨ MongoDB готова к использованию');
    } else {
      console.error('❌ Не удалось подключиться к MongoDB. Пожалуйста, исправьте проблемы и повторите попытку.');
    }
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('Неожиданная ошибка:', error);
    process.exit(1);
  }); 