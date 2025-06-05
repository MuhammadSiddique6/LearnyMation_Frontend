import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // ✅ Import Toaster
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Signin from './pages/auth/Signin';
import Signup from './pages/auth/Signup';
import ChildrenDashboard from "./pages/dashboard/Childrendashboard";
import HomePage from "./pages/dashboard/Homepage";
import EducatorDashboard from "./pages/dashboard/Educationdashboard";
import StoreIntegration from "./pages/dashboard/Storeintegration";
import About from "./pages/company/About";
import TermsAndConditions from "./pages/company/Termsconditions";
import PrivacyPolicy from "./pages/company/Privacy";
import ContactUs from "./pages/company/Contactus";
import PredictionPage from "./pages/todoapp/Prediction"; 
import QuizPage from "./pages/todoapp/Quiz";
import Gamepage from "./pages/todoapp/OnlineGame";
import VideoGallery from "./pages/todoapp/VideoGallery";
import NotFound from './pages/notfound/NotFound'; 
import MainLayout from "./components/MainLayout";
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" reverseOrder={false} /> {/* ✅ Add Toaster here */}
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<HomePage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <ChildrenDashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/educationdashboard"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <EducatorDashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/store"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <StoreIntegration />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz"
            element={
              <ProtectedRoute>
                <QuizPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/videos"
            element={
              <ProtectedRoute>
                <VideoGallery />
              </ProtectedRoute>
            }
          />
          <Route
            path="/prediction"
            element={
              <ProtectedRoute>
                <PredictionPage />
              </ProtectedRoute>
            }
          />
           <Route
            path="/game"
            element={
              <ProtectedRoute>
                <Gamepage />
              </ProtectedRoute>
            }
          />
          {/* Public Routes with Navbar */}
          <Route
            path="/about"
            element={
              <MainLayout>
                <About />
              </MainLayout>
            }
          />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/contact-us" element={<ContactUs />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
