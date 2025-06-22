import React, { useState, useEffect } from "react";
import quizData from "../../data/quiz_dataset_age_2_8.json";
import { getrandomquestion } from "../../utility/getrandomquestion";
import { Link } from "react-router-dom";
import axios from "axios";

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [userAnswers, setUserAnswers] = useState([]);
  const [startTime] = useState(Date.now()); // quiz start time in milliseconds

 const shuffleOptionsAndUpdateAnswer = (questions) => {
  return questions.map((q) => {
    const options = [...q.options];
    // Shuffle options array
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    // Find new index of correct answer
    const newAnswer = options.find((opt) => opt === q.answer);
    return { ...q, options, answer: newAnswer };
  });
};

useEffect(() => {
  const selectedQuestions = getrandomquestion(quizData, 5, 25);
  const shuffledQuestions = shuffleOptionsAndUpdateAnswer(selectedQuestions);
  setQuestions(shuffledQuestions);
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

    if (option === currentQ.answer) {
      setScore((prev) => prev + 1);
    }

    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentIndex] = option;
    setUserAnswers(updatedAnswers);

    setTimeout(() => {
      setSelectedAnswer(null);
      setCurrentIndex((i) => i + 1);
    }, 800);
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const saveQuizResults = async () => {
    const scoresByCategory = {};

    questions.forEach((q, idx) => {
      if (!scoresByCategory[q.category]) {
        scoresByCategory[q.category] = 0;
      }
      if (q.answer === userAnswers[idx]) {
        scoresByCategory[q.category]++;
      }
    });

    const token = localStorage.getItem("token");
    const endTime = Date.now();
  const timeSpentInSeconds = Math.floor((endTime - startTime) / 1000); // convert ms to seconds
  console
    try {
      await axios.post(
        "http://localhost:3000/api/quiz",
        {
          scores: scoresByCategory,
          totalScore: score,
          timeSpent: timeSpentInSeconds, // ✅ Include time spent

        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Quiz result saved successfully.");
    } catch (error) {
      console.error("Failed to save quiz results:", error);
    }
  };

  useEffect(() => {
    if (!currentQ && questions.length > 0) {
      saveQuizResults();
    }
  }, [currentQ]);

  if (timeLeft <= 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-2xl font-bold space-y-4 px-4 text-center">
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
      <div className="min-h-screen flex flex-col space-y-4 items-center justify-center text-2xl font-bold px-4 text-center">
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
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-700">LearnyMation Quiz</h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm sm:text-lg">
          <span className="font-medium text-gray-700">Category: {currentQ.category}</span>
          <div className="bg-indigo-100 px-3 py-1 rounded-lg">
            <span className="text-indigo-700 font-medium">Time left: {formatTime(timeLeft)}</span>
          </div>
          <Link to="/dashboard">
            <button className="text-indigo-600 hover:text-indigo-800 font-medium">Back to Home</button>
          </Link>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
        <div
          className="bg-indigo-600 h-3 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 mb-6 sm:mb-8">
        <div className="mb-4 sm:mb-6 text-sm sm:text-lg font-medium text-gray-500">
          Question {currentIndex + 1} of {totalQuestions}
        </div>

        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">{currentQ.question}</h2>

        <div className="space-y-3 sm:space-y-4">
          {currentQ.options.map((option, index) => (
            <div
              key={index}
              className={`p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-colors ${
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
                <span className="text-base sm:text-lg">{option}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div className="text-gray-600 text-sm sm:text-base">
          <span className="font-medium">Your Journey</span> {progressPercentage}%
        </div>
        <div className="flex space-x-3 sm:space-x-4">
          <button
            className="px-5 py-2 sm:px-6 sm:py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
            onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
            disabled={currentIndex === 0}
          >
            Go Back
          </button>
          <button
            className="px-5 py-2 sm:px-6 sm:py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            onClick={() => {
              // if (!userAnswers[currentIndex]) {
              //   alert("Please select an answer before moving forward!");
              //   return;
              // }
              setCurrentIndex((i) => i + 1);
            }}
            disabled={currentIndex === totalQuestions - 1}
          >
            Keep Going
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
