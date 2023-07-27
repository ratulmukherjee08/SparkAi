import React, { useState } from 'react';
import Slide from 'react-reveal/Slide';
import { BiChevronDown } from "react-icons/bi"

const SlideExample = () => {

    const Subjects = ["Mern", "Java", "Node"]



    const [selected, setSelected] = useState("");
    const [open, setOpen] = useState(false);
  
    return (
      <div>
        <Slide top>
          <div className='flex justify-center'>
            <div className='w-72 font-medium'>
              <div className={`bg-white w-full p-2 flex items-center justify-between rounded ${!selected && "text-gray-700"}`}  
              onClick={()=>setOpen(!open)}
              >
                {selected ? selected : "Select Course"}
                <BiChevronDown size={20} className={`${open && "rotate-180"}`}/>
              </div>
              <ul className={`bg-white mt-2 ${open ? "block" : "hidden"}`}>
                {Subjects.map((ele)=>(
                    <li className={`text-left p-2 text-sm hover:bg-blue-300 hover:text-white ${ele==selected && "bg-sky-600 text-white"}`}
                    onClick={()=>{
                        if(ele!==selected){
                            setSelected(ele)
                            setOpen(false)
                        }
                    }}
                    >
                        {ele}
                    </li>
                ))}
              </ul>
            {selected && <button  className="px-4 py-2 mt-3 bg-red-500 text-black rounded-xl font-bold hover:bg-red-800">Let's Start</button> }
            </div>
          </div>
        </Slide>
      </div>
    );
  }
  
    
    export default SlideExample;



export const Homepage = () => {

    const [start, setStart] = useState(false)


    let clicked = ()=>{
        setStart(true)
    }


  return (
    <div className="w-screen h-screen">
    <img src="./homepage.jpg" alt="" className="object-cover w-full h-full " />
    <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
    <img src="./logo.svg" className="w-52 m-auto" />

      {
        start ? (
            <div>
            <SlideExample/>
            </div>
        ) : (
            <div>
            <h1 className="text-white text-4xl font-bold mb-2">
        Welcome to Ai powered chatbot
      </h1>
      <h1 className="text-white text-4xl font-bold mb-2">Start your journey</h1>
      <button className="px-4 py-2 mt-3 bg-red-500 text-black rounded-xl font-bold hover:bg-red-800" onClick={clicked}>
        Start
      </button>
            </div>
        )
      }
    </div>
  </div>
  );
};
