import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { axiosAuth } from "./api/Axios";
import { AuthContext } from "./context/AuthContext";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import jwt_decode from "jwt-decode";

function App() {
  const { user, refresh } = useContext(AuthContext);
  console.log(user);

  // Refresh the tokens
  axiosAuth.interceptors.request.use(
    async (config) => {
      // console.log("Run interceptor");
      const currDate = new Date();
      if (user) {
        const decodedToken = await jwt_decode(user.accessToken);
        // console.log("Decoded token: " + decodedToken);
        if (decodedToken.exp * 1000 < currDate.getTime()) {
          console.log("refresh");
          const newAccessToken = await refresh();
          // console.log(newAccessToken);
          config.headers["authorization"] = "Bearer " + newAccessToken;
        }
      }
      return config;
    },
    (err) => Promise.reject(err)
  );

  return (
    <div className="bg-gradient min-h-screen">
      <Routes>
        {user && <Route path="/" element={<Home />} />}
        {!user && <Route path="/auth" element={<Auth />} />}
        {<Route path="*" element={<Navigate to={user ? "/" : "/auth"} />} />}
      </Routes>
    </div>
  );
}

export default App;
