import React, { useEffect, useState } from 'react';
import bgImage from "../../assets/Background/main_home_bg.jpg"
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <main
      className="w-full min-h-screen bg-cover bg-center pt-0"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Hero Section */}
      <section className="pt-40 pb-28 relative transition-all duration-1000 ease-in-out">
        <div className="container mx-auto px-6 flex flex-col items-center justify-center text-center">
          <div
            className={`max-w-2xl py-20 px-6 rounded-lg transition-all duration-1000 ease-out
              ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
          >
            <p className="text-yellow-600 font-['Brush_Script_MT',cursive] md:text-4xl text-xl mb-2 transition-all duration-1000 pt-20">
              Plan Your Journey, in your Way
            </p>
            <h2 className="text-4xl sm:text-7xl font-['Abril_Fatface'] font-bold text-gray-800 mb-4 transition-all duration-1000 delay-200">
              Apna Trips
            </h2>
            <p className="text-base sm:text-2xl text-gray-800 mb-6 font-medium transition-all duration-1000 delay-400">
              <b>
                You tired of dull trips?<br />
                We have something exciting just for you!<br />
                Apna Trip helps you design clear, personalized travel plans without the stress.<br />
                Create multi-city itineraries, manage dates and activities, track budgets, and visualize your journey in one simple platform. From idea to itinerary, everything stays organized and in your control.
              </b>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Main;