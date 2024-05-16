import { useState } from 'react';
import Router from 'next/router';

export default function Login() {
  const [credentials, setCredentials] = useState({
    identifier: '',
    password: ''
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setCredentials(prevCre => ({
      ...prevCre,
      [name]: value
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      if (!process.env.NEXT_PUBLIC_LOGIN_URL) {
        console.log(process.env.NEXT_PUBLIC_LOGIN_URL);
        console.error('LOGIN_URL environment variable is not defined');
        return;
      }
      
      const response = await fetch(process.env.NEXT_PUBLIC_LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      if (response.ok) {
        console.log('Login successfully!');
      } else {
        console.error('Failed to Login.');
      }
    } catch (error) {
      console.error('Error login:', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
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
    </div>
  );
}