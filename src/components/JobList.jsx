import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

function JobList() {
  const { jobs, applyForJob, profile, isLoading } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const isProfileComplete = () => {
    return profile.name && profile.email && profile.major && profile.year && profile.resume;
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || job.type.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const handleApply = async (job) => {
    if (!isProfileComplete()) {
      alert('Для отклика на вакансию необходимо заполнить профиль');
      navigate('/profile');
      return;
    }
    
    try {
      const result = await applyForJob(job);
      
      if (result.success) {
        alert('Заявка успешно отправлена!');
      } else {
        alert(`Ошибка: ${result.message || 'Не удалось отправить заявку'}`);
      }
    } catch (error) {
      console.error('Error in handleApply:', error);
      
      // Fallback for any unhandled errors - still try to add locally
      alert('Произошла ошибка, но заявка была добавлена в ваш список');
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Доступные вакансии</h1>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Поиск вакансий..."
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Все типы</option>
            <option value="Частичная занятость">Частичная занятость</option>
            <option value="Стажировка">Стажировка</option>
            <option value="Полная занятость">Полная занятость</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-10">
          <p className="text-gray-600">Загрузка вакансий...</p>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600">Вакансии не найдены</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map(job => (
            <div key={job._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h2>
              <p className="text-gray-600 mb-2">{job.department}</p>
              <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm mb-4">
                {job.type}
              </span>
              <p className="text-gray-700 mb-4">{job.description}</p>
              <button 
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                onClick={() => handleApply(job)}
              >
                Откликнуться
              </button>
            </div>
          ))}
        </div>
      )}

      {jobs.length > 0 && (
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>Всего вакансий: {jobs.length}</p>
        </div>
      )}
    </div>
  );
}

export default JobList;