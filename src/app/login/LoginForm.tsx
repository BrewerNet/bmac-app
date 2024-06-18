'use client';

import { useState } from 'react';
import axios from 'axios';

export default function LoginForm() {
  const [credentials, setCredentials] = useState({
    identifier: '',
    password: ''
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGoogleLogin = async (e:any) => {
    e.preventDefault();
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const googleLoginUrl = process.env.NEXT_PUBLIC_GOOGLE_LOGIN_URL;
      if (!googleLoginUrl || !backendUrl) {
        console.error('GOOGLE_LOGIN_URL environment variable is not defined');
        return;
      }
      const fullGoogleLoginUrl = `${backendUrl}${googleLoginUrl}`;
      window.location.href = fullGoogleLoginUrl;
    } catch (error) {
      console.error('Error google login:', error);
    }
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', credentials);
      if (response.status === 200) {
        console.log('Login successfully!', response.data);
      } else {
        console.error('Failed to login.');
      }
    } catch (error) {
      console.error('Error login:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            name="identifier"
            value={credentials.identifier}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleGoogleLogin}>Google Login</button>
    </div>
  );
}
