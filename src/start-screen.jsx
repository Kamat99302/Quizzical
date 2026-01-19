import { FaPlay } from "react-icons/fa";

import { IoSparklesOutline } from "react-icons/io5";

export default function StartScreen({handleClick, difficulty, onDifficultyChange, questionsNumber, onQuestionsNumberChange, category, onCategoryChange}){


    return (
        <main>
            <div className="start-screen">
                <span><IoSparklesOutline/>Test Your Knowledge</span>        
                <h1>Quizzical</h1>
                <p>Challenge yourself with fun trivia questions</p>

              
                <div className="difficulty-section">
                    <label for="choose-difficulty">Difficulty</label>
                    <select value={difficulty} onChange={(e)=> onDifficultyChange(e.target.value)}> {/*onChange va detecter chaque changement fait au menu deroulant et modifier le state difficulté*/}
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                    <label for="choose-numberOf-questions">Number of questions</label>
                    <select value={questionsNumber} onChange={(e)=> onQuestionsNumberChange(e.target.value)}> {/*onChange va detecter chaque changement fait au menu deroulant et modifier le state difficulté*/}
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                    </select>
                    <label for="choose-numberOf-questions">Category</label>
                    <select value={category} onChange={(e)=> onCategoryChange(e.target.value)}> {/*onChange va detecter chaque changement fait au menu deroulant et modifier le state difficulté*/}
                        <option value={0}>Select category</option>
                        <option value={10}>Books</option>
                        <option value={11}>Films</option>
                        <option value={12}>Music</option>
                        <option value={15}>Video Games</option>
                        <option value={22}>Geography</option>
                        <option value={23}>History</option>
                    </select>
                    <button onClick={handleClick}> <FaPlay /> Start Quiz</button>
                </div>
            </div>

            
          
            
        </main>
    )
}