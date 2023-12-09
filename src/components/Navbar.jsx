import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar(props) {
  const user = props.user;
  const link = !user ? "login" : 'logout';

  return (
    <div className='flex justify-evenly  w-full p-5 text-white text-[22px] font-bold bg-blue-700'>
      <NavLink to='/'>Home</NavLink>
      
      <NavLink to='/todo'>Todo</NavLink>
      <NavLink to={`/${link}`}>{link}</NavLink>
      <NavLink to='/signup'>Sign up</NavLink>
      
    </div>
  );
}

export default Navbar;
