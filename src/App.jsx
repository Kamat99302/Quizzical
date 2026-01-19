import { useState, useEffect } from 'react'
import { decode } from 'he'
import StartScreen from './start-screen'
import Quiz from './quiz'
import './App.css'
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { FaHome } from "react-icons/fa";

function App() {
  //states values
  const [questions, setQuestions] = useState([])
  const [quizStarted, setQuizstarted] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState({})
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [difficulty, setDifficulty] = useState("easy")
  const [questionsNumber, setquestionsNumber] = useState(5)
  const [category, setCategory] = useState(0)


  useEffect(()=>{
    if (darkMode){
      document.body.classList.add('dark-mode')
    } else{
      document.body.classList.remove('dark-mode')
    }
  },[darkMode])
  

  //stockage des réponses selectionnées par l'utilisateur
  //utilise l'index de la question comme clé dans l'objet selectedAnswer
  function selectAnswer(index, answer){
    setSelectedAnswer({
      ...selectedAnswer,
      [index]: answer
    })
  }

  function switchMode(){
    setDarkMode(prevMode =>!prevMode)
    console.log(darkMode)
  }

  function backToMenu(){
    if(quizCompleted){ //quand la partie est terminée
      setQuizstarted(false)
      setQuizCompleted(false)
      setSelectedAnswer({})
      setScore(0)
      return
    } 
    else if (quizStarted && confirm("Are you sure you want to quit ? All progression will be gone")) //quand la partie n'est pas terminée
      setQuizstarted(false)
      setQuizCompleted(false)
      setSelectedAnswer({})
      setScore(0)
      setCategory(0)
    } 
  

  function calculateScore(){
    let scoreCalculated = 0
    let objSize = Object.keys(selectedAnswer).length
    console.log(objSize)
    //vérifie que l'utilisateur ait répondu a toutes les questions
    if (objSize < questionsNumber){
      return window.alert("You need to answer all the questions to see the results!")
     }
     //calcul du score en fonction des réponses de l'utilisateur
    questions.forEach((question,index)=>{
      if (question.correct_answer=== selectedAnswer[index]){
        scoreCalculated++
      }
    })
    setScore(scoreCalculated)
    setQuizCompleted(true)
  }

  function startNewGame(){
    setSelectedAnswer({})
    setQuizCompleted(false)
    getQuestions()
  }


  //obtention des questions et des choix de réponses via l'API
  const getQuestions = () =>{
    fetch(`https://opentdb.com/api.php?amount=${questionsNumber}${category?`&category=${category}` : ''}&difficulty=${difficulty}&type=multiple`)
      .then(answer=>answer.json())
      .then(data=>{
        //creation d'une variable pour décoder les données renvoyées par l'API
        let decodedData = data.results.map(item => {
          const decodedIncorrect = item.incorrect_answers.map(answer => decode(answer));
          const decodedCorrect = decode(item.correct_answer);
          return {
            ...item,
            question: decode(item.question),
            correct_answer: decodedCorrect,
            incorrect_answers: decodedIncorrect,
            allAnswers: [...decodedIncorrect].concat(decodedCorrect).sort(() => Math.random() - 0.5)
          }
        })
        setQuestions(decodedData)
        setQuizstarted(true)
    
  })
  }

  return (
    <div className='app'> 
      {<FaHome className='btn-home' onClick={backToMenu}/>}     
      {darkMode? <MdOutlineLightMode className="btn-mode" onClick={switchMode}/> : <MdDarkMode className="btn-mode" onClick={switchMode}/>}
      {quizStarted? <Quiz selectedAnswer={selectedAnswer} onSelectAnswer = {selectAnswer} questions={questions} quizCompleted={quizCompleted} darkMode={darkMode}/> : <StartScreen onDifficultyChange={setDifficulty} difficulty={difficulty} onQuestionsNumberChange={setquestionsNumber} questionsNumber={questionsNumber} onCategoryChange={setCategory} category={category} darkMode={darkMode} switchMode ={switchMode} handleClick = {getQuestions} /> }
      {(quizStarted && !quizCompleted) && <button onClick={calculateScore} className='check-answers-btn'>Check answers</button>}
      {quizCompleted && ( 
        <div className='bottom-el'>
          <p>You scored {score}/{questionsNumber}</p>
          <button onClick={startNewGame} className='new-game-btn'>New game</button>
        </div>)}
    </div> 
  )
}

export default App
