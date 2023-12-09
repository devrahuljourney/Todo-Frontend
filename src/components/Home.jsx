import React from 'react'
import { NavLink } from 'react-router-dom'

function Home() {
  return (
    <div className='flex sm:flex-row flex-col justify-center items-center gap-3 '>
      <div>
        <img   src='https://img.freepik.com/free-vector/hand-drawn-business-planning_52683-76248.jpg?w=740&t=st=1702058024~exp=1702058624~hmac=378c4c2906c27743f4d7a099b01cdf0ae6802ba61923aaba0de658b0b0bf05a2' ></img>
      </div>
      <div  className='flex flex-col justify-center sm:items-start items-center sm:w-[50%] p-4  gap-5'>
        <h2 className='text-center text-[1.8rem] font-bold   '>Welcome to My Todo App!</h2>
        <p className='sm:text-[23px]  text-[20px] '>
          Manage your tasks, stay organized, and boost your productivity with
          our  intuitive Todo App. Whether you're at work, school, or home, our
          app makes it easy to create, edit, and delete todos.
        </p>
        <p className='font-bold '>
          Features:
          <ul className='font-[350] list-disc  '>
            <li>Create new todos with titles and descriptions.</li>
            <li>Mark todos as completed or incomplete.</li>
            <li>Edit existing todos to update information.</li>
            <li>Delete todos you no longer need.</li>
          </ul>
        </p>
        <p>
          <NavLink className='text-blue-500 font-bold text-[21px]' to = '/todo' >Get started</NavLink> now and make your daily life more organized and
          stress-free!
        </p>
      </div>
    </div>
  )
}

export default Home