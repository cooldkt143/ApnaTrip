import React, { useState } from "react";
import ItineraryViewCard from "../components/itineraryview/ItineraryViewCard";
import ItineraryModal from "../components/itineraryview/ItineraryModal";
import tripsData from "../data/tripsData.json";
import itineraryData from "../data/itineraryData.json"; // Import detailed itinerary

const ItineraryView = () => {
  const [trips, setTrips] = useState(tripsData);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Delete trip
  const handleDelete = (id) => {
    setTrips(trips.filter((trip) => trip.id !== id));
  };

  // Update trip
  const handleUpdate = (updatedTrip) => {
    setTrips(trips.map((trip) => (trip.id === updatedTrip.id ? updatedTrip : trip)));
  };

  // Open modal with itinerary
  const handleViewItinerary = (trip) => {
    const itinerary = itineraryData[trip.id] || []; // Load detailed itinerary
    setSelectedTrip({ ...trip, itinerary });
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTrip(null);
  };

  return (
    <div className="bg-[#0f332e] min-h-screen py-10 px-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#f5d07e] drop-shadow-lg">
          Your Journey Awaits
        </h1>
        <p className="text-lg text-[#e9f5f1] mt-2">
          Explore the day‑by‑day adventures planned for you
        </p>
      </div>

      {/* Grid of Trip Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {trips.map((trip, index) => (
          <ItineraryViewCard
            key={trip.id}
            trip={trip}
            index={index}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            onViewItinerary={handleViewItinerary}
          />
        ))}
      </div>

      {/* Itinerary Modal */}
      <ItineraryModal
        isOpen={isModalOpen}
        onClose={closeModal}
        itinerary={selectedTrip?.itinerary}
      />
    </div>
  );
};

export default ItineraryView;
