//*Written by Mohammed Zarrar Shahid and Aleem-Deen Abbas Hussein and Yousuf Ahmed*//
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
import Inventory from "./pages/Inventory"
import Map from "./pages/Map"
import Terms from "./pages/TermsAndConditions"
import Pack_Opening from "./pages/PackOpening"
import UserForm from "./pages/UserForm"
import Achievements from "./pages/Achievements"


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

            {/* Route for the T&C page */}
            <Route 
              path="/Terms" 
              element={<Terms />} 
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

            {/* Route for the Inventory page */}
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

            {/* Route for the User Form page */}
            <Route 
              path="/UserForm" 
              element={
                  <UserForm />
              } 
            />

            {/* Route for the Store page */}
            <Route 
              path="/store" 
              element={
                <ProtectedRoute>
                  <Store />
                </ProtectedRoute>
              } 
            />

            {/* Route for the Achievements page */}
            <Route 
              path="/achievements" 
              element={
                <ProtectedRoute>
                  <Achievements />
                </ProtectedRoute>
              } 
            />

            {/* Route for the Map page */}
            <Route 
              path="/map" 
              element={
                <ProtectedRoute>
                  <Map />
                </ProtectedRoute>
              } 
            />

            {/* Route for the Pack Opening Animation */}
            <Route 
              path="/packopening" 
              element={
                <ProtectedRoute>
                  <Pack_Opening />
                </ProtectedRoute>
              } 
            />

            {/* Catch-all route for 404 Not Found */}
            <Route 
              path="*" 
              element={<NotFound />} 
            />
            <Route path="/logout" element={<Logout />} />
            <Route path="/login" element={<Navigate to="/loginform" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

// Export the App component as the default export
export default App;