'use client';

import { useState } from "react";
import axios from '../../utils/axios'

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    first_name:'',
    middle_name:'',
    last_name:'',
    password:'',
    mobile_number:''
  });

  const handleSubmit = async (e:any) => {
    e.preventDefault(); 
    const signUpUrl = process.env.NEXT_PUBLIC_SIGNUP_URL;
    if (!signUpUrl) {
      console.error('SIGN_UP_URL environment variable is not defined');
      return;
    }
    try {
      const response = await axios.post(signUpUrl, formData);
      if (response.status === 200) {
        console.log('Form data submitted successfully!', response.data);
      } else {
        console.error('Failed to submit form data.');
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
    console.log("Submit Value:", formData);
  }

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br/>
        <label>
          First Name:
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
        </label>
        <br/>
        <label>
          Middle Name:
          <input
            type="text"
            name="middle_name"
            value={formData.middle_name}
            onChange={handleChange}
          />
        </label>
        <br/>
        <label>
          Last Name:
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </label>
        <br/>
        <label>
          User Name:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <br/>
        <label>
          Mobile Number:
          <input
            type="text"
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleChange}
          />
        </label>
        <br/>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default SignUpPage;