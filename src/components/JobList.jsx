import { useState } from 'react';
import { useApp } from '../context/AppContext';

function JobList() {
  const { jobs, applyForJob } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || job.type.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const handleApply = (job) => {
    applyForJob(job);
    alert('Заявка успешно отправлена!');
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Доступные вакансии</h1>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Поиск вакансий..."
            className="flex-1 rounded-md border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="rounded-md border-gray-300"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Все типы</option>
            <option value="Частичная занятость">Частичная занятость</option>
            <option value="Стажировка">Стажировка</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredJobs.map(job => (
          <div key={job.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h2>
            <p className="text-gray-600 mb-2">{job.department}</p>
            <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm mb-4">
              {job.type}
            </span>
            <p className="text-gray-700 mb-4">{job.description}</p>
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              onClick={() => handleApply(job)}
            >
              Откликнуться
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobList;