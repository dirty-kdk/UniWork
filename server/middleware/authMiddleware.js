import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// Middleware для защиты маршрутов
export const protect = async (req, res, next) => {
  let token;

  // Проверяем наличие токена в заголовках
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Получаем токен из заголовка
      token = req.headers.authorization.split(' ')[1];

      // Верифицируем токен
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Получаем пользователя по ID из токена
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Не авторизован, токен не действителен' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Не авторизован, токен отсутствует' });
  }
};

// Генерация JWT токена
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
}; 