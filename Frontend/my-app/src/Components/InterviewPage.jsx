
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

const InterviewPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [submittedValue, setSubmittedValue] = useState('');
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleSubmit = () => {
    setSubmittedValue(inputValue);
    let obj={
      "question":questions[currentQuestionIndex].question,
      "answer":inputValue
    }
    console.log(obj)
    fetch (`https://sparai-backend-app.onrender.com/interview/post`,{
      method: `POST`,
      headers:{
        "Content-Type":"application/json",  
      },
      body:JSON.stringify(obj)
    })
    .then ((res)=>res.json()).then ((data)=>console.log(data.res)).catch((e)=>console.log(e))
    setInputValue("");
    
  };
  // Function to move to the next question
  const moveToNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSubmittedValue("")
  };
  const moveToPrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    setSubmittedValue("")
  };
  
  const getQuestions = async () => {
    const topic=JSON.parse(localStorage.getItem("topic"))
    let obj={
      topic
    }
    console.log(obj)
     
     await fetch (`https://sparai-backend-app.onrender.com/questions?topic=${topic}`)
    .then ((res)=>res.json()).then ((data)=>setQuestions(data.msg)).catch((e)=>console.log(e))
    
  };

  useEffect(() => {
    getQuestions();
  }, []);

  console.log(questions);

  return (
    <>
      <div className="w-full h-14 flex justify-between items-center bg-sky-950">
        <img src="./logo.svg" className="w-20" />
        <div>
          <button className="bg-orange-600 w-24 h-7 rounded-md text-white rounded-2 m-4 hover:bg-white hover:text-black font-mono font-bold ">
            btn1
          </button>
          <button className="bg-orange-600 w-24 h-7 rounded-md text-white rounded-2 m-4 hover:bg-white hover:text-black font-mono font-bold">
            btn2
          </button>
        </div>

      </div>

      <div className="w-full h-520">
      <div className="w-full h-full border-solid border-2 border-black m-8 p-8 font-mono text-xl font-bold " rows="15">
        {currentQuestionIndex < questions.length ? (
        <p>{"Q."+currentQuestionIndex+"."+questions[currentQuestionIndex].question +"?"}</p>
      ) : (
        <p>No more questions.</p>
      )}
        {submittedValue && <p>Ans: {submittedValue}</p>}
        </div>
        <button
            className="bg-orange-600 w-24 text-white rounded-5px border-red-600 border-1px rounded-md  p-1 hover:bg-white hover:text-black font-mono font-bold"
            onClick={moveToPrevQuestion}
          >
            Prev.
          </button>
          <button
            className="bg-orange-600 w-24 text-white rounded-5px border-red-600 border-1px rounded-md  p-1 hover:bg-white hover:text-black font-mono font-bold"
            onClick={moveToNextQuestion}
          >
            Next
          </button>
      </div>

      <div className="w-full h-200 flex justify-center items-center bg-sky-950 mt-28">
        <input
        value={inputValue}
          className="border-black border-1 w-2/5 p-1 m-12 rounded-5px font-bold font-mono text-black px-5"
          type="text"
          placeholder="type your answer"
          onChange={handleInputChange}
        />
          <button
            className="bg-orange-600 w-24 text-white rounded-5px border-red-600 border-1px rounded-md  p-1 hover:bg-white hover:text-black font-mono font-bold"
            onClick={handleSubmit}
          >
            Submit
          </button>
      </div>
    </>
  );
};

export default InterviewPage;






