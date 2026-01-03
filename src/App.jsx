import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import MyTrip from "./pages/MyTrip";
<<<<<<< HEAD
import ItineraryView from "./pages/ItineraryView";
=======
import Calender from "./pages/Calender";
import Cities from "./pages/Cities";
import Profile from "./pages/Profile";
>>>>>>> 9708af11cdcdd7a3657925c1860cb7267b718c96

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

<<<<<<< HEAD
        {/* Itinerary View Page */}
        <Route path="/itineraryview" element={<ItineraryView />} />
=======
        {/* Calender Page */}
        <Route path="/calender" element={<Calender />} />

        {/* Cities / Destination Page */}
        <Route path="/cities" element={<Cities />} />

        {/* Profile Page */}
        <Route path="/profile" element={<Profile />} />
>>>>>>> 9708af11cdcdd7a3657925c1860cb7267b718c96

        {/* Catch-all for invalid URLs (optional) */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;