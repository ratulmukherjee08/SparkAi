import React from 'react'


const InterviewPage = () => {
  return (
    <>
   <div className="w-full h-16 flex justify-between items-center bg-teal-600">
   <img src="./logo.svg" className="w-20" />
      <div>
        <button className="bg-black w-24 text-white rounded-2 m-4 p-1">btn1</button>
        <button className="bg-black w-24 text-white rounded-2 m-4 p-1">btn2</button>
        </div>
      </div>

      <div className="w-full h-520 ">
        <textarea className="w-7/12 border-solid border-black m-8" rows="15"></textarea>
      </div>

      <div className="w-full h-140 flex justify-center items-center bg-teal-500 mt-14">
        <input className="border-black border-1 w-2/5 p-2 m-10 rounded-5px" type="text" />
        <button className="bg-black w-24 text-white rounded-5px border-red-600 border-1px  p-2">submit</button>
      </div>


    </>
  )
}

export default InterviewPage
