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

  useEffect(() => {
    console.log(`Difficulty updated to: ${difficulty}`);
  }, [difficulty]); // Runs whenever `difficulty` changes

  useEffect(()=>{
    console.log(`Topic updated to ${topic}`)
  },[topic])

  return (
    <div>
    <h1 className="main-heading">AI Quiz Generator</h1>
    <div className="container">

      <div className="inputs">
          <div className="topic-input">
                    <input ref={textInput} type="text" placeholder="Input a movie..."/>
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
        

        {loading && <p>Loading quiz...</p>}
        {quizArray.length > 0 && !loading &&(<div>
            <div className="question">
                <p>Q.{qNo+1} {quizArray[qNo].question}</p>
            </div>
            <div className="options">
                <div className="option" onClick={handleEasy}>a. {quizArray[qNo].options.a}</div>
                <div className="option">b. {quizArray[qNo].options.b}</div>
                <div className="option">c. {quizArray[qNo].options.c}</div>
                <div className="option">d. {quizArray[qNo].options.d}</div>
            </div>
            <div className="utility-btns">
                <button onClick={handlePrevious}>Previous</button>
                <button onClick={handleNext}>Next</button>
        </div>
        </div>)}
    </div>
  </div>
  );
}

export default App;




{/* <div class="inputs">
            <div class="topic-input">
                <input type="text" placeholder="Input a movie...">
                <button>Select</button>
            </div>
            <div class="difficulty">
                <p>Difficulty :</p>
                <button class="left-btn">Easy </button>
                <button>Medium</button>
                <button>Hard</button>
            </div>
        </div> */}


{/* <h1>Quiz Generator</h1>
    <button onClick={handleGenerateQuiz}>Generate Quiz</button>
    {loading && <p>Loading quiz...</p>}
    {quizArray.length > 0 && !loading &&(
      <div>
      <div>Question {qNo+1}: {quizArray[qNo].question}</div>
      <div>Options : 
        <div>a : {quizArray[qNo].options.a}</div>
        <div>b : {quizArray[qNo].options.b}</div>
        <div>c : {quizArray[qNo].options.c}</div>
        <div>d : {quizArray[qNo].options.d}</div>
      </div>
      <div>
        Answer : {quizArray[qNo].answer}
      </div>
      </div>
    )}
    <button onClick={handlePrevious}>Previous</button>
    <button onClick={handleNext}>Next</button>
    {/* <div>
      <h1>Difficulty : </h1>
    <button onClick={handleEasy}>Easy</button>
    <button onClick={handleMedium}>Medium</button>
    <button onClick={handleHard}>Hard</button>
    <button onClick={handleExpert}>Expert</button>
    </div> */}
