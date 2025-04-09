import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'; // Placeholder for AuthContext

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  // const { register } = useAuth(); // Placeholder for register function

  // Проверка, не зарегистрирован ли уже этот email
  const checkIfEmailExists = (email) => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    return registeredUsers.some(user => user.email === email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    if (password !== confirmPassword) {
      setError('Пароли не совпадают.');
      return;
    }

    // Basic validation
    if (!email || !password) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }

    // Проверка, не зарегистрирован ли уже этот email
    if (checkIfEmailExists(email)) {
      setError('Этот email уже зарегистрирован. Пожалуйста, используйте другой email или войдите в систему.');
      return;
    }

    try {
      // Получаем текущий список зарегистрированных пользователей
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      
      // Добавляем нового пользователя
      registeredUsers.push({ 
        email, 
        password, // Обратите внимание: в реальном приложении пароли никогда не должны храниться в открытом виде
        registeredAt: new Date().toISOString() 
      });
      
      // Сохраняем обновленный список
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      
      // Авторизуем пользователя
      localStorage.setItem('user', JSON.stringify({ email }));
      
      // Перенаправляем на главную страницу
      navigate('/');
    } catch (err) {
      // Handle registration errors
      setError('Не удалось зарегистрироваться. Пожалуйста, попробуйте еще раз.');
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Регистрация</h2>
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
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
           <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage; 