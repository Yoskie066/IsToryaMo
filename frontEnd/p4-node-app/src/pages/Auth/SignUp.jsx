import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import bgImage2 from '../../assets/images/bg-register-image2.jpg';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!name) {
      setError('Please enter your name.');
      return;
    }

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
      const response = await axiosInstance.post('/create-account', {
        fullName: name,
        email,
        password,
      });

      if (response.data?.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        navigate('/login');
      }
    } catch (error) {
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
          style={{ backgroundImage: `url(${bgImage2})` }}
        >
          <div>
            <h4 className="text-4xl text-white font-bold leading-[58px]">Capture Your Journeys</h4>
            <p className="text-[15px] text-white leading-6 pr-7 mt-4">
              Capture and preserve your memories in your very own personal journey log.
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full sm:w-2/4 h-[75vh] bg-white rounded-r-lg relative p-8 sm:p-16 shadow-indigo-200/20">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl font-semibold mb-7 text-center">SIGN-UP</h4>

            {/* Full Name Input */}
            <input
              type="text"
              placeholder="Full Name"
              className="input-box"
              value={name}
              onChange={({ target }) => setName(target.value)}
            />

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
              CREATE ACCOUNT
            </button>

            <p className="text-xs text-slate-500 text-center my-4">Already have an account?</p>

            {/* Login Button */}
            <button
              type="button"
              className="btn-primary btn-light"
              onClick={() => navigate('/login')}
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;








