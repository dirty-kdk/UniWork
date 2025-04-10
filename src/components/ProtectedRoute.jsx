import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const ProtectedRoute = () => {
  const { user } = useApp();

  // Если пользователя нет, перенаправляем на страницу входа
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Если пользователь есть, отображаем дочерний компонент (Outlet для вложенных маршрутов)
  return <Outlet />;
};

export default ProtectedRoute; 