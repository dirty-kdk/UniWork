import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useApp();
  
  // Проверяем, находимся ли на странице входа или регистрации
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-800">
            УниРабота
          </Link>
          
          {/* Отображаем навигационные ссылки только если это не страница аутентификации */}
          {!isAuthPage && (
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-600 hover:text-gray-900">Вакансии</Link>
              {user ? (
                <>
                  <Link to="/applications" className="text-gray-600 hover:text-gray-900">Мои заявки</Link>
                  <Link to="/profile" className="text-gray-600 hover:text-gray-900">Профиль</Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-600 hover:text-gray-900">Войти</Link>
                  <Link to="/register" className="px-3 py-1 text-sm text-white bg-indigo-600 rounded hover:bg-indigo-700">
                    Регистрация
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;