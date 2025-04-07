import { useEffect } from 'react';
import { useApp } from '../context/AppContext';

function Profile() {
  const { profile, updateProfile } = useApp();

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      updateProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(profile);
    alert('Профиль успешно сохранен!');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Профиль студента</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">ФИО</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300"
            value={profile.name}
            onChange={(e) => updateProfile({ ...profile, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="mt-1 block w-full rounded-md border-gray-300"
            value={profile.email}
            onChange={(e) => updateProfile({ ...profile, email: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Специальность</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300"
            value={profile.major}
            onChange={(e) => updateProfile({ ...profile, major: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Курс</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300"
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

        <div>
          <label className="block text-sm font-medium text-gray-700">Резюме</label>
          <input
            type="file"
            className="mt-1 block w-full"
            onChange={(e) => updateProfile({ ...profile, resume: e.target.files[0] })}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Сохранить профиль
        </button>
      </form>
    </div>
  );
}

export default Profile;