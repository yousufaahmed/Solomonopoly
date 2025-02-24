  import { BrowserRouter, Routes, Route } from "react-router-dom"
  import SplashScreen from "./pages/Splash"
  import LoginForm from "./pages/LoginForm"
  import SignUp from "./pages/SignUp"
  import Home from "./pages/Home"
  import NotFound from "./pages/NotFound"
  import QRScreen from "./pages/QRScreen"
  import UserProfile from "./pages/UserProfile"
  import Taskboard from "./pages/Taskboard"
  import Leaderboard from "./pages/Leaderboard"

  function App() {
    return (
    <>
    <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<SplashScreen/>}/>
            <Route path="/loginform" element={<LoginForm/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/splashscreen" element={<SplashScreen/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/qr" element={<QRScreen/>}/>
            <Route path="/user" element={<UserProfile/>}/>
            <Route path="/taskboard" element={<Taskboard/>}/>
            <Route path="/leaderboard" element={<Leaderboard/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </BrowserRouter>
      </div>
      </>
    );
  }

  export default App;