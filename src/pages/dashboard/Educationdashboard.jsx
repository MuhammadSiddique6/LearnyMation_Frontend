import React from "react";
import {
  FaTasks,
  FaStar,
  FaClock,
  FaTrophy,
  FaBookOpen,
  FaPaintBrush,
  FaLightbulb,
  FaChartLine,
} from "react-icons/fa";

const EducatorDashboard = () => {
  const stats = [
    { title: "Completed Activities", value: "48", icon: <FaTasks className="text-blue-500 text-xl" /> },
    { title: "Average Score", value: "92%", icon: <FaStar className="text-yellow-500 text-xl" /> },
    { title: "Learning Time", value: "12.5h", icon: <FaClock className="text-purple-500 text-xl" /> },
    { title: "Achievements", value: "15", icon: <FaTrophy className="text-green-500 text-xl" /> },
  ];

  const recentActivities = [
    { name: "Basic Addition and Subtraction", date: "Completed on Dec 15, 2023", icon: <FaBookOpen className="text-blue-600" /> },
    { name: "Drawing and Colors", date: "Completed on Dec 14, 2023", icon: <FaPaintBrush className="text-pink-500" /> },
    { name: "Story Time Reading", date: "Completed on Dec 13, 2023", icon: <FaLightbulb className="text-yellow-400" /> },
  ];

  const subjectProgress = [
    { name: "All Subjects", percentage: "9%", icon: <FaChartLine className="text-gray-500" /> },
    { name: "Basic Math", percentage: "100%", icon: <FaBookOpen className="text-blue-600" /> },
    { name: "Creativity", percentage: "88%", icon: <FaPaintBrush className="text-pink-500" /> },
    { name: "Science", percentage: "92%", icon: <FaLightbulb className="text-yellow-400" /> },
  ];

  const chartData = [
    { week: "Week 1", math: 60, creativity: 40, reading: 50 },
    { week: "Week 2", math: 70, creativity: 50, reading: 60 },
    { week: "Week 3", math: 85, creativity: 70, reading: 80 },
    { week: "Week 4", math: 100, creativity: 88, reading: 92 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Welcome, Hannan Hashmi!</h1>

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

        {/* Recent Activities and Subject Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2 bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activities</h3>
            <div className="divide-y divide-gray-200">
              {recentActivities.map((activity, index) => (
                <div key={index} className="py-4 flex items-center space-x-4 hover:bg-gray-50 px-2 rounded">
                  {activity.icon}
                  <div className="flex justify-between w-full">
                    <div className="text-sm font-medium text-blue-600">{activity.name}</div>
                    <div className="text-sm text-gray-500">{activity.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subject Progress */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Progress</h3>
            {subjectProgress.map((subject, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center space-x-2">
                    {subject.icon}
                    <span className="text-sm font-medium text-gray-700">{subject.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{subject.percentage}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: subject.percentage }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Progress Chart */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Progress Over Time</h3>
          <div className="overflow-x-auto">
            <div className="h-64 flex items-end space-x-2 min-w-[320px]">
              {chartData.map((week, index) => (
                <div key={index} className="flex flex-col items-center flex-1 min-w-[60px]">
                  <div className="flex space-x-1 w-full h-40">
                    <div className="bg-blue-500 w-1/3 rounded-t hover:bg-blue-600 transition" style={{ height: `${week.math}%` }} title={`Basic Math: ${week.math}%`}></div>
                    <div className="bg-green-500 w-1/3 rounded-t hover:bg-green-600 transition" style={{ height: `${week.creativity}%` }} title={`Creativity: ${week.creativity}%`}></div>
                    <div className="bg-purple-500 w-1/3 rounded-t hover:bg-purple-600 transition" style={{ height: `${week.reading}%` }} title={`Reading: ${week.reading}%`}></div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">{week.week}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-xs text-gray-600">Basic Math</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-xs text-gray-600">Creativity</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              <span className="text-xs text-gray-600">Reading</span>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default EducatorDashboard;
