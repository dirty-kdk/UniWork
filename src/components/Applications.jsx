import { useApp } from '../context/AppContext';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Applications() {
  const { applications, user, loadApplications, isLoading: globalLoading } = useApp();
  const [localLoading, setLocalLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  
  // Only load applications from server once when component mounts and we don't have any yet
  useEffect(() => {
    async function fetchApplications() {
      if (user && user.token && applications.length === 0 && !hasLoaded) {
        setLocalLoading(true);
        try {
          await loadApplications();
        } catch (error) {
          console.error('Error loading applications:', error);
        } finally {
          setLocalLoading(false);
          setHasLoaded(true);
        }
      }
    }
    
    fetchApplications();
  }, [user, loadApplications, applications.length, hasLoaded]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'interview':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'На рассмотрении';
      case 'interview':
        return 'Приглашение на собеседование';
      case 'rejected':
        return 'Отклонено';
      default:
        return status;
    }
  };
  
  // Use local loading state instead of global
  const isLoading = localLoading || globalLoading;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Мои заявки</h1>
      
      {isLoading ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-600">Загрузка ваших заявок...</p>
        </div>
      ) : applications.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-600">У вас пока нет поданных заявок</p>
          <p className="text-gray-600 mt-2">
            <Link to="/" className="text-blue-600 hover:text-blue-800">
              Перейдите на страницу вакансий
            </Link>, чтобы откликнуться на интересующие вас позиции
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map(application => (
            <div key={application.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {application.jobTitle}
              </h2>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <span className={`inline-block px-2 py-1 rounded text-sm ${getStatusColor(application.status)}`}>
                  {getStatusText(application.status)}
                </span>
                <span className="text-gray-600">
                  Дата подачи: {new Date(application.appliedDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Applications;