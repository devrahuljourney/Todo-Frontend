import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import TodoCard from './TodoCard';
import Modal from 'react-modal';
import { createTodo } from '../services/api';
import { toast } from 'react-toastify';
function Todo(props) {
  const user = props.user;
  const [todo, setTodo] = useState(null);
  axios.defaults.withCredentials = true;
  const fetchTodo = async () => {
    try {
      const url = "http://localhost:4000/api/v1/gettodo";
      console.log("Requesting:", url);
      const response = await axios.get(url);
      setTodo(response.data.data);
      console.log("Todo data", response.data.data);
    } catch (error) {
      // Log the error message
      console.error('Error fetching data:', error.message);
    }
  };
  const [modal,setModal] = useState(false);
const openModal = () => {
  setModal(!modal);
}
  useEffect(() => {
    fetchTodo();
  }, [todo]);


  const [formdata, setFormdata] = useState({
    title: "",
    description: "",
    isCompleted: "false",
  });
  
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({ ...prevData, [name]: value }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    
    console.log("submit data" , formdata);
    await createTodo(formdata);
    toast.success("Todo Added Successfully");
    openModal();
         
    
  }
  // const customStyles = {
  //   content: {
  //     width:"60%",\
  //     displ
      
  //   },
  // };
  return (
    <div className="container mx-auto p-4">
      {!user ? (
        <div className="text-center">
          <p className="text-red-500">
            You are not logged in, please login to see, create, and delete Todo...{' '}
            <NavLink to='/login' className="text-blue-500">Login</NavLink>
          </p>
        </div>
      ) : (
        <div className="text-center">
          <div className="mb-4">
            <h1 className="text-3xl font-bold">Todo App</h1>
            <p className="text-gray-600">Your Todo, Your Reminder</p>
          </div>
          <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Todo
          </button>
          <Modal className = 'w-[50%] ' isOpen={modal} className="modal">
            <button onClick={openModal} className="bg-red-700 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
              Close
            </button>
            <form onSubmit={submitHandler} className="mt-4">
              <label className="block mb-2">
                Title
                <input type='text' name='title' onChange={changeHandler} className="form-input mt-1 block w-full" />
              </label>
              <label className="block mb-2">
                Description 
                <textarea type='text' name='description' onChange={changeHandler} className="form-textarea mt-1 block w-full"></textarea>
              </label>
              <button type='submit' className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Add Todo
              </button>
            </form>
          </Modal>
          {todo && todo.length > 0 ? (
            todo.slice().reverse().map((item) => (
              <TodoCard key={item._id} data={item} />
            ))
          ) : (
            <p>No todos found.</p>
          )}
        </div>
      )}
    </div>
  );
}



export default Todo;
