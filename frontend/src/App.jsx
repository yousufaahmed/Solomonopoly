// Import necessary modules from React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

// Define the App component
function App() {
  return (
    <>
      <div>
        {/* BrowserRouter wraps the entire application for routing */}
        <BrowserRouter>
          <Routes>
            {/* Route definitions for each page */}
            <Route 
              index 
              element={<SplashScreen />} 
            />

            {/* Route for the Login Form page */}
            <Route 
              path="/loginform" 
              element={<LoginForm />} 
            />

            {/* Route for the Sign Up page */}
            <Route 
              path="/signup" 
              element={<SignUp />} 
            />

            {/* Route for the Splash Screen page */}
            <Route 
              path="/splashscreen" 
              element={<SplashScreen />} 
            />

            {/* Route for the Home page */}
            <Route 
              path="/home" 
              element={<Home />} 
            />

            {/* Route for the QR Screen page */}
            <Route 
              path="/qr" 
              element={<QRScreen />} 
            />

            {/* Route for the User Profile page */}
            <Route 
              path="/user" 
              element={<UserProfile />} 
            />

            {/* Route for the Taskboard page */}
            <Route 
              path="/taskboard" 
              element={<Taskboard />} 
            />

            {/* Route for the Leaderboard page */}
            <Route 
              path="/leaderboard" 
              element={<Leaderboard />} 
            />

            {/* Catch-all route for 404 Not Found */}
            <Route 
              path="*" 
              element={<NotFound />} 
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

// Export the App component as the default export
export default App;

  // import react from "react"
  // import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
  // import Login from "./pages/Login"
  // import Register from "./pages/Register"
  // import Home from "./pages/Home"
  // import NotFound from "./pages/NotFound"
  // import ProtectedRoute from "./components/ProtectedRoute"

  // function Logout() {
  //   localStorage.clear()
  //   return <Navigate to="/login" />
  // }

  // function RegisterAndLogout() {
  //   localStorage.clear()
  //   return <Register />
  // }

  // function App() {
  //   return (
  //     <BrowserRouter>
  //       <Routes>
  //         <Route
  //           path="/"
  //           element={
  //             <ProtectedRoute>
  //               <Home />
  //             </ProtectedRoute>
  //           }
  //         />
  //         <Route path="/login" element={<Login />} />
  //         <Route path="/logout" element={<Logout />} />
  //         <Route path="/register" element={<RegisterAndLogout />} />
  //         <Route path="*" element={<NotFound />}></Route>
  //       </Routes>
  //     </BrowserRouter>
  //   )
  // }

  // export default App
