import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'; // Placeholder for AuthContext

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  // const { login } = useAuth(); // Placeholder for login function

  // Функция для проверки учетных данных
  const checkCredentials = (email, password) => {
    // Получаем список зарегистрированных пользователей
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Ищем пользователя с указанным email
    const user = registeredUsers.find(user => user.email === email);
    
    // Если пользователь не найден, возвращаем ошибку
    if (!user) {
      return { success: false, message: 'Email не зарегистрирован. Пожалуйста, сначала зарегистрируйтесь.' };
    }
    
    // Если пароль не совпадает, возвращаем ошибку
    if (user.password !== password) {
      return { success: false, message: 'Неверный пароль. Пожалуйста, попробуйте снова.' };
    }
    
    // Если все проверки пройдены, возвращаем успех
    return { success: true, user };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // Basic validation
    if (!email || !password) {
      setError('Пожалуйста, введите email и пароль.');
      return;
    }

    // Проверяем учетные данные
    const result = checkCredentials(email, password);
    
    if (!result.success) {
      setError(result.message);
      return;
    }

    try {
      // Авторизуем пользователя, сохраняя информацию в localStorage
      localStorage.setItem('user', JSON.stringify({ 
        email: result.user.email
      }));
      
      // Перенаправляем на главную страницу
      navigate('/');
    } catch (err) {
      // Обработка ошибок входа
      setError('Не удалось войти. Пожалуйста, попробуйте позже.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Вход</h2>
        {error && <p className="text-sm text-center text-red-600">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Войти
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-600">
          Нет аккаунта?{' '}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage; 