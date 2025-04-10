import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AlertProvider } from './context/AlertContext';
import Navbar from './components/Navbar';
import JobList from './components/JobList';
import Profile from './components/Profile';
import Applications from './components/Applications';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';

// Wrapper component to handle main layout with conditional styling
function AppLayout() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  
  // If we're on an auth page, render it without the usual layout
  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    );
  }
  
  // Otherwise render with normal layout
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<JobList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/applications" element={<Applications />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AlertProvider>
        <Router>
          <AppLayout />
        </Router>
      </AlertProvider>
    </AppProvider>
  );
}

export default App;