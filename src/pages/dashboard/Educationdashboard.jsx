import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaTasks, FaStar, FaClock, FaTrophy,
  FaBookOpen, FaPaintBrush, FaLightbulb,
  FaChartLine,FaEye
} from "react-icons/fa";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell
} from "recharts";

const EducatorDashboard = () => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token used in request:", token);

        const response = await axios.get("http://localhost:3000/api/progress/educationdashboard", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log("Raw progress from API ➜", response.data);
        setProgress(response.data);
      } catch (err) {
        console.error("Error fetching progress:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!progress) return <div className="p-6 text-center text-red-600">Failed to load data.</div>;

  // Format learning time
  const totalSeconds = Number(progress.timeSpentInSeconds) || 0;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const learningTimeDisplay = hours === 0 ? `${minutes}m` : `${hours}h ${minutes}m`;

  const stats = [
    {
      title: "Completed Activities",
      value: progress.quizzesCompleted,
      icon: <FaTasks className="text-blue-500 text-xl" />
    },
    {
      title: "Average Score",
      value: `${progress.averageScorePercentage}%`,
      icon: <FaStar className="text-yellow-500 text-xl" />
    },
    {
      title: "Learning Time",
      value: learningTimeDisplay,
      icon: <FaClock className="text-purple-500 text-xl" />
    },
    {
      title: "Achievements",
      value: progress.achievements.length,
      icon: <FaTrophy className="text-green-500 text-xl" />
    },
  ];

  const subjectProgress = [
    {
      name: "Math",
      percentage: progress.quizzesCompleted > 0 ? (progress.totalScoresBySubject.Math / progress.quizzesCompleted * 100) : 0,
      icon: <FaBookOpen className="text-blue-600" />
    },
    {
      name: "Science",
      percentage: progress.quizzesCompleted > 0 ? (progress.totalScoresBySubject.Science / progress.quizzesCompleted * 100) : 0,
      icon: <FaLightbulb className="text-yellow-400" />
    },
    {
      name: "Creativity",
      percentage: progress.quizzesCompleted > 0 ? (progress.totalScoresBySubject.Creativity / progress.quizzesCompleted * 100) : 0,
      icon: <FaPaintBrush className="text-pink-500" />
    },
    {
      name: "Logic Thinking",
      percentage: progress.quizzesCompleted > 0 ? (progress.totalScoresBySubject.LogicThinking / progress.quizzesCompleted * 100) : 0,
      icon: <FaChartLine className="text-gray-500" />
    },
   {
  name: "Object Detection",
  percentage: progress.quizzesCompleted > 0
    ? (progress.totalScoresBySubject.ObjectDetection / progress.quizzesCompleted * 100)
    : 0,
  icon: <FaEye className="text-red-500" /> // Updated icon and color
}
  ];

  const barChartData = subjectProgress.map(subj => ({
    subject: subj.name,
    score: Number(subj.percentage.toFixed(2))
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Welcome, {progress.name}!</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-4 sm:p-6 shadow rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                  {stat.icon}
                </div>
                <div className="flex flex-col justify-center">
                  <div className="text-sm font-medium text-gray-500">{stat.title}</div>
                  <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Subject Progress List */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Subject-wise Progress</h3>
          {subjectProgress.map((subject, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center space-x-2">
                  {subject.icon}
                  <span className="text-sm font-medium text-gray-700">{subject.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-700">{subject.percentage.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${subject.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Histogram Bar Chart */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Subject Progress Histogram</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis unit="%" />
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
              <Bar dataKey="score" name="Score (%)">
                {barChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      [
                        "#3b82f6", // Math
                        "#facc15", // Science
                        "#ec4899", // Creativity
                        "#10b981", // Logic Thinking
                        "#8b5cf6"  // Object Detection
                      ][index % 5]
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
};

export default EducatorDashboard;
