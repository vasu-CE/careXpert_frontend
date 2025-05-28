import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/ui/shared/Navbar";
import Login from "./components/ui/auth/Login";
import Signup from "./components/ui/auth/Signup";
import HomePage from "./components/ui/pages/HomePage";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
