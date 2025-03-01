import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const Login = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Validate inputs
    if (!emailOrPhone || !password) {
      setError('Email/Phone and password are required.');
      return;
    }

    // Check if the user exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (user) =>
        (user.email === emailOrPhone || user.phone === emailOrPhone) &&
        user.password === password
    );

    if (!user) {
      setError('Invalid email/phone or password.');
      alert('You need to register first!');
      navigate('/register'); // Redirect to the Register page
      return;
    }

    // Save the logged-in user in localStorage
    localStorage.setItem('loggedInUser', JSON.stringify(user));

    // Redirect to the Expense Tracker page
    navigate('/expense-tracker');
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className={`p-6 rounded-lg shadow-md w-full max-w-md ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`}>
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700"
        >
          {isDarkTheme ? '🌞' : '🌙'}
        </button>

        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="emailOrPhone" className={`block font-medium ${isDarkTheme ? 'text-white' : 'text-black'}`}>Email or Phone</label>
            <input
              type="text"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              placeholder="Enter email or phone..."
              className={`w-full p-2 border rounded-lg ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className={`block font-medium ${isDarkTheme ? 'text-white' : 'text-black'}`}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              className={`w-full p-2 border rounded-lg ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p className={`mt-4 text-center ${isDarkTheme ? 'text-white' : 'text-black'}`}>
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-blue-500 hover:text-blue-700"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;