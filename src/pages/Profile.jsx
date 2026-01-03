import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

// Images
import post2 from "../assets/images/post2.jfif";
import post3 from "../assets/images/post3.jfif";
import post4 from "../assets/images/post4.jfif";
import post1 from "../assets/images/post1.jfif";
import post5 from "../assets/images/post5.jfif";
import post6 from "../assets/images/post6.jfif";

export default function Profile() {
  const [activeTab, setActiveTab] = useState(null); // null = show nothing initially
  const [modalImage, setModalImage] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // Auth check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const logoutHandler = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const myTripImages = [post2, post3, post4, post1, post5, post6];

  if (!user) return null;

  const profilePhoto = user.photoURL || "https://via.placeholder.com/150";

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* ================= LEFT SIDEBAR ================= */}
      <aside className="w-72 bg-white border-r flex flex-col justify-between p-5">

        {/* Profile Info */}
        <div>
          <div className="flex flex-col items-center text-center">
            <img
              src={profilePhoto}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border"
            />
            <h2 className="mt-3 text-xl font-bold">
              {user.displayName || "User"}
            </h2>
            <p className="text-gray-500 text-sm">
              {user.email}
            </p>
          </div>

          {/* Menu Buttons */}
          <div className="mt-10 space-y-4">
            <button
              onClick={() => setActiveTab("myTrips")}
              className={`w-full py-3 rounded-lg text-lg font-semibold ${
                activeTab === "myTrips"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              My Trips
            </button>

            <button
              onClick={() => setActiveTab("history")}
              className={`w-full py-3 rounded-lg text-lg font-semibold ${
                activeTab === "history"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              History
            </button>
          </div>
        </div>

        {/* Logout Button (Bottom) */}
        <button
          onClick={logoutHandler}
          className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg text-lg font-semibold"
        >
          Logout
        </button>
      </aside>

      {/* ================= RIGHT CONTENT ================= */}
      <main className="flex-1 p-8 overflow-y-auto">

        {/* Initially Empty */}
        {!activeTab && (
          <div className="h-full flex items-center justify-center text-gray-400 text-xl">
            Select an option from the sidebar
          </div>
        )}

        {/* My Trips */}
        {activeTab === "myTrips" && (
          <>
            <h1 className="text-2xl font-bold mb-6">My Trips</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {myTripImages.map((img, index) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden shadow cursor-pointer"
                  onClick={() => setModalImage(img)}
                >
                  <img
                    src={img}
                    alt={`Trip ${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {/* History */}
        {activeTab === "history" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">History</h1>
            <p className="text-gray-500 text-lg">
              No history available yet.
            </p>
          </div>
        )}
      </main>

      {/* ================= IMAGE MODAL ================= */}
      {modalImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <span
            className="absolute top-5 right-10 text-white text-4xl cursor-pointer"
            onClick={() => setModalImage(null)}
          >
            &times;
          </span>
          <img src={modalImage} alt="Preview" className="max-w-4xl w-full" />
        </div>
      )}
    </div>
  );
}