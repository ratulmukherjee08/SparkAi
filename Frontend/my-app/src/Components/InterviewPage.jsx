import React from 'react'


const InterviewPage = () => {
  return (
    <>
   <div className="w-full h-14 flex justify-between items-center bg-sky-950">
   <img src="./logo.svg" className="w-20" />
      <div>
        <button className="bg-orange-600 w-24 h-7 text-white rounded-2 m-4 hover:bg-white hover:text-black font-mono font-bold ">btn1</button>
        <button className="bg-orange-600 w-24 h-7 text-white rounded-2 m-4 hover:bg-white hover:text-black font-mono font-bold">btn2</button>
        </div>
      </div>

      <div className="w-full h-520 ">
        <textarea className="w-7/12 border-solid border-black m-8" rows="15"></textarea>
      </div>

      <div className="w-full h-140 flex justify-center items-center bg-sky-950 mt-14">
        <input className="border-black border-1 w-2/5 p-1 m-12 rounded-5px font-bold font-mono text-black px-5" type="text" placeholder='type your answer'  />
        <button className="bg-orange-600 w-24 text-white rounded-5px border-red-600 border-1px  p-1 hover:bg-white hover:text-black font-mono font-bold">submit</button>
      </div>


    </>
  )
}

export default InterviewPage
