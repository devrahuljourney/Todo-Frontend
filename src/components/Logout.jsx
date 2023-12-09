import React from 'react';
import Cookies from 'js-cookie';
import { logout } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Logout = (props) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      Cookies.remove('token');
      props.setUser(false);
      toast.success("Logged Out Successfully");
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <p className="text-gray-700 mb-4">Are you sure you want to log out?</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
