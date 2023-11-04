import React, { useState } from "react";
import "./App.css";
import { questions } from "./data/questions";
import backgroundImage from "./assests/coding.gif";

function App() {
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswerIndex, setUserAnswerIndex] = useState(null);

  const optionClicked = (isCorrect, index) => {
    if (userAnswerIndex === null) {
      setUserAnswerIndex(index);
      if (isCorrect) {
        setScore(score + 1);
      }
    }
    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setUserAnswerIndex(null);
      } else {
        setShowResults(true);
      }
    }, 500);
  };

  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
  };

  return (
    <div
      className="app d-flex align-items-center justify-content-center flex-column"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-light fw-bolder">React Quiz</h1>
      <h2 className="text-light fw-bolder">Score: {score}</h2>

      {showResults ? (
        <div className="final-results">
          <h1>Final Score</h1>
          <h2>
            {score} out of {questions.length} correct - Mark is{" "}
            {((score / questions.length) * 100).toFixed(2)}%
          </h2>
          <button onClick={() => restartGame()}>Try Again</button>
        </div>
      ) : (
        <div className="question-card">
          <h2>
            Question: {currentQuestion + 1} out of {questions.length}
          </h2>
          <h3 className="question-text">{questions[currentQuestion].text}</h3>
          <ul style={{ listStyle: "none" }}>
            {questions[currentQuestion].options.map((option, index) => {
              return (
                <li
                  key={option.id}
                  onClick={() => optionClicked(option.isCorrect, index)}
                  className={
                    userAnswerIndex === index
                      ? option.isCorrect
                        ? "bg-success"
                        : "bg-danger"
                      : ""
                  }
                >
                  <span className="option-number">
                    {String.fromCharCode(65 + index)}.{" "}
                  </span>
                  {option.text}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
