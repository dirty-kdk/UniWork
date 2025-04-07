import { useApp } from '../context/AppContext';

function Applications() {
  const { applications } = useApp();

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

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Мои заявки</h1>
      
      <div className="space-y-4">
        {applications.map(application => (
          <div key={application.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {application.jobTitle}
            </h2>
            <div className="flex justify-between items-center">
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
    </div>
  );
}

export default Applications;