import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { User } from './types';
import { mockBackend } from './services/mockBackend';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Browse from './pages/Browse';
import Upload from './pages/Upload';
import AiAssistant from './pages/AiAssistant';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Contact from './pages/Contact';

interface ProtectedRouteProps {
  children: React.ReactNode;
  user: User | null;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, user, requireAdmin = false }) => {
  if (!user) return <Navigate to="/login" replace />;
  if (requireAdmin && user.role !== 'admin') return <Navigate to="/" replace />;
  return <>{children}</>;
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = mockBackend.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
  };

  const handleLogout = () => {
    mockBackend.logout();
    setUser(null);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/ai-assistant" element={<AiAssistant />} />
            <Route path="/contact" element={<Contact />} />
            
            <Route 
              path="/upload" 
              element={
                <ProtectedRoute user={user}>
                  <Upload user={user} />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute user={user} requireAdmin={true}>
                  <Admin />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/login" 
              element={
                user ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;