import React, { useState } from 'react';
import { deleteTodo, updateTodo } from '../services/api';
import { toast } from 'react-toastify';

function TodoCard(props) {
  
  const [isEdit, setEdit] = useState(false);
  const [formdata, setFormdata] = useState({
    title: props.data.title,
    isCompleted: props.data.isCompleted,
    description: props.data.description,
  });

  const deleteHandle = async () => {
    await deleteTodo(props.data._id);
    toast.success("Todo deleted Successfully");
    // Add any additional logic after deletion if needed
  };

  const changeHandler = (e) => {
    const { name, type, value, checked } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formdata);
    // Reset edit mode after submission
    const response = await updateTodo(props.data._id, formdata);
    toast.success("Updated successfully");
    console.log("Updated todo", response.message);
    setEdit(false);
  };
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const description = props.data.description;
  const words = description.split(' ');
  return (
    <div className="border w-[80%] mx-auto mt-[5%] p-4 mb-4 rounded-md shadow-md bg-white">
      {!isEdit ? (
        <div>
          <div>
            <h1 className="text-2xl font-bold mb-2">{props.data.title}</h1>
            <p className="text-gray-600 mb-2">
        {words.length > 10 ? (
          showMore ? description : `${words.slice(0, 20).join(' ')}...`
        ) : (
          description
        )}{' '}
        {words.length > 20 && (
          <button
            onClick={toggleShowMore}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            {showMore ? 'See Less' : 'See More'}
          </button>
        )}
      </p>
            <label className="flex items-center">
              Completed:
              <input type='checkbox' defaultChecked={props.data.isCompleted} disabled className="ml-2" />
            </label>
          </div>
          <div className='flex gap-3 mt-4'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-xl text-sm'
              onClick={() => setEdit(true)}
            >
              Edit
            </button>
            <button
              onClick={deleteHandle}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-xl text-sm'
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div>
          <form onSubmit={submitHandler} className="space-y-2">
            <label className="block">
              Title:
              <input
                type="text"
                name='title'
                value={formdata.title}
                onChange={changeHandler}
                className="form-input mt-1 block w-full"
              />
            </label>

            <label className="block">
  Description:
  <textarea
    type='text'
    name='description'
    value={formdata.description}
    onChange={changeHandler}
    className="form-textarea mt-1 block w-full  overflow-x-hidden"
  />
</label>


            <label className="flex items-center">
              Completed:
              <input
                type='checkbox'
                name='isCompleted'
                defaultChecked={formdata.isCompleted}
                onChange={changeHandler}
                className="ml-2"
              />
            </label>

            <div className='flex gap-3 mt-4'>
              <button
                className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-xl text-sm'
                type='submit'
              >
                Save
              </button>
              <button
                onClick={() => setEdit(false)}
                className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-xl text-sm'
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default TodoCard;
