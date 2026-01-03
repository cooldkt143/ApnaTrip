import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCompass } from "react-icons/fa";
import TripFilterBar from "../components/mytrip/TripFilterBar";
import TripCard from "../components/mytrip/TripCard";
import tripsData from "../data/tripsData.json";

const MyTrip = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredTrips = tripsData.filter((trip) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Pinned") return trip.pinned;
    return trip.status === activeFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#134E4A] via-[#0F3D3A] to-[#020617] text-white px-6 py-10">

      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-[#f5d07e] flex items-center justify-center gap-3">
          <FaCompass className="text-[#f5d07e]" />
          Your Travel Creations
        </h1>

        <p className="text-gray-300 mt-2 max-w-xl mx-auto">
          Trips you designed, planned, and owned. Discover your adventures at a glance.
        </p>
      </div>

      {/* Filters */}
      <TripFilterBar
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      {/* Trips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredTrips.length > 0 ? (
          filteredTrips.map((trip, index) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TripCard trip={trip} index={index} />
            </motion.div>
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center">
            No trips found.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyTrip;