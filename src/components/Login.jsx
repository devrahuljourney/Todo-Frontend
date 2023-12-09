import React, { useState } from 'react';
import { login } from '../services/api';
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';

function Login(props) {
  const navigate = useNavigate();
  const setUser = props.setUser;
  const [formdata, setFormdata] = useState({
    email: '',
    password: ''
  });

  const changeHandler = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formdata);
      if (response.data.success) {
        setUser(true);
        console.log('Login successful:', response.data);
        toast.success(response.data.message);
        navigate('/todo');
      } else {
        console.log('Login failed:', response.data.message);
        toast.error(response.data.message);
        navigate('/signup');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message);
    }
  };

  return (
    <div className='flex sm:justify-center sm:mt-0 mt-[10%] flex-col p-5  gap-4 items-center h-screen bg-blur'>
      <form className='flex flex-col  gap-2 bg-blur-500 shadow-xl w-96 p-6 rounded-lg' onSubmit={submitHandler}>
        <label>Email:</label>
        <input type='email' placeholder='email' name='email' onChange={changeHandler} className='p-2 rounded-md'></input>

        <label>Password:</label>
        <input type='password' placeholder='password' name='password' onChange={changeHandler} className='p-2 rounded-md'></input>

        <button type='submit' className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700'>
          Login
        </button>
      </form>
      <p>  Create a new Account <NavLink className='text-blue-500 font-bold  text-[19px]'  to= '/signup'>Sign Up now</NavLink> </p>
    </div>
  );
}

export default Login;
