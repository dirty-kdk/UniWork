import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = createContext();

const API_URL = 'http://localhost:8000/api';

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    major: '',
    year: '',
    resume: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Настройка axios с токеном авторизации
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  // Инициализация - проверка наличия токена в localStorage
  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem('user'));
    if (userFromStorage && userFromStorage.token) {
      setUser(userFromStorage);
      setAuthToken(userFromStorage.token);
      
      // Load profile
      loadProfile();
      
      // Load jobs
      loadJobs();
      
      // Load applications from localStorage first (for immediate display)
      try {
        const savedApplications = localStorage.getItem('userApplications');
        if (savedApplications) {
          const parsedApplications = JSON.parse(savedApplications);
          if (Array.isArray(parsedApplications) && parsedApplications.length > 0) {
            setApplications(parsedApplications);
          }
        }
      } catch (error) {
        console.error('Error loading applications from localStorage:', error);
      }
      
      // Then try to load from server in background
      if (userFromStorage.token) {
        loadApplications().catch(err => {
          console.error('Failed to load applications from server:', err);
        });
      }
    } else {
      loadJobs();
    }
  }, []);

  // Получение списка вакансий
  const loadJobs = async () => {
    try {
      setIsLoading(true);
      console.log('Загрузка вакансий...');
      const { data } = await axios.get(`${API_URL}/jobs`);
      console.log('Получены вакансии:', data);
      
      // Если с сервера пришел пустой массив, загружаем демо-данные
      if (Array.isArray(data) && data.length === 0) {
        console.log('Сервер вернул пустой массив вакансий, используем демо-данные');
        loadDemoJobs();
      } else {
        setJobs(data);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Ошибка при загрузке вакансий:', error);
      
      // Если API недоступен, добавим демо-данные
      if (error.message && (error.message.includes('Network Error') || error.response?.status >= 400)) {
        loadDemoJobs();
      }
      
      setIsLoading(false);
    }
  };

  // Загрузка демо-данных вакансий
  const loadDemoJobs = () => {
    console.log('Загрузка демо-данных вакансий...');
    
    // Демо-данные
    const demoJobs = [
      {
        _id: '1',
        title: 'Научный ассистент - Биологическая лаборатория',
        department: 'Факультет биологии',
        type: 'Стажировка',
        description: 'Участие в проведении исследований в области молекулярной биологии.',
      },
      {
        _id: '2',
        title: 'Лаборант - Химический факультет',
        department: 'Химический факультет',
        type: 'Стажировка',
        description: 'Подготовка реактивов, уход за лабораторным оборудованием, помощь в проведении лабораторных работ студентов.',
      },
      {
        _id: '3',
        title: 'Помощник в библиотеке',
        department: 'Университетская библиотека',
        type: 'Частичная занятость',
        description: 'Расстановка книг на полках, помощь посетителям в поиске литературы, работа с электронным каталогом.',
      },
      {
        _id: '4',
        title: 'Технический ассистент - IT поддержка кампуса',
        department: 'IT-служба университета',
        type: 'Частичная занятость',
        description: 'Консультирование студентов и преподавателей по техническим вопросам, базовая настройка ПО и оборудования в аудиториях.',
      },
      {
        _id: '5',
        title: 'Ассистент редактора университетского сайта',
        department: 'Пресс-служба университета',
        type: 'Стажировка',
        description: 'Помощь в подготовке и публикации новостей на сайте университета, обработка фотографий, обновление разделов.',
      },
      {
        _id: '6',
        title: 'Куратор студенческой группы (младшие курсы)',
        department: 'Деканат Филологического факультета',
        type: 'Частичная занятость',
        description: 'Помощь первокурсникам в адаптации к университетской жизни, организация встреч группы, информирование о важных событиях.',
      },
      {
        _id: '7',
        title: 'Стажер в отдел международных связей',
        department: 'Отдел международных связей',
        type: 'Стажировка',
        description: 'Помощь в организации мероприятий для иностранных студентов, перевод документов, ведение корреспонденции.',
      },
      {
        _id: '8',
        title: 'Помощник преподавателя математики',
        department: 'Факультет математики',
        type: 'Частичная занятость',
        description: 'Проверка домашних заданий, помощь в проведении практических занятий, консультирование студентов.',
      },
      {
        _id: '9',
        title: 'Ассистент исследователя - Физическая лаборатория',
        department: 'Факультет физики',
        type: 'Стажировка',
        description: 'Проведение экспериментов, сбор и анализ данных, помощь в оформлении научных публикаций.',
      },
      {
        _id: '10',
        title: 'Координатор студенческих мероприятий',
        department: 'Студенческий союз',
        type: 'Частичная занятость',
        description: 'Организация и проведение культурных, образовательных и развлекательных мероприятий для студентов университета.',
      },
      {
        _id: '11',
        title: 'Помощник в университетском архиве',
        department: 'Исторический факультет',
        type: 'Частичная занятость',
        description: 'Систематизация документов, оцифровка архивных материалов, помощь в проведении исследований.',
      },
      {
        _id: '12',
        title: 'Администратор социальных сетей университета',
        department: 'Отдел маркетинга',
        type: 'Стажировка',
        description: 'Создание контента, общение с аудиторией, анализ эффективности публикаций в социальных сетях университета.',
      },
      {
        _id: '13',
        title: 'Менеджер студенческого кафе',
        department: 'Административно-хозяйственная часть',
        type: 'Частичная занятость',
        description: 'Организация работы студенческого кафе, составление графиков, контроль качества обслуживания.',
      },
      {
        _id: '14',
        title: 'Лаборант-исследователь - Экологический мониторинг',
        department: 'Кафедра экологии',
        type: 'Стажировка',
        description: 'Сбор и анализ проб, участие в полевых исследованиях, подготовка отчетной документации.',
      },
      {
        _id: '15',
        title: 'Ассистент в юридической клинике',
        department: 'Юридический факультет',
        type: 'Частичная занятость',
        description: 'Помощь в консультировании граждан, подготовка документов, участие в обучающих мероприятиях.',
      },
      {
        _id: '16',
        title: 'Оператор университетского колл-центра',
        department: 'Приемная комиссия',
        type: 'Частичная занятость',
        description: 'Консультирование абитуриентов по телефону, ответы на вопросы о поступлении и обучении в университете.',
      },
      {
        _id: '17',
        title: 'Программист - Разработка образовательных приложений',
        department: 'Лаборатория информационных технологий',
        type: 'Стажировка',
        description: 'Участие в разработке мобильных и веб-приложений для образовательной платформы университета.',
      },
      {
        _id: '18',
        title: 'Ассистент PR-менеджера',
        department: 'Отдел связей с общественностью',
        type: 'Стажировка',
        description: 'Помощь в организации пресс-конференций, подготовка пресс-релизов, взаимодействие со СМИ.',
      },
      {
        _id: '19',
        title: 'Научный сотрудник - Исследовательская лаборатория',
        department: 'Факультет химической технологии',
        type: 'Полная занятость',
        description: 'Проведение научных исследований, руководство работой студентов, публикация научных статей.',
      },
      {
        _id: '20',
        title: 'Координатор международных программ',
        department: 'Отдел международных связей',
        type: 'Полная занятость',
        description: 'Организация международных обменов, сопровождение иностранных делегаций, подготовка отчетности для грантовых программ.',
      },
      {
        _id: '21',
        title: 'Администратор университетской гостиницы',
        department: 'Кампус',
        type: 'Полная занятость',
        description: 'Управление заселением/выселением, контроль работы персонала, решение проблем проживающих.',
      },
      {
        _id: '22',
        title: 'Преподаватель английского языка',
        department: 'Языковой центр',
        type: 'Полная занятость',
        description: 'Проведение занятий по английскому языку для студентов различных факультетов, разработка учебных материалов.',
      },
      {
        _id: '23',
        title: 'Системный администратор',
        department: 'IT-служба университета',
        type: 'Полная занятость',
        description: 'Обслуживание серверов и сетевой инфраструктуры, установка и настройка ПО, обеспечение информационной безопасности.',
      },
      {
        _id: '24',
        title: 'Руководитель студенческого театра',
        department: 'Культурный центр',
        type: 'Полная занятость',
        description: 'Организация работы студенческого театра, постановка спектаклей, проведение мастер-классов по актерскому мастерству.',
      },
      {
        _id: '25',
        title: 'Менеджер грантовых программ',
        department: 'Научно-исследовательский отдел',
        type: 'Полная занятость',
        description: 'Поиск грантовых возможностей, помощь в подготовке заявок, контроль выполнения условий грантов.',
      }
    ];
    
    setJobs(demoJobs);
  };

  // Получение профиля пользователя
  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${API_URL}/users/profile`);
      setProfile({
        name: data.name,
        email: data.email,
        major: data.major || '',
        year: data.year || '',
        resume: data.resume || null,
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Ошибка при загрузке профиля:', error);
      setIsLoading(false);
    }
  };

  // Получение списка заявок пользователя
  const loadApplications = async () => {
    try {
      setIsLoading(true);
      console.log('Загрузка заявок...');
      
      if (!user || !user.token) {
        console.log('Нет авторизированного пользователя для загрузки заявок');
        setIsLoading(false);
        return;
      }
      
      const { data } = await axios.get(`${API_URL}/applications`);
      console.log('Получены заявки:', data);
      
      // Проверка что data - это массив
      if (!Array.isArray(data)) {
        console.error('Получены некорректные данные заявок:', data);
        setIsLoading(false);
        return;
      }
      
      // Преобразуем данные в формат, совместимый с фронтендом
      const formattedApplications = data.map(app => ({
        id: app._id || `temp-${Date.now()}`,
        jobTitle: app.job?.title || 'Неизвестная вакансия',
        status: app.status || 'pending',
        appliedDate: app.appliedDate 
          ? new Date(app.appliedDate).toISOString().split('T')[0] 
          : new Date().toISOString().split('T')[0],
      }));
      
      setApplications(formattedApplications);
      setIsLoading(false);
    } catch (error) {
      console.error('Ошибка при загрузке заявок:', error);
      
      // Если API недоступен или вернул ошибку, но у нас уже есть локальные заявки, сохраняем их
      if (applications.length > 0) {
        console.log('Сохраняем существующие локальные заявки');
        setIsLoading(false);
        return;
      }
      
      // Если API недоступен, добавим демо-данные
      if (error.message && (error.message.includes('Network Error') || error.response?.status >= 400)) {
        console.log('Используем демо-данные для заявок');
        
        // Демо-данные
        const demoApplications = [
          {
            id: '1',
            jobTitle: 'Ассистент преподавателя - Компьютерные науки',
            status: 'interview',
            appliedDate: new Date().toISOString().split('T')[0],
          }
        ];
        
        setApplications(demoApplications);
      }
      
      setIsLoading(false);
    }
  };

  // Регистрация
  const register = async (name, email, password) => {
    try {
      setIsLoading(true);
      console.log('Отправка запроса на регистрацию...');
      
      const { data } = await axios.post(`${API_URL}/users/register`, {
        name,
        email,
        password,
      });
      
      console.log('Ответ сервера:', data);
      
      // Сохраняем пользователя и токен
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      setAuthToken(data.token);
      
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      setIsLoading(false);
      
      // Если API недоступен, создаем локального пользователя
      if (error.message && error.message.includes('Network Error')) {
        console.log('API недоступен, создаем локального пользователя');
        
        const mockUser = {
          _id: Date.now().toString(),
          name,
          email,
          token: 'local-token-' + Math.random().toString(36).substring(2)
        };
        
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        
        return { success: true };
      }
      
      return { 
        success: false, 
        message: error.response && error.response.data.message 
          ? error.response.data.message 
          : 'Ошибка регистрации. Проверьте соединение с сервером.'
      };
    }
  };

  // Авторизация
  const login = async (email, password) => {
    try {
      setIsLoading(true);
      console.log('Отправка запроса на вход...');
      
      const { data } = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
      });
      
      console.log('Ответ сервера:', data);
      
      // Сохраняем пользователя и токен
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      setAuthToken(data.token);
      
      // Загружаем заявки пользователя
      await loadApplications();
      
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      console.error('Ошибка входа:', error);
      setIsLoading(false);
      
      // Если API недоступен, используем демо-аккаунт
      if (error.message && error.message.includes('Network Error')) {
        console.log('API недоступен, используем демо-аккаунт');
        
        const mockUser = {
          _id: '999',
          name: 'Демо Пользователь',
          email: email,
          token: 'demo-token-' + Math.random().toString(36).substring(2)
        };
        
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        
        return { success: true };
      }
      
      return { 
        success: false, 
        message: error.response && error.response.data.message 
          ? error.response.data.message 
          : 'Неверный email или пароль. Проверьте соединение с сервером.'
      };
    }
  };

  // Выход
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setAuthToken(null);
    setApplications([]);
  };

  // Подача заявки на вакансию
  const applyForJob = async (job) => {
    try {
      setIsLoading(true);
      
      // Check if user is authenticated
      if (!user || !user.token) {
        setIsLoading(false);
        return { 
          success: false, 
          message: 'Необходимо войти в систему для подачи заявки' 
        };
      }
      
      // Create a new application object
      const newApplication = {
        id: `app-${Date.now()}`,
        jobTitle: job.title,
        status: 'pending',
        appliedDate: new Date().toISOString().split('T')[0],
      };
      
      // Update local state immediately
      const updatedApplications = [...applications, newApplication];
      setApplications(updatedApplications);
      
      // Save to localStorage for persistence
      try {
        localStorage.setItem('userApplications', JSON.stringify(updatedApplications));
      } catch (storageError) {
        console.error('Error saving to localStorage:', storageError);
      }
      
      // Try to send to server in background
      try {
        const { data } = await axios.post(`${API_URL}/applications`, {
          jobId: job._id,
        });
        
        // If successful, update the ID with the server-generated one
        if (data && data._id) {
          const serverApplication = {
            id: data._id,
            jobTitle: job.title,
            status: data.status || 'pending',
            appliedDate: data.appliedDate 
              ? new Date(data.appliedDate).toISOString().split('T')[0]
              : newApplication.appliedDate,
          };
          
          // Replace the temporary application with the server one
          const finalApplications = applications
            .filter(app => app.id !== newApplication.id)
            .concat(serverApplication);
            
          setApplications(finalApplications);
          
          // Update localStorage
          try {
            localStorage.setItem('userApplications', JSON.stringify(finalApplications));
          } catch (storageError) {
            console.error('Error saving updated applications to localStorage:', storageError);
          }
        }
      } catch (serverError) {
        console.error('Server error during job application:', serverError);
        // We already added the application to local state, so no further action needed
      }
      
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      console.error('Error applying for job:', error);
      setIsLoading(false);
      return { success: false, message: 'Не удалось добавить заявку' };
    }
  };

  // Обновление профиля
  const updateProfile = async (newProfile) => {
    try {
      setIsLoading(true);
      
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('name', newProfile.name);
      formData.append('email', newProfile.email);
      formData.append('major', newProfile.major || '');
      formData.append('year', newProfile.year || '');
      
      // Only append resume if it's a File object
      if (newProfile.resume instanceof File) {
        formData.append('resume', newProfile.resume);
      }
      
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      
      const { data } = await axios.put(`${API_URL}/users/profile`, formData, config);
      
      setProfile({
        name: data.name,
        email: data.email,
        major: data.major || '',
        year: data.year || '',
        resume: data.resume || null,
      });
      
      // Обновляем пользователя в localStorage
      const updatedUser = { ...user, ...data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      console.error('Error updating profile:', error);
      setIsLoading(false);
      return { 
        success: false, 
        message: error.response && error.response.data.message 
          ? error.response.data.message 
          : 'Ошибка сервера'
      };
    }
  };

  return (
    <AppContext.Provider value={{
      user,
      isLoading,
      jobs,
      applications,
      profile,
      register,
      login,
      logout,
      applyForJob,
      updateProfile,
      loadApplications,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}