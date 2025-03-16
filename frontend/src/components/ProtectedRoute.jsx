// // ProtectedRoute.jsx
// import { Navigate } from "react-router-dom";
// // Import the ESM build explicitly
// import api from "../api";
// import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
// import { useState, useEffect } from "react";
// import * as jwtDecodeModule from "jwt-decode";

// console.log(jwtDecodeModule);
// // Sometimes you'll see { default: [Function], ... } or something else

// const jwt_decode = jwtDecodeModule.default || jwtDecodeModule;


// function ProtectedRoute({ children }) {
//     console.log("ProtectedRoute is rendering!");
//   const [isAuthorized, setIsAuthorized] = useState(null);

//   useEffect(() => {
//     auth().catch(() => setIsAuthorized(false));
//   }, []);

//   const refreshToken = async () => {
//     const refreshTokenValue = localStorage.getItem(REFRESH_TOKEN);
//     try {
//       const res = await api.post("/api/token/refresh/", {
//         refresh: refreshTokenValue,
//       });
//       if (res.status === 200) {
//         console.log("user is authorized!"); //not hitting this
//         localStorage.setItem(ACCESS_TOKEN, res.data.access);
//         setIsAuthorized(true);
//       } else {
//         console.log("user is not authorized!"); //not hitting this
//         setIsAuthorized(false);
//       }
//     } catch (error) {
//       console.log("Refresh token error:", error); //not hitting this
//       setIsAuthorized(false); 
//     }
//   };

//   const auth = async () => {
//     console.log("In auth!"); //debugging
//     const token = localStorage.getItem(ACCESS_TOKEN);
//     console.log("LS token in ProtectedRoute:", localStorage.getItem("accessToken"));
    
//     if (!token) {
//       console.log("No token!"); //debugging
//       setIsAuthorized(false);
//       return;
//     }
//     let decoded;
//     try {
//       decoded = jwtDecode(token);
//       console.log("Decoded token:", decoded); // debugging
//     } catch (err) {
//       console.error("Failed to decode token:", err);
//       setIsAuthorized(false);
//       return;
//     }
//     console.log("Decoded token:", decoded);
//     if (!decoded.exp) {
//       console.error("Token missing exp claim");
//       setIsAuthorized(false);
//       return;
//     }
//     const tokenExpiration = decoded.exp;
//     const now = Date.now() / 1000;
//     if (tokenExpiration < now) {
//       await refreshToken();
//     } else {
//       console.log("user is authorized!"); //debugging
//       setIsAuthorized(true);
//     }
//   };

//   if (isAuthorized === null) {
//     return <div>Loading...</div>;
//   }

//   return isAuthorized ? children : <Navigate to="/loginform" />;
// }

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";


function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/" />;
}

export default ProtectedRoute;