import React, { useEffect, useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

const PopularTour = ({ popularTours }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 sec
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % popularTours.length);
    }, 5000);
    return () => clearInterval(id);
  }, [popularTours.length]);

  return (
    <section className="bg-[#2e5254] min-h-[50vh] flex items-center py-16">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center lg:items-start gap-12">
        {/* -------- Left Text -------- */}
        <div className="lg:w-1/2 text-white space-y-4">
          <p className="text-xl lg:text-4xl font-['Brush_Script_MT',cursive] text-yellow-600 pt-5">
            Featured Tours
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold font-['Abril_Fatface'] text-white">
            Most Popular Tours
          </h2>
            <p className="text-base lg:text-lg text-gray-200">
              Discover destinations that travelers truly love, where adventure, comfort, and culture come together seamlessly. 
              Each destination featured here is carefully chosen for its unique character, breathtaking landscapes, and the 
              unforgettable experiences it offers. From iconic landmarks and vibrant cities to peaceful escapes and hidden gems, 
              these places invite you to explore the world with curiosity and confidence.
            </p>

            <p className="text-base lg:text-lg text-gray-200">
              Every journey is designed to feel both exciting and effortless. Whether you’re wandering through historic streets, 
              soaking in scenic views, or experiencing local traditions and flavors, these destinations provide a perfect balance 
              of exploration and relaxation. Thoughtfully curated for quality and authenticity, they offer memorable moments that 
              suit solo travelers, couples, families, and groups alike.
            </p>

            <p className="text-base lg:text-lg text-gray-200">
              More than just places on a map, these popular destinations are experiences that stay with you long after the trip ends. 
              They encourage discovery, connection, and a deeper appreciation of the world, making every journey feel meaningful, 
              enjoyable, and truly worth remembering.
            </p>
        </div>

        {/* -------- Right White Box -------- */}
        <div className="lg:w-1/2 pt-10 ">
          <div className="relative w-[350px] sm:w-[400px] md:w-[450px] lg:w-[700px] aspect-[4/3] bg-white rounded-2xl shadow-xl overflow-hidden mx-auto">
            {popularTours.map((tour, i) => (
              <div
                key={i}
                className={`absolute inset-0 p-4 transition-all duration-700 ease-in-out ${
                  i === currentIndex
                    ? "opacity-100 scale-100 z-10"
                    : "opacity-0 scale-95 z-0"
                }`}
              >
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-2/3 object-cover"
                />

                {/* --- Tour Info --- */}
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, star) =>
                        star < tour.rating ? (
                          <FaStar key={star} />
                        ) : (
                          <FaRegStar key={star} />
                        )
                      )}
                    </div>
                    <span className="text-gray-500 text-sm">(2)</span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800">
                    {tour.title}
                  </h3>
                  <span className="text-gray-500 text-sm">{tour.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularTour;
