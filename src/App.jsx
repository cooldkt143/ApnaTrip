import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Calender from "./pages/Calender";
import Cities from "./pages/Cities";
import Profile from "./pages/Profile";
import ItineraryView from "./pages/ItineraryView";
import MyTrip from "./pages/MyTrip";

function App() {
  return (
    <Router>
      <Routes>
        {/* Root / Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Login Signup Page */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Home Page */}
        <Route path="/home" element={<Home />} />

        {/* My Trip Page */}
        <Route path="/mytrip" element={<MyTrip />} />

        {/* Calender Page */}
        <Route path="/calender" element={<Calender />} />

        {/* Cities / Destination Page */}
        <Route path="/cities" element={<Cities />} />

        {/* Profile Page */}
        <Route path="/profile" element={<Profile />} />

        {/* Itinerary View Page */}
        <Route path="/itineraryview" element={<ItineraryView />} />

        {/* Catch-all for invalid URLs (optional) */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;