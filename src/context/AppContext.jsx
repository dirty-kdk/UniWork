import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [jobs] = useState([
    {
      id: 1,
      title: 'Научный ассистент - Биологическая лаборатория',
      department: 'Факультет биологии',
      type: 'Стажировка',
      description: 'Участие в проведении исследований в области молекулярной биологии.',
    },
    {
      id: 2,
      title: 'Лаборант - Химический факультет',
      department: 'Химический факультет',
      type: 'Стажировка',
      description: 'Подготовка реактивов, уход за лабораторным оборудованием, помощь в проведении лабораторных работ студентов.',
    },
    {
      id: 3,
      title: 'Помощник в библиотеке',
      department: 'Университетская библиотека',
      type: 'Частичная занятость',
      description: 'Расстановка книг на полках, помощь посетителям в поиске литературы, работа с электронным каталогом.',
    },
    {
      id: 4,
      title: 'Стажер в отдел международных связей',
      department: 'Отдел международных связей',
      type: 'Стажировка',
      description: 'Помощь в организации мероприятий для иностранных студентов, перевод документов, ведение корреспонденции.',
    },
    {
      id: 5,
      title: 'Куратор студенческой группы (младшие курсы)',
      department: 'Деканат Филологического факультета',
      type: 'Частичная занятость',
      description: 'Помощь первокурсникам в адаптации к университетской жизни, организация встреч группы, информирование о важных событиях.',
    },
    {
        id: 6,
        title: 'Технический ассистент - IT поддержка кампуса',
        department: 'IT-служба университета',
        type: 'Частичная занятость',
        description: 'Консультирование студентов и преподавателей по техническим вопросам, базовая настройка ПО и оборудования в аудиториях.',
    },
    {
        id: 7,
        title: 'Ассистент редактора университетского сайта',
        department: 'Пресс-служба университета',
        type: 'Стажировка',
        description: 'Помощь в подготовке и публикации новостей на сайте университета, обработка фотографий, обновление разделов.',
    }
  ]);

  const [applications, setApplications] = useState([
    {
      id: 1,
      jobTitle: 'Ассистент преподавателя - Компьютерные науки',
      status: 'interview',
      appliedDate: '2024-03-15',
    },
    {
      id: 2,
      jobTitle: 'Научный ассистент - Биологическая лаборатория',
      status: 'rejected',
      appliedDate: '2024-03-10',
    },
  ]);

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    major: '',
    year: '',
    resume: null,
  });

  const applyForJob = (job) => {
    const newApplication = {
      id: applications.length + 1,
      jobTitle: job.title,
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0],
    };
    setApplications([...applications, newApplication]);
  };

  const updateProfile = (newProfile) => {
    setProfile(newProfile);
    localStorage.setItem('userProfile', JSON.stringify(newProfile));
  };

  return (
    <AppContext.Provider value={{
      jobs,
      applications,
      profile,
      applyForJob,
      updateProfile,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
