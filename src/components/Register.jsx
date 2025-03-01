import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Validate inputs
    if (!name || !email || !phone || !password) {
      setError('All fields are required.');
      return;
    }

    // Check if the user already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.find((user) => user.email === email || user.phone === phone);
    if (userExists) {
      setError('User already exists.');
      return;
    }

    // Add the new user
    const newUser = { name, email, phone, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Redirect to the Login page
    navigate('/login');
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

        <h1 className="text-2xl font-bold text-center mb-4">Register</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="name" className={`block font-medium ${isDarkTheme ? 'text-white' : 'text-black'}`}>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              className={`w-full p-2 border rounded-lg ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className={`block font-medium ${isDarkTheme ? 'text-white' : 'text-black'}`}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              className={`w-full p-2 border rounded-lg ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className={`block font-medium ${isDarkTheme ? 'text-white' : 'text-black'}`}>Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number..."
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
            Register
          </button>
        </form>
        <p className={`mt-4 text-center ${isDarkTheme ? 'text-white' : 'text-black'}`}>
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-blue-500 hover:text-blue-700"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;