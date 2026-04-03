import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const [, navigate] = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (login(username, password)) {
      navigate('/');
    } else {
      setError('Please enter a username.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-xl p-6 sm:p-8">
        <div className="text-center mb-6">
          <h1 className="font-bold text-gray-900 text-xl" style={{ fontFamily: 'Pacifico, cursive', color: '#e8342e' }}>
            Pizzon Admin
          </h1>
          <p className="text-gray-500 text-sm mt-2">Staff & dispatch access only</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              placeholder="Enter username"
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Enter password"
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Sign in
          </button>
        </form>
        <p className="text-gray-400 text-xs text-center mt-4">
          Authorized staff only. No public link to this panel.
        </p>
      </div>
    </div>
  );
}
