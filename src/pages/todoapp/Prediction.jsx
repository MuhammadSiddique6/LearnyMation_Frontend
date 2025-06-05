import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PredictionPage = () => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPrediction = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('http://localhost:3000/api/ai/prediction', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          setPrediction(res.data.data);
        } else {
          setError(res.data.message);
        }
      } catch (err) {
        setError('Failed to fetch prediction data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrediction();
  }, []);

  if (loading) return <div className="text-center mt-10 text-blue-500">Loading prediction...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
        Your AI-Based Field Prediction
      </h2>

      <div className="grid gap-6">
        <div className="bg-indigo-50 p-4 rounded-xl shadow">
          <p className="text-xl font-medium text-gray-700">
            <span className="font-semibold text-green-600">Suggested Field:</span> {prediction.predicted_field}
          </p>
          <p className="mt-2 text-gray-600">
            <span className="font-semibold">Quiz Completed:</span> {prediction.quizCompletedCount}
          </p>
         
        </div>

        {prediction.recommendation && (
          <div className="bg-white border border-indigo-100 p-4 rounded-xl shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Top Strength Area</h3>
            <p className="text-indigo-600 font-medium">{prediction.recommendation}</p>
          </div>
        )}

        {prediction.field_recommendation && (
          <div className="bg-white border border-gray-200 p-4 rounded-xl shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Field Recommendation</h3>
            <p className="text-gray-700">{prediction.field_recommendation}</p>
          </div>
        )}

      

        {/* Render Improvements by Category */}
        {prediction.improvements && Object.keys(prediction.improvements).length > 0 && (
          <div className="bg-yellow-200 border border-gray-300 p-4 rounded-xl shadow mt-4">
            <h3 className="text-lg font-semibold text-red-600 mb-3">Suggestion For Improvements</h3>
            <ul className="space-y-3">
              {Object.entries(prediction.improvements).map(([category, advice]) => (
                <li key={category}>
                  <p className="font-semibold text-green-600">{category}:</p>
                  <p className="text-gray-700 ml-4">{advice}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionPage;
