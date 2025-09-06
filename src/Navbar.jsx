import React from 'react'


const Navbar = () => {
  return (
    <>
      <nav className='flex justify-between align-center bg-[#251f46] text-white w-full sticky top-0'>
        <div className="log font-bold mx-8 text-lg cursor-pointer hover:bg-[#928E9A] px-2 rounded-full flex justify-center items-center border border-white my-3">
          {/* <img src="C:\Users\LENOVO\Downloads\WebDevLearn\reactIntro\TodoListApp\src\assets" alt="" /> */}
          <span>NoteBook</span>
        </div>
        <ul className='flex gap-5 py-3 px-8 font-bold text-md '>
          <li className='list-none cursor-pointer hover:bg-[#928E9A] px-2 py-1 rounded-full  border border-white '>Home</li>
          <li className='list-none cursor-pointer hover:bg-[#928E9A] px-2 py-1 rounded-full  border border-white '>My Notes</li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar
