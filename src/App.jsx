import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import QuizPage from "./pages/todoapp/Quiz";
import NotFound from './pages/notfound/NotFound'; 
import MainLayout from "./components/MainLayout";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<HomePage />} />

        {/* Routes with Navbar */}
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <ChildrenDashboard />
            </MainLayout>
          }
        />
        <Route
          path="/educationdashboard"
          element={
            <MainLayout>
              <EducatorDashboard />
            </MainLayout>
          }
        />
        <Route
          path="/store"
          element={
            <MainLayout>
              <StoreIntegration />
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              <About />
            </MainLayout>
          }
        />
        <Route
          path="/terms-and-conditions"
          element={
              <TermsAndConditions />
          }
        />
        <Route
          path="/privacy"
          element={
              <PrivacyPolicy />
          }
        />
        <Route
          path="/contact-us"
          element={
              <ContactUs />
          }
        />
        <Route
          path="/quiz"
          element={
              <QuizPage />
          }
        />
        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
