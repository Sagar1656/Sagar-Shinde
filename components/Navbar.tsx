import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from '../types';
import { BookOpen, LogOut, Menu, X, Upload, BrainCircuit, ShieldCheck, User as UserIcon } from 'lucide-react';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? 'text-indigo-600 bg-indigo-50 font-semibold' : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50';

  const NavLink = ({ to, label, icon: Icon }: { to: string; label: string; icon?: React.ElementType }) => (
    <Link
      to={to}
      onClick={() => setIsOpen(false)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${isActive(to)}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span>{label}</span>
    </Link>
  );

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl text-slate-800 tracking-tight">BSc Study Hub</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            <NavLink to="/" label="Home" />
            <NavLink to="/browse" label="Browse Content" />
            <NavLink to="/ai-assistant" label="AI Assistant" icon={BrainCircuit} />
            <NavLink to="/contact" label="Contact" />
            
            <div className="h-6 w-px bg-slate-200 mx-2"></div>

            {user ? (
              <div className="flex items-center space-x-4">
                <NavLink to="/upload" label="Upload" icon={Upload} />
                {user.role === 'admin' && (
                  <NavLink to="/admin" label="Admin" icon={ShieldCheck} />
                )}
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full">
                  <UserIcon className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">{user.name}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 px-3 py-2">
                  Log in
                </Link>
                <Link to="/login" className="text-sm font-medium bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <NavLink to="/" label="Home" />
            <NavLink to="/browse" label="Browse Content" />
            <NavLink to="/ai-assistant" label="AI Assistant" icon={BrainCircuit} />
            <NavLink to="/contact" label="Contact" />
            {user && (
              <>
                <NavLink to="/upload" label="Upload Content" icon={Upload} />
                {user.role === 'admin' && <NavLink to="/admin" label="Admin Dashboard" icon={ShieldCheck} />}
              </>
            )}
          </div>
          <div className="pt-4 pb-4 border-t border-slate-100 px-4">
            {user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                      {user.name.charAt(0)}
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-slate-800">{user.name}</div>
                    <div className="text-sm font-medium text-slate-500">{user.email}</div>
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  className="ml-auto flex-shrink-0 p-1 text-slate-400 hover:text-red-500"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link to="/login" onClick={() => setIsOpen(false)} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                  Log in / Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
