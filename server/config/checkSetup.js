import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../');

// Загружаем env файл
dotenv.config();

// Проверка наличия .env файла
const checkEnvFile = () => {
  const envPath = path.join(rootDir, '.env');
  if (!fs.existsSync(envPath)) {
    console.error('❌ .env файл не найден, создаю его...');
    
    const envContent = `PORT=5000
MONGODB_URI=mongodb://localhost:27017/university-job-platform
JWT_SECRET=university_job_platform_secret_key
NODE_ENV=development`;
    
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env файл создан');
  } else {
    console.log('✅ .env файл найден');
  }
};

// Проверка наличия папок сервера
const checkServerDirectories = () => {
  const directories = [
    'server/models',
    'server/controllers',
    'server/routes',
    'server/middleware',
    'server/config',
    'server/data'
  ];
  
  directories.forEach(dir => {
    const dirPath = path.join(rootDir, dir);
    if (!fs.existsSync(dirPath)) {
      console.error(`❌ Директория ${dir} не найдена, создаю...`);
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`✅ Директория ${dir} создана`);
    } else {
      console.log(`✅ Директория ${dir} найдена`);
    }
  });
};

// Запуск проверок
console.log('Проверка настройки проекта...');
checkEnvFile();
checkServerDirectories();

console.log('\n🚀 Проект настроен и готов к запуску!');
console.log('Для запуска сервера разработки выполните:');
console.log('npm run dev:all');
console.log('\nДля загрузки тестовых данных выполните:');
console.log('npm run data:import');

process.exit(0); 