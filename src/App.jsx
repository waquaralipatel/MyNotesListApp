import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { v4 as uuidv4 } from 'uuid';

import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";




function App() {
  const [Note, setNote] = useState("")
  const [Notes, setNotes] = useState([])
  const [showFinished, setshowFinished] = useState(false)

  const handleShowFinished = (e) => {
    setshowFinished(!showFinished);
  }
  const saveNotes = () => {
    localStorage.setItem("Notes", JSON.stringify(Notes));
  }
  const getNotes = () => {
    let data = localStorage.getItem("Notes");
    if (data) {
      setNotes(JSON.parse(data));
    }
  }
  useState(() => {
    getNotes();
  }, [])
  const handleDel = (e, id) => {
    alert("Ensure to delete the note")
    let newArr = Notes.filter(item => { return item.id !== id });
    setNotes(newArr);
    saveNotes();
  }
  const handleEdit = (e, id) => {
    setNote(Notes.find(item => { return item.id === id }).Note)
    let newArr = Notes.filter(item => { return item.id !== id });
    setNotes(newArr);
    saveNotes();
  }
  const AddNote = () => {
    setNotes([...Notes, { id: uuidv4(), Note, isCompleted: false }])
    console.log(Notes);
    setNote("")
    saveNotes();
  }
  const handleChange = (e) => {
    setNote(e.target.value)
  }
  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = Notes.findIndex(item => { return item.id === id });
    let newArr = [...Notes];
    newArr[index].isCompleted = !newArr[index].isCompleted;
    console.log(newArr[index]);
    setNotes(newArr);
    saveNotes();
  }

  return (
    <>
      <Navbar />
      <div className="NoteContainer flex flex-col bg-[#534e6d] w-full h-200 md:w-[70vw] md:h-[75vh] md:m-auto md:my-5 md:border-2 md:border-[#251f46] md:rounded-lg text-white overflow-y-auto">
        <div className="Notes-manage-div w-full mb-2">
          <h1 className='text-2xl font-bold text-center p-2 text-white'>NoteBook-Manage Your Notes</h1>
        </div>
        <div className="input flex justify-between p-1">
          <input onChange={handleChange} value={Note} type="text" placeholder='Enter Your Note' className='w-full h-8' />
          <button disabled={Note.length <= 0} onClick={AddNote} className='hover:bg-[#3e3861] bg-[#251f46]  cursor-pointer disabled:bg-[#433c6b]  px-1 py-0 mx-3 font-bold rounded-sm text-gray-300 border border-white'>Save</button>
        </div>
        <div className="w-full flex gap-4 p-2">
          <input type="checkbox" onChange={handleShowFinished} checked={showFinished} className='' name="" id="show" />
          <label htmlFor="show" className='cursor-pointer select-none opacity-65'>
            Finished Tasks
          </label>
        </div> 
        <div className="hr w-full bg-gray-800 h-1 my-2"></div>
        <div className="your-notes flex flex-col gap-3  px-2 py-1 overflow-y-scroll h-full w-full ">
          {Notes.length === 0 && <div className='m-2'>No Notes Saved</div>}
          {Notes.map(ele => {
            return ((showFinished || !ele.isCompleted) &&
              <div key={ele.id} className="note rounded-md p-1 flex justify-between gap-2 text-lg">
                <div className="input-chkbox w-full flex gap-4">

                  <input onChange={handleCheckBox} type="checkbox" checked={ele.isCompleted} className='cursor-pointer' name={ele.id} id="" />
                  <div className="note  p-1 rounded-sm ">
                    <div className={(ele.isCompleted) ? "line-through" : ""}>{ele.Note}</div>
                  </div>
                </div>
                <div className="btns flex gap-2 w-10 h-10 mr-15">
                  <button onClick={(e) => { handleEdit(e, ele.id) }} className='hover:bg-[#3e3861] cursor-pointer bg-[#251f46] my-2  font-bold rounded-sm text-gray-300 border border-white '><FaEdit /></button>
                  <button onClick={(e) => { handleDel(e, ele.id) }} className='hover:bg-[#3e3861] cursor-pointer bg-[#251f46] my-2 font-bold rounded-sm text-gray-300 border border-white'><MdDeleteForever /></button>
                </div>
              </div>)
          })}
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default App
