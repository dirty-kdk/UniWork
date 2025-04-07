import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [jobs] = useState([
    {
      id: 1,
      title: 'Ассистент преподавателя - Компьютерные науки',
      department: 'Факультет компьютерных наук',
      type: 'Частичная занятость',
      description: 'Помощь в проведении практических занятий для студентов младших курсов.',
    },
    {
      id: 2,
      title: 'Научный ассистент - Биологическая лаборатория',
      department: 'Факультет биологии',
      type: 'Стажировка',
      description: 'Участие в проведении исследований в области молекулярной биологии.',
    },
  ]);

  const [applications, setApplications] = useState([
    {
      id: 1,
      jobTitle: 'Ассистент преподавателя - Компьютерные науки',
      status: 'pending',
      appliedDate: '2024-03-15',
    },
    {
      id: 2,
      jobTitle: 'Научный ассистент - Биологическая лаборатория',
      status: 'interview',
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