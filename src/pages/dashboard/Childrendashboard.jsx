import React, { useEffect, useState } from 'react';
import {
  Star,
  CalendarCheck,
  Award,
  BookOpen,
  Video,
  Gamepad,
  Lock,
  CheckCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const ChildrenDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('No token found. Please login first.');
          setLoading(false);
          return;
        }

        const res = await axios.get('http://localhost:3000/api/children/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
      } catch (error) {
        console.error('Failed to fetch user data', error);
        toast.error('Failed to fetch user data. Please check your login.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div className="text-center mt-10 font-semibold">Loading...</div>;
  if (!user) return <div className="text-center mt-10 text-red-500 font-semibold">Failed to load user data.</div>;

  const {
    name,
    points,
    streak,
    level,
    quizzesCompleted,
    videosWatched,
    gamesPlayed,
    achievements = [],
  } = user;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-6 font-sans">
      {/* Greeting */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-5xl font-bold text-black drop-shadow">Hi {name}!</h1>
        <p className="text-lg sm:text-xl mt-2 text-black">Ready to learn something amazing today? 🎉</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatBox icon={<Star className="mx-auto mb-2" />} label="Your Progress" value={`${points} Points`} />
        <StatBox icon={<CalendarCheck className="mx-auto mb-2" />} label="Daily Streak" value={`${streak} Days`} />
        <StatBox icon={<Award className="mx-auto mb-2" />} label="Current Level" value={`Level ${level}`} />
      </div>

      {/* Actions Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Link to="/quiz">
          <ActionBox icon={<BookOpen />} title="Quizzes" value={`${quizzesCompleted} completed`} action="Start Quiz" />
        </Link>
        <Link to='/videos'>
        <ActionBox icon={<Video />} title="Videos" value={` Watch Animations`} action="Watch Now" />
        </Link>
         
          <Link to="/game">
        <ActionBox icon={<Gamepad />} title="Games" value={`Explore New Games`} action="Play Game" />
        </Link>
      </div>

      {/* Achievements Section */}
      {achievements.length > 0 && (
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-4">Your Achievements</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {achievements.map((ach, index) => (
              <Achievement
                key={index}
                badge={ach.name}
                unlocked={ach.unlocked}
                icon={ach.unlocked ? <CheckCircle /> : <Lock />}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Stat Box Component
const StatBox = ({ icon, label, value }) => (
  <div className="bg-white p-5 rounded-2xl shadow text-center">
    {icon}
    <h3 className="text-sm text-gray-500">{label}</h3>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

// Action Box Component
const ActionBox = ({ icon, title, value, action }) => (
  <div className="bg-white p-5 rounded-2xl shadow text-center flex flex-col justify-between items-center">
    <div className="flex flex-col items-center space-y-2">
      {icon}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{value}</p>
    </div>
    <button className="mt-4 bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 w-full sm:w-auto">
      {action}
    </button>
  </div>
);

// Achievement Badge Component
const Achievement = ({ badge, unlocked, icon }) => (
  <div
    className={`w-32 text-center p-4 rounded-xl shadow flex flex-col items-center space-y-2 ${
      unlocked ? 'bg-green-100 text-black' : 'bg-gray-200 text-gray-400'
    }`}
  >
    {icon}
    <p className="text-sm font-bold">{badge}</p>
  </div>
);

export default ChildrenDashboard;
