import React, { useState, useEffect } from "react";
import data from "./static/data.json";
import "./style.css";
import { FaInstagram, FaTelegramPlane } from "react-icons/fa";

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    parseInt(sessionStorage.getItem("currentQuestionIndex")) || 0
  );
  const [score, setScore] = useState(
    parseInt(sessionStorage.getItem("score")) || 0
  );
  const [showResult, setShowResult] = useState(
    sessionStorage.getItem("showResult") === "true" || false
  );
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    sessionStorage.setItem("currentQuestionIndex", currentQuestionIndex);
    sessionStorage.setItem("score", score);
    sessionStorage.setItem("showResult", showResult);
  }, [currentQuestionIndex, score, showResult]);

  const currentQuestion = data[currentQuestionIndex];

  const handleAnswer = (answer) => {
    if (answer === currentQuestion.true_answer) {
      setScore(score + 1);
    }
    setSelectedAnswer(answer);
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    if (currentQuestionIndex < data.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    sessionStorage.clear();
  };

  return (
    <div className="quiz_wrapper">
      {showResult ? (
        <div>
          <h2>Natija</h2>
          <p>
            Siz {data.length} ta savoldan {score} ta to'g'ri javob berdingiz.
          </p>
          <button onClick={restartQuiz}>Qayta boshlash</button>
        </div>
      ) : (
        <div>
          <h2>{currentQuestion.question}</h2>
          <div>
            {currentQuestion.options.map((option) => (
              <div key={option.value} style={{ margin: "10px 0" }}>
                <button
                  className={`${
                    selectedAnswer === option.value
                      ? option.value === currentQuestion.true_answer
                        ? "correct"
                        : "incorrect"
                      : ""
                  }`}
                  onClick={() => handleAnswer(option.value)}
                  disabled={selectedAnswer !== null}
                >
                  {option.answer}
                </button>
              </div>
            ))}
          </div>
          {selectedAnswer && (
            <button
              onClick={nextQuestion}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "blue",
                color: "white",
                cursor: "pointer",
              }}
            >
              Keyingi savol
            </button>
          )}
        </div>
      )}
      <div className="credits">
        <a target="_blank" href="https://t.me/jasurbek_muminjonov">
          <FaTelegramPlane /> jasurbek_muminjonov
        </a>
        <a target="_blank" href="https://instagram.com/jasurbek_muminjonov">
          <FaInstagram /> jasurbek_muminjonov
        </a>
      </div>
    </div>
  );
};

export default Quiz;
