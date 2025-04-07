import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-800">
            УниРабота
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-600 hover:text-gray-900">Вакансии</Link>
            <Link to="/applications" className="text-gray-600 hover:text-gray-900">Мои заявки</Link>
            <Link to="/profile" className="text-gray-600 hover:text-gray-900">Профиль</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;