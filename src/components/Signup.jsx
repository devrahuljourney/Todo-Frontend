// src/components/Signup.js
import React, { useState } from 'react';
import { signup } from '../services/api';
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';
function Signup(props) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Student', 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting data:', formData);
    try {
      const response = await signup(formData);
      if (response.data.success) {
        console.log('SignUp successful:',);
        toast.success( response.data.message)
        props.setUser(false);
        navigate("/login");
      } else {
        console.log('SignUp failed --- :', response.data.message);
        toast.error( response.data.message)
      }
      console.log('Signup Successful', response.data);
    } catch (error) {
      toast.error(error.response.data.message)
      console.error('Signup Failed', error.response.data);
    }
  };

  return (
    <div className='flex sm:justify-center sm:mt-0 mt-[10%] flex-col p-5  gap-4 items-center h-screen bg-blur'>
      <form className='flex flex-col  gap-2 bg-blur-500 shadow-xl w-96 p-6 rounded-lg' onSubmit={handleSubmit}>
      <label className='font-bold p-2'>Name:</label>
      <input className='border-2 border-green-400' placeholder='Full Name' type="text" name="name" onChange={handleChange} />

      <label>Email:</label>
      <input type="email" name="email" placeholder='Email' className='p-2 border-2 border-green-400 rounded-md' onChange={handleChange} />

      <label>Password:</label>
      <input type="password" name="password" placeholder='Password' className='p-2 border-2 border-green-400 rounded-md' onChange={handleChange} />

      <select name='role' value={formData.role} placeholder='Role' className='p-2  border-2 border-green-400 rounded-md' onChange={handleChange}>
  <option value='Student'>Student</option>
  <option value='Admin'>Admin</option>
  <option value='teacher'>Instructor</option>
</select>


      <button className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700' type="submit">Sign Up</button>
    </form>
    <p>  Already have an Account ?? <NavLink className='text-blue-500 font-bold  text-[19px]'  to= '/login'>Login</NavLink> </p>
    </div>
  );
}

export default Signup;
