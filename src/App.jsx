import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import JobList from './components/JobList';
import Profile from './components/Profile';
import Applications from './components/Applications';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<JobList />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/applications" element={<Applications />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;