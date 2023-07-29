import React from 'react'
import { useState } from 'react';
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const Anylasis = () => {


  let marksData =  JSON.parse(localStorage.getItem("marks"))

  console.log(marksData)

  let marksObtained = []
  let naming = []
  marksData.forEach((ele,ind)=>{
    for(let key in ele){
      naming.push(`question ${Number(ind+1)}`)
      marksObtained.push((Number(ele[key].split('')[0])))
    }
  })

  let res = marksObtained.map((ele)=>ele/marksObtained.length)

  function generateRandomRGBColors(n) {
    const colors = [];
    const getRandomNumber = () => Math.floor(Math.random() * 256);
  
    for (let i = 0; i < n; i++) {
      const red = getRandomNumber();
      const green = getRandomNumber();
      const blue = getRandomNumber();
      const rgbColor = `rgb(${red}, ${green}, ${blue})`;
      colors.push(rgbColor);
    }
  
    return colors;
  }

  let color = generateRandomRGBColors(marksObtained.length)
  console.log(color)

  const data = {
    labels:naming,
    datasets: [{
      label: 'Average of marks',
      data: res,
      backgroundColor: color,
      hoverOffset: 2
    }]
  };
 



  return (
    <div className='bg-slate-200'>
      <div className="w-full h-14 flex justify-between items-center bg-emerald-600">
        <img src="./logo.svg" className="w-20" />
        <div>
          {/* <button className="bg-sky-950 w-24 h-7 rounded-sm text-white rounded-2 m-4 hover:bg-white hover:text-black font-mono font-bold ">
            btn1
          </button>
          <button className="bg-sky-950 w-24 h-7 rounded-sm text-white rounded-2 m-4 hover:bg-white hover:text-black font-mono font-bold">
            btn2
          </button> */}
        </div>
      </div>
      <h2 style={{textAlign:"center", paddingBottom:"20px", paddingTop:"25px"}} >AVERAGE MARKS SCORED BY YOU</h2>
      <div style={{ height:"600px", display:"grid", placeItems:"center", marginTop:"50px", padding:"20px"}}>
      <Doughnut data={data} />;
      </div>
    </div>
  )
}
