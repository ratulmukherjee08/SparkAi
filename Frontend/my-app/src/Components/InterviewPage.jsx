
// import React, { useEffect, useState } from 'react'



// const InterviewPage = () => {
//   const [questions , setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

//   // Function to move to the next question
//   const moveToNextQuestion = () => {
//     setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//   };

  


//   const getQuestions = async ()=>{
//     try {
//       let res = await fetch(`https://sparai-backend-app.onrender.com/questions`)
//       let data = await res.json();
//       console.log(data.msg)
//       setQuestions(data.msg)
      
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   useEffect(() => {
//     getQuestions();
//     // Check if we have reached the end of the questions array
//     if (currentQuestionIndex < questions.length) {
//       // Set a timeout for 4 minutes before moving to the next question
//       const timeoutId = setTimeout(moveToNextQuestion, 60000);

//       // Cleanup the timeout when the component unmounts or the question changes
//       return () => clearTimeout(timeoutId);
//     }
//   }, [currentQuestionIndex]);
//   // useEffect(()=>{
//   //   getQuestions();

//   // },[])

//   console.log(questions)

//   return (
//     <>
//    <div className="w-full h-14 flex justify-between items-center bg-sky-950">
//    <img src="./logo.svg" className="w-20" />
//       <div>
//         <button className="bg-orange-600 w-24 h-7 rounded-md text-white rounded-2 m-4 hover:bg-white hover:text-black font-mono font-bold ">btn1</button>
//         <button className="bg-orange-600 w-24 h-7 rounded-md text-white rounded-2 m-4 hover:bg-white hover:text-black font-mono font-bold">btn2</button>
//         </div>
//       </div>

//       <div className="w-full h-520">
//         <textarea className="w-7/12 border-solid border-black m-8" readOnly={true} rows="15">
//         {questions.length > 0 && currentQuestionIndex < questions.length
//             ? questions[currentQuestionIndex]
//             : 'No more questions available.'}
//         </textarea>
//       </div>

//       <div className="w-full h-200 flex justify-center items-center bg-sky-950 mt-28">
//         <input className="border-black border-1 w-2/5 p-1 m-12 rounded-5px font-bold font-mono text-black px-5" type="text" placeholder='type your answer'  />
//         <button  className="bg-orange-600 w-24 text-white rounded-5px border-red-600 border-1px rounded-md  p-1 hover:bg-white hover:text-black font-mono font-bold">submit</button>
//       </div>


//     </>
//   )
// }

// export default InterviewPage

// ----------------------------------------------------------------------------------------------------------

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const InterviewPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [submittedValue, setSubmittedValue] = useState('');
  const [feedback, setFeedback] = useState({});
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  let marks = []
  const handleSubmit = () => {
    setSubmittedValue(inputValue);
    let obj={
      "question":questions[currentQuestionIndex].question,
      "answer":inputValue
    }
    // console.log(obj)
    fetch (`https://sparai-backend-app.onrender.com/interview/post`,{
      method: `POST`,
      headers:{
        "Content-Type":"application/json",  
      },
      body:JSON.stringify(obj)
    })
    .then ((res)=>res.json()).then ((data)=>setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [currentQuestionIndex]: data.res,
    }),
    
    ))
    .catch((e)=>console.log(e))
    setInputValue("");

  

  
};
  // Function to move to the next question
  const moveToNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSubmittedValue("")
  };
  const getQuestions = async () => {
    const topic=JSON.parse(localStorage.getItem("topic"))
    let obj={
      topic
    }
     await fetch (`https://sparai-backend-app.onrender.com/questions?topic=${topic}`)
    .then ((res)=>res.json()).then ((data)=>setQuestions(data.msg)).catch((e)=>console.log(e))
    
  };

  useEffect(() => {
    getQuestions();
  }, []);

  

  let handleClick=()=>{
    for(let key in feedback){
      // console.log(feedback[key].split(' ')[1]).
      marks.push({[key]:feedback[key].split(' ')[1]})
    }
    console.log(marks)
    localStorage.setItem("marks", JSON.stringify(marks))
  }

  


  return (
    <div className='bg-slate-200'>
      <div className="w-full h-14 flex justify-between items-center bg-emerald-600">
        <img src="./logo.svg" className="w-20" />
        <div>
          <Link to="/anylasis">
          <button onClick={handleClick} className="bg-sky-950 w-24 h-7 rounded-sm text-white rounded-2 m-4 hover:bg-white hover:text-black font-mono font-bold ">
            btn1
          </button>
          </Link>
          <button className="bg-sky-950 w-24 h-7 rounded-sm text-white rounded-2 m-4 hover:bg-white hover:text-black font-mono font-bold">
            btn2
          </button>
        </div>

      </div>
      <div className='flex-col'>
      <div className="w-full h-auto flex-col mb-56">
      <div className="w-3/4 h-520 border-solid border-2 border-black my-8 ml-48 p-8 font-mono text-xl font-bold " rows="15">
        {currentQuestionIndex < questions.length ? (
        <p className='border-0 text-red-600 mt-4 p-4 shadow-md '>{"Q."+[currentQuestionIndex+1]+"."+questions[currentQuestionIndex].question +"?"}</p>
      ) : (
        <p>No more questions.</p>
      )}
        {submittedValue && <p className='border-0 text-green-600 mt-4 p-4 shadow-sm'>Ans: {submittedValue}</p>}
        <div> {feedback[currentQuestionIndex] && (
                  <div className='border-0 bg-sky-950 mt-4 p-4 shadow-md'>
                    <h4 className='font-bold text-orange-500'>Feedback:</h4>
                    <p className='text-white'>{feedback[currentQuestionIndex]}</p>
                  </div>
                )}</div>
        </div>
        <div className='flex justify-center '>
          <button
            className="bg-sky-950 w-24 text-white  border-red-600 border-1px rounded-md mx-4  p-1 hover:bg-emerald-600 hover:text-black font-mono font-bold"
            onClick={moveToNextQuestion}
          >
            Next
          </button>
          </div>
      </div>

      <div className="w-full h-200 flex justify-center items-center bg-emerald-600 mt-48 border-2 border-emerald-600">
        <input
        value={inputValue}
          className="border-black border-1 w-2/5 p-1 my-20 mx-3 rounded-5px font-bold font-mono text-black px-5"
          type="text"
          placeholder="type your answer"
          onChange={handleInputChange}
        />
          <button
            className="bg-sky-950 w-24 text-white  border-red-600 border-1px rounded-md  p-1 hover:bg-white hover:text-black font-mono font-bold"
            onClick={handleSubmit}
          >
            Submit
          </button>
      </div>
      </div>
      
    </div>
  );
};

export default InterviewPage;






