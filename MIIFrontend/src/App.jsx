import { BrowserRouter as Router, Routes, Route } from "react-router";
import { AuthProvider } from './context/AuthContext';
import AdminLayout from "./adminDashboard/AdminLayout";
import MentorCoordinatorLayout from "./mentorcoordinatorDashboard/MentorCoordinatorLayout";
import MentorLayout from "./mentorDashboard/MentorLayout";
import MenteeLayout from "./menteeDashboard/MenteeLayout";
import TraineTesting from "./TraineTesting";
import LoginPage from "./login/Nikhil/LoginPage";
import LandingPage from "./LandingPage/LandingPage";
import PrivateRoute from "./context/PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/landingpage" element={<LandingPage />} />
          <Route path="/" element={<TraineTesting />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin/*" element={<PrivateRoute requiredRole="admin"><AdminLayout /></PrivateRoute>} />
          <Route path="/mentorcoordinator/*" element={<PrivateRoute requiredRole="mentorCoordinator"><MentorCoordinatorLayout /></PrivateRoute>} />
          <Route path="/mentor/*" element={<PrivateRoute requiredRole="mentor"><MentorLayout /></PrivateRoute>} />
          <Route path="/mentee/*" element={<PrivateRoute requiredRole="mentee"><MenteeLayout /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
