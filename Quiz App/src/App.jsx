import { useState } from 'react';
import './App.css';
import generateQuiz from './script';

function App() {
  const [quizArray, setQuizArray] = useState([]); // State to store the quiz data
  const [loading, setLoading] = useState(false); // State to track loading status
  const [qNo, setQNo] = useState(0);

  const handleGenerateQuiz = async () => {
    setLoading(true);
    const quiz = await generateQuiz();
    setQuizArray(quiz)
    setLoading(false);
  };

  const handleNext = () =>{
    setQNo((qNo+1)%10)
  }

  const handlePrevious = () =>{
    setQNo((qNo-1+10)%10)
  }



  return (
    <div>
    <h1>Quiz Generator</h1>
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
  </div>
  );
}

export default App;
