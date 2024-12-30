import { useEffect, useState } from 'react';
import React from 'react';
import './App.css';
import generateQuiz from './script';

function App() {
  const [quizArray, setQuizArray] = useState([]); // State to store the quiz data
  const [loading, setLoading] = useState(false); // State to track loading status
  const [qNo, setQNo] = useState(0);
  const [difficulty,setDifficulty] = useState("")
  const [topic,setTopic] = useState("")
  const [isSubmit,setIsSubmit] = useState(false)
  const [score,setScore] = useState(0)
  const [userAnswers,setUserAnswers] = useState(["q","q","q","q","q","q","q","q","q","q"])

  let textInput = React.createRef();

  const handleGenerateQuiz = async () => {
    setLoading(true);
    console.log(`Generating quiz for difficulty: ${difficulty}`);
    const quiz = await generateQuiz(difficulty,topic);
    setQuizArray(quiz);
    setLoading(false);
  };

  const handleNext = () =>{
    setQNo((qNo+1)%10)
  }

  const handlePrevious = () =>{
    setQNo((qNo-1+10)%10)
  }

  const handleTopic = () =>{
    setTopic(textInput.current.value)
  }

  const handleEasy = () =>{
    setDifficulty("Easy")
  }

  const handleMedium = () =>{
    setDifficulty("Medium")
  }

  const handleHard = () =>{
    setDifficulty("Hard")
  }

  const handleSubmit  = ()=>{


    let newScore = 0;
    for(let i=0;i<userAnswers.length;i++){
      if(userAnswers[i]===quizArray[i].answer) newScore++;
    }
    setScore(newScore)
    setIsSubmit(true)
  }


  const handleUserAnswers = (e)=>{
    const selectedOption = e.target.className.split(" ")[1]; // Get the class of the clicked option
    const optionSelected = selectedOption[selectedOption.length - 1]; // Get the last character
  

      setUserAnswers((userAnswers)=>{
        let prevArray = [...userAnswers]
        prevArray[qNo] = optionSelected
        console.log(prevArray)
        return prevArray;
      })
    }

  useEffect(() => {
    console.log(`Difficulty updated to: ${difficulty}`);
  }, [difficulty]); // Runs whenever `difficulty` changes

  useEffect(()=>{
    console.log(`Topic updated to ${topic}`)
  },[topic])

  useEffect(()=>{
    console.log(score)
  },[score])

  if(!isSubmit){
    return (<div>
      <h1 className="main-heading">AI Quiz Generator</h1>
      <div className="container">
    
        <div className="inputs">
            <div className="topic-input">
                      <input ref={textInput} type="text" placeholder="select any topic"/>
                      <button onClick={handleTopic}>Select</button>
            </div>
            {topic.length>0&&(<div className="difficulty">
              <p>Difficulty :</p>
              <button onClick={handleEasy} className='left-btn'>Easy </button>
              <button onClick={handleMedium}>Medium</button>
              <button onClick={handleHard}>Hard</button>
          </div>)}
    
        </div>
          
          {difficulty.length>0&&(<div className="generate" >
              <button onClick={handleGenerateQuiz}>Generate</button>
          </div>)}
          
    
          {loading && (<div className="wrapper">
                              <div className="circle"></div>
                              <div className="circle"></div>
                              <div className="circle"></div>
                              <div className="shadow"></div>
                              <div className="shadow"></div>
                              <div className="shadow"></div>
                      </div>)}
          {quizArray.length > 0 && !loading &&(<div>
              <div className="question">
                  <p>Q.{qNo+1} {quizArray[qNo].question}</p>
              </div>
              <div className="options">
                  <div className="option option-a" onClick={handleUserAnswers}>a. {quizArray[qNo].options.a}</div>
                  <div className="option option-b" onClick={handleUserAnswers}>b. {quizArray[qNo].options.b}</div>
                  <div className="option option-c" onClick={handleUserAnswers}>c. {quizArray[qNo].options.c}</div>
                  <div className="option option-d" onClick={handleUserAnswers}>d. {quizArray[qNo].options.d}</div>
              </div>
              <div className="utility-btns">
                  <button onClick={handlePrevious}>Previous</button>
                  <button onClick={handleSubmit}>Submit</button>
                  <button onClick={handleNext}>Next</button>
          </div>
          </div>)}
      </div>
    </div>
    );
  }

  else{
    return (
      <div className='container submit-container'>

        <div className="score">
        <p>Your Score is : {score}/10</p>
        </div>
        <div className="analysis">
          <ul>
            {quizArray.map((q, index) => (
                            <li key={index} style={{backgroundColor: q.answer === userAnswers[index] ? "#418b24" : "#e90c00"}}>
                                  <strong>Q.</strong>{index+1} {q.question} <br/>
                                  <strong>Correct Answer:</strong> {q.answer} - {q.options[q.answer]}
                            </li>       
    ))}
          </ul>
        </div>

      </div>
      
    )
  }

}

export default App;