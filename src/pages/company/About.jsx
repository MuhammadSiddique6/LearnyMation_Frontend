import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-blue-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl sm:text-4xl font-bold text-black mb-6 text-center">
          About Our Learning App
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          Welcome to <span className="font-semibold text-black">LearnyMation!</span> 🎉 A fun and interactive learning app specially designed for children between the ages of 2 to 8 years.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Our mission is to help young minds grow through games, colors, quizzes, and creative activities. With LearnyMation, learning becomes playtime!
        </p>
        <h2 className="text-2xl font-semibold text-black mt-6 mb-3">
          What We Offer:
        </h2>
        <ul className="list-disc pl-6 text-gray-700 text-lg">
          <li>🎨 Color and shape recognition games</li>
          <li>🔢 Fun number learning and counting activities</li>
          <li>🧠 Brain-boosting puzzles and memory games</li>
          <li>📚 Early reading and vocabulary exercises</li>
          <li>🧩 Interactive and safe play-based learning</li>
        </ul>
        <p className="text-lg text-gray-700 mt-6">
          Our content is created with the help of teachers and child experts to ensure it’s age-appropriate, educational, and most of all — fun!
        </p>
        <p className="text-lg text-gray-700 mt-6">
          💖 Thank you for choosing LearnyMation. Let’s make learning a joyful journey together!
        </p>
      </div>
    </div>
  );
};

export default About;
