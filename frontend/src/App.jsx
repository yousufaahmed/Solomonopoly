import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/Splash"
import LoginForm from "./pages/LoginForm"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"

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
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;
