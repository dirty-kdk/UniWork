
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

function Profile() {
  const { profile, updateProfile } = useApp();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  useEffect(() => {
    // Получаем информацию о вошедшем пользователе
    const userInfo = localStorage.getItem('user');
    if (!userInfo) {
      // Если пользователь не залогинен, перенаправляем на страницу входа
      navigate('/login');
      return;
    }

    // Парсим информацию о пользователе
    const user = JSON.parse(userInfo);
    
    // Пытаемся получить сохраненный профиль пользователя
    const savedProfile = localStorage.getItem('userProfile');
    
    if (savedProfile) {
      // Если профиль уже существует, загружаем его
      const parsedProfile = JSON.parse(savedProfile);
      updateProfile(parsedProfile);
    } else {
      // Если профиля нет, создаем новый с email из данных пользователя
      updateProfile({
        name: '',
        email: user.email || '',
        major: '',
        year: '',
        resume: null
      });
    }
    
    setIsLoading(false);
  }, [navigate, updateProfile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Сохраняем профиль в localStorage
    localStorage.setItem('userProfile', JSON.stringify(profile));
    alert('Профиль успешно сохранен!');
  };

  // Функция для выхода из аккаунта
  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('user');
    localStorage.removeItem('userProfile'); // Для полного выхода удаляем и профиль
    navigate('/login');
  };

  // Показываем индикатор загрузки, пока не загрузим данные
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Загрузка профиля...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Профиль студента
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            Выйти
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ФИО</label>
              <input
                type="text"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={profile.name}
                onChange={(e) => updateProfile({ ...profile, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={profile.email}
                  onChange={(e) => updateProfile({ ...profile, email: e.target.value })}
                  required
                  disabled={!isEditingEmail}
                />
                <button
                  type="button"
                  onClick={() => setIsEditingEmail(!isEditingEmail)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100"
                  title={isEditingEmail ? "Завершить редактирование" : "Редактировать email"}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-gray-500 hover:text-blue-500" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    {isEditingEmail ? (
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7" 
                      />
                    ) : (
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" 
                      />
                    )}
                  </svg>
                </button>
              </div>
              {isEditingEmail && (
                <p className="mt-1 text-xs text-blue-600">Редактирование email включено</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Специальность</label>
              <input
                type="text"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={profile.major}
                onChange={(e) => updateProfile({ ...profile, major: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Курс</label>
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={profile.year}
                onChange={(e) => updateProfile({ ...profile, year: e.target.value })}
                required
              >
                <option value="">Выберите курс</option>
                <option value="1">Первый курс</option>
                <option value="2">Второй курс</option>
                <option value="3">Третий курс</option>
                <option value="4">Четвертый курс</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Резюме</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-blue-500 transition-colors">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Загрузить файл</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={(e) => updateProfile({ ...profile, resume: e.target.files[0] })}
                    />
                  </label>
                  <p className="pl-1">или перетащите его сюда</p>
                </div>
                <p className="text-xs text-gray-500">PDF до 10MB</p>
                {profile.resume && (
                  <p className="text-sm text-green-600">
                    Выбран файл: {profile.resume.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Сохранить профиль
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
