import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import bgImage from '../../assets/images/bg-login-image1.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setError('Please enter the password.');
      return;
    }

    setError(null); // Clear previous errors

    try {
      const response = await axiosInstance.post('/login', { email, password });

      if (response.data?.accessToken) {
        // Store token and navigate to home
        localStorage.setItem('token', response.data.accessToken);
        navigate('/home');
      }
    } catch (error) {
      // Display backend error message or fallback message
      const errorMessage =
        error.response?.data?.message || 'An unexpected error occurred. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <div className="h-screen bg-indigo-700 overflow-hidden relative">
      <div className="container h-screen flex items-center justify-center px-4 sm:px-20 mx-auto">
        {/* Left Panel */}
        <div
          className="w-full sm:w-2/4 h-[90vh] flex items-end bg-cover bg-center rounded-lg p-10 z-50"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div>
            <h4 className="text-4xl text-white font-bold leading-[58px]">
              Capture Your Journeys
            </h4>
            <p className="text-[15px] text-white leading-6 pr-7 mt-4">
              Capture and preserve your memories in your very own personal journey log.
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full sm:w-2/4 h-[75vh] bg-white rounded-r-lg relative p-8 sm:p-16 shadow-indigo-200/20">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl font-semibold mb-7 text-center">LOGIN</h4>

            {/* Email Input */}
            <input
              type="email"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />

            {/* Password Input */}
            <PasswordInput
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            {/* Submit Button */}
            <button type="submit" className="btn-primary">
              LOGIN
            </button>

            <p className="text-xs text-slate-500 text-center my-4">Or</p>

            {/* Create Account Button */}
            <button
              type="button"
              className="btn-primary btn-light"
              onClick={() => navigate('/signUp')}
            >
              CREATE ACCOUNT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;












