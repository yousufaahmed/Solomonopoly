//*Written by Mohammed Zarrar Shahid and Aleem-Deen Abbas Hussein*//
// Import necessary modules from React Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import all the page components for routing
import SplashScreen from "./pages/Splash";
import LoginForm from "./pages/LoginForm";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import QRScreen from "./pages/QRScreen";
import UserProfile from "./pages/UserProfile";
import Taskboard from "./pages/Taskboard";
import Leaderboard from "./pages/Leaderboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ResetPwd from "./pages/ResetPassword";
import Store from "./pages/Store";

// Define the App component
function App() {

  function Logout() {
    localStorage.clear()
    return <Navigate to="/" />
  }

  function RegisterAndLogout() {
    localStorage.clear()
    return <SignUp />
  }

  return (
    <>
      <div>
        {/* BrowserRouter wraps the entire application for routing */}
        <BrowserRouter>
          {/* Routes component contains all the Route components */}
          <Routes>

            {/* Redirect "/" to "/home" */}
            <Route path="/" element={<Navigate to="/home" replace />} />

            <Route path="/home" element={<Home />} />

            {/* Route for the Login Form page */}
            <Route 
              path="/loginform" 
              element={<LoginForm />} 
            />

            {/* Route for the Sign Up page */}
            <Route 
              path="/signup" 
              element={<RegisterAndLogout />} 
            />

            {/* Route for the Sign Up page */}
            <Route 
              path="/reset" 
              element={<ResetPwd />} 
            />

            {/* Route for the QR Screen page */}
            <Route 
              path="/qr" 
              element={
                <ProtectedRoute>
                  <QRScreen />
                </ProtectedRoute>
              } 
            />

            {/* Route for the QR Screen page */}
            <Route 
              path="/inventory" 
              element={
                <ProtectedRoute>
                  <Inventory />
                </ProtectedRoute>
              } 
            />

            {/* Route for the User Profile page */}
            <Route 
              path="/user" 
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              } 
            />

            {/* Route for the Taskboard page */}
            <Route 
              path="/taskboard" 
              element={
                <ProtectedRoute>
                  <Taskboard />
                </ProtectedRoute>
              } 
            />

            {/* Route for the Leaderboard page */}
            <Route 
              path="/leaderboard" 
              element={
                <ProtectedRoute>
                  <Leaderboard />
                </ProtectedRoute>
              } 
            />

            {/* Route for the Leaderboard page */}
            <Route 
              path="/store" 
              element={
                <ProtectedRoute>
                  <Store />
                </ProtectedRoute>
              } 
            />

            {/* Catch-all route for 404 Not Found */}
            <Route 
              path="*" 
              element={<NotFound />} 
            />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

// Export the App component as the default export
export default App;