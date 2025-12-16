import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockBackend } from '../services/mockBackend';
import { User } from '../types';
import Button from '../components/Button';
import { Lock, Phone, Mail } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [method, setMethod] = useState<'mobile' | 'email'>('mobile');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form States
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const role = isAdmin ? 'admin' : 'student';
      const user = await mockBackend.login(role, {});
      onLogin(user);
      navigate(isAdmin ? '/admin' : '/');
    } catch (error) {
      alert("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
            {isAdmin ? 'Admin Login' : 'Student Login'}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Welcome back to BSc Study Hub
          </p>
        </div>

        {/* Toggle Login Type */}
        <div className="flex bg-slate-100 p-1 rounded-lg mb-6">
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${!isAdmin ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
            onClick={() => setIsAdmin(false)}
          >
            Student
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${isAdmin ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
            onClick={() => setIsAdmin(true)}
          >
            Admin
          </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {!isAdmin && (
            <div className="flex justify-center gap-4 mb-4">
               <button type="button" onClick={() => setMethod('mobile')} className={`text-sm pb-1 border-b-2 ${method === 'mobile' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500'}`}>Mobile + OTP</button>
               <button type="button" onClick={() => setMethod('email')} className={`text-sm pb-1 border-b-2 ${method === 'email' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500'}`}>Email + Pass</button>
            </div>
          )}

          <div className="rounded-md shadow-sm -space-y-px">
            {isAdmin || method === 'email' ? (
              <>
                <div className="relative mb-4">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <input
                    type="email"
                    required
                    className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <input
                    type="password"
                    required
                    className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="relative mb-4">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <input
                    type="tel"
                    required
                    className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Mobile Number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    required
                    className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter OTP (Any 4 digits)"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>

          <div>
            <Button type="submit" className="w-full" loading={loading}>
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
