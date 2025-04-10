import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Job from '../models/jobModel.js';
import User from '../models/userModel.js';
import Application from '../models/applicationModel.js';

// Загрузка переменных окружения
dotenv.config();

// Вакансии для загрузки
const jobs = [
  {
    title: 'Научный ассистент - Биологическая лаборатория',
    department: 'Факультет биологии',
    type: 'Стажировка',
    description: 'Участие в проведении исследований в области молекулярной биологии.',
  },
  {
    title: 'Лаборант - Химический факультет',
    department: 'Химический факультет',
    type: 'Стажировка',
    description: 'Подготовка реактивов, уход за лабораторным оборудованием, помощь в проведении лабораторных работ студентов.',
  },
  {
    title: 'Помощник в библиотеке',
    department: 'Университетская библиотека',
    type: 'Частичная занятость',
    description: 'Расстановка книг на полках, помощь посетителям в поиске литературы, работа с электронным каталогом.',
  },
  {
    title: 'Стажер в отдел международных связей',
    department: 'Отдел международных связей',
    type: 'Стажировка',
    description: 'Помощь в организации мероприятий для иностранных студентов, перевод документов, ведение корреспонденции.',
  },
  {
    title: 'Куратор студенческой группы (младшие курсы)',
    department: 'Деканат Филологического факультета',
    type: 'Частичная занятость',
    description: 'Помощь первокурсникам в адаптации к университетской жизни, организация встреч группы, информирование о важных событиях.',
  },
  {
    title: 'Технический ассистент - IT поддержка кампуса',
    department: 'IT-служба университета',
    type: 'Частичная занятость',
    description: 'Консультирование студентов и преподавателей по техническим вопросам, базовая настройка ПО и оборудования в аудиториях.',
  },
  {
    title: 'Ассистент редактора университетского сайта',
    department: 'Пресс-служба университета',
    type: 'Стажировка',
    description: 'Помощь в подготовке и публикации новостей на сайте университета, обработка фотографий, обновление разделов.',
  }
];

// Функция для импорта данных
const importData = async () => {
  try {
    // Подключение к MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Удаление всех существующих данных
    await Job.deleteMany();
    await User.deleteMany();
    await Application.deleteMany();
    
    // Загрузка вакансий
    await Job.insertMany(jobs);
    
    // Создание тестового пользователя
    await User.create({
      name: 'Тестовый Пользователь',
      email: 'test@example.com',
      password: 'password123',
      major: 'Компьютерные науки',
      year: '3',
    });
    
    console.log('Данные успешно загружены!');
    process.exit();
  } catch (error) {
    console.error(`Ошибка при загрузке данных: ${error.message}`);
    process.exit(1);
  }
};

// Функция для удаления всех данных
const destroyData = async () => {
  try {
    // Подключение к MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Удаление всех существующих данных
    await Job.deleteMany();
    await User.deleteMany();
    await Application.deleteMany();
    
    console.log('Все данные успешно удалены!');
    process.exit();
  } catch (error) {
    console.error(`Ошибка при удалении данных: ${error.message}`);
    process.exit(1);
  }
};

// Определение действия на основе команды
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
} 