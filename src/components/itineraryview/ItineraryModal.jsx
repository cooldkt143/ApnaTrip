import React from "react";

function ItineraryModal({ isOpen, onClose, itinerary }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#042f2e] rounded-3xl w-11/12 md:w-3/4 lg:w-1/2 p-6 relative shadow-2xl border border-[#0f766e]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-300 hover:text-[#f5d07e] transition-colors"
        >
          ✕
        </button>

        {/* Modal Header */}
        <h2 className="text-2xl font-bold text-center text-[#f5d07e] mb-4 drop-shadow-md">
          Itinerary
        </h2>

        {/* Itinerary Content */}
        <div className="space-y-6 max-h-[70vh] overflow-y-auto">
          {itinerary?.map((dayItem) => (
            <div
              key={dayItem.day}
              className="bg-gradient-to-r from-[#022c22] to-[#0f766e]/30 rounded-2xl p-4 shadow-lg border border-[#0f766e]"
            >
              <h3 className="text-lg font-semibold text-[#f5d07e] mb-2">
                Day {dayItem.day} — {dayItem.city}
              </h3>
              <ul className="list-disc list-inside text-gray-200 space-y-1">
                {dayItem.activities.map((act, i) => (
                  <li key={i} className="hover:text-[#2AF2D0] transition-colors">
                    {act}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ItineraryModal;
