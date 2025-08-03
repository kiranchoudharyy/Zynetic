import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const RegisterPage = () => {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password strength
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...registerData } = formData;
      
      // Log the registration data (without password for security)
      console.log('Attempting registration with:', { 
        email: registerData.email,
        name: registerData.name
      });
      
      const response = await register(registerData);
      console.log('Registration successful:', response);
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Registration failed';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className={`max-w-md mx-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-8 transition-colors duration-200`}>
        <h1 className={`text-2xl font-bold text-center ${darkMode ? 'text-white' : 'text-gray-800'} mb-6 transition-colors duration-200`}>Create Account</h1>
        
        {error && (
          <div className={`${darkMode ? 'bg-red-900 text-red-200' : 'bg-red-50 text-red-500'} p-3 rounded-md mb-4 transition-colors duration-200`}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 transition-colors duration-200`}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 border ${
                darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'
              } rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200`}
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 transition-colors duration-200`}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 border ${
                darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'
              } rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200`}
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 transition-colors duration-200`}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-2 border ${
                darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'
              } rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200`}
              required
            />
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 transition-colors duration-200`}>
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full p-2 border ${
                darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'
              } rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200`}
              required
            />
          </div>
          
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50 transition-colors duration-200"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-200`}>
            Already have an account?{' '}
            <Link to="/login" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-600'} transition-colors duration-200`}>
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 