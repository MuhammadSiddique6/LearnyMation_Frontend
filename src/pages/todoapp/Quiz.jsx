
import React, { useState, useEffect } from "react";
import quizData from "../../data/easy.json";
import  {getrandomquestion}  from "../../utility/getrandomquestion";
import { Link } from "react-router-dom";

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 5 minutes

  useEffect(() => {
    const selectedQuestions = getrandomquestion(quizData, 5);
    setQuestions(selectedQuestions);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) clearInterval(timer);
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentQ = questions[currentIndex];
  const totalQuestions = questions.length;
  const progressPercentage = Math.round((currentIndex / totalQuestions) * 100);

  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option);
    if (option === currentQ.answer) setScore(score + 1);

    // Auto move to next question after 1s
    setTimeout(() => {
      setSelectedAnswer(null);
      setCurrentIndex(currentIndex + 1);
    }, 800);
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  if (timeLeft <= 0) {
  return (
    <div className="min-h-screen flex items-center justify-center text-2xl font-bold  flex-col space-y-4">
      Time's up! Your Score: {score}/{questions.length}
    <Link to="/dashboard">
          <button className="text-indigo-600 hover:text-indigo-800 font-medium">
            Back to Home
          </button>
          </Link>
    </div>
  );
}

if (!currentQ) {
  return (

    <div className="min-h-screen flex flex-col space-y-4 items-center justify-center text-2xl font-bold">
      Quiz Finished! Your Score: {score}/{totalQuestions}
      <Link to="/dashboard">
          <button className="text-indigo-600 hover:text-indigo-800 font-medium">
            Back to Home
          </button>
          </Link>
    </div>

  );
}


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-700">LearnyMation Quiz</h1>
        <div className="flex items-center space-x-4">
          <span className="text-lg font-medium text-gray-700">
            Category: {currentQ.category}
          </span>
          <div className="bg-indigo-100 px-4 py-2 rounded-lg">
            <span className="text-indigo-700 font-medium">
              Time left: {formatTime(timeLeft)}
            </span>
          </div>
          <Link to="/dashboard">
          <button className="text-indigo-600 hover:text-indigo-800 font-medium">
            Back to Home
          </button>
          </Link>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-4 mb-8">
        <div
          className="bg-indigo-600 h-4 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="mb-6">
          <span className="text-lg font-medium text-gray-500">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
        </div>

        <h2 className="text-2xl font-semibold mb-6">{currentQ.question}</h2>

        <div className="space-y-4">
          {currentQ.options.map((option, index) => (
            <div
              key={index}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                selectedAnswer === option
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-gray-200 hover:border-indigo-300"
              }`}
              onClick={() => handleAnswerSelect(option)}
            >
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                    selectedAnswer === option
                      ? "border-indigo-600 bg-indigo-600"
                      : "border-gray-300"
                  }`}
                >
                  {selectedAnswer === option && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="text-lg">{option}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <div className="text-gray-600">
          <span className="font-medium">Your Journey</span> {progressPercentage}%
        </div>
        <div className="flex space-x-4">
          <button
            className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
            onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
          >
            Go Back
          </button>
          <button
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            onClick={() => {
              if (selectedAnswer) return;
              setCurrentIndex((i) => i + 1);
            }}
          >
            Keep Going
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
