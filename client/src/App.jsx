import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Routes>
        {user && <Route path="/" element={<Home />} />}
        {!user && <Route path="/auth" element={<Auth />} />}
        {<Route path="*" element={<Navigate to={user ? "/" : "/auth"} />} />}
      </Routes>
    </>
  );
}

export default App;
