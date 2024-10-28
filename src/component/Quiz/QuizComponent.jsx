import React, { useState } from 'react';
import './quiz.css';
import quizData from './quizData';

const QuizComponent = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerOptionClick = (option) => {
    if (option === quizData[currentQuestionIndex].answer) {
      setScore(score + 1);
      alert('Correct!');
    } else {
      alert('Wrong answer. The correct answer is: ' + quizData[currentQuestionIndex].answer);
    }

    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setShowScore(true); 
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div className="quiz-container">
      {showScore ? (
        <div className="quiz-score-section">
          You scored {score} out of {quizData.length}
          <button onClick={handleRestartQuiz} className="quiz-restart-button">
            Restart Quiz
          </button>
        </div>
      ) : (
        <>
          <div className="quiz-question-section">
            <span className="quiz-question-count">
              Question {currentQuestionIndex + 1} of {quizData.length}
            </span>
            <h2 className="quiz-question">{quizData[currentQuestionIndex].question}</h2>
          </div>
          <div className="quiz-answer-section">
            {quizData[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerOptionClick(option)}
                className="quiz-option-button"
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default QuizComponent;
