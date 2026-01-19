import Question from "./question"
export default function Quiz({questions, onSelectAnswer, quizCompleted, selectedAnswer, incorrect_answers, darkMode}){
    return (
        <section className="questions">
            <div>
                {questions.map((item, index)=>{
                    //création d'un nouvel array qui contient les mauvaises réponses ainsi que la bonne réponse
                    return(
                    <Question
                        index={index}
                        key={item.question}
                        question={item.question}
                        allAnswers={item.allAnswers}
                        onSelectAnswer= {onSelectAnswer}
                        correctAnswer = {item.correct_answer}
                        quizCompleted = {quizCompleted}
                        selectedAnswer = {selectedAnswer}
                        darkMode={darkMode} 
                    />
                )}
            )}
            </div>
        </section>
    )
}