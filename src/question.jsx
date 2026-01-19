export default function Question({question, allAnswers, onSelectAnswer, index, quizCompleted, correctAnswer, selectedAnswer}){
    return(
        <div className="quizz">
            <p>{question}</p>
            <div className="quizz-button-section">
                {allAnswers.map(item=>(
                    <button className={`
                        //affiche en vert la bonne réponse quand le quizz est terminé
                        ${quizCompleted && item === correctAnswer? 'correct-answer' : ''} 
                        //surligne la réponse sélectionnée par l'utilisateur pendant le quizz
                        ${!quizCompleted && item === selectedAnswer[index]? 'selected' : ''}
                        //affiche en rouge la mauvaise réponse selectionnée quand le quizz est terminé
                        ${quizCompleted && item === selectedAnswer[index] && item !== correctAnswer? 'wrong-answer' : ''}
                        `}
                        onClick={()=>onSelectAnswer(index, item)} key={item}>{item}</button>
                ))}
            </div>
        </div>
    )
}