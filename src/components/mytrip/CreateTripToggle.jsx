import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CreateTripToggle = () => {
  const [open, setOpen] = useState(false);
  const [members, setMembers] = useState(1);
  const [groupType, setGroupType] = useState("");

  return (
    <>
      {/* Create Trip Button */}
      <motion.button
        onClick={() => setOpen((p) => !p)}
        whileTap={{ scale: 0.96 }}
        className="fixed bottom-20 md:bottom-4 right-4 z-50
          flex items-center gap-2 px-5 py-3 rounded-xl shadow-xl
          text-white font-medium"
        style={{
          background: "linear-gradient(135deg, #065f46, #0f766e)",
        }}
      >
        <span className="material-symbols-rounded text-xl">add</span>
        Create Trip
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-36 md:bottom-20 right-4 z-40
              w-[92vw] max-w-[400px] h-[650px]
              rounded-2xl shadow-2xl bg-white overflow-hidden
              flex flex-col"
          >
            {/* Header (fixed height) */}
            <div
              className="px-5 py-4 text-white flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #064e3b, #0f766e)",
              }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Create a Trip</h3>
                <span
                  onClick={() => setOpen(false)}
                  className="material-symbols-rounded cursor-pointer"
                >
                  close
                </span>
              </div>
              <p className="text-sm opacity-90 mt-1">
                Plan your journey, your way
              </p>
            </div>

            {/* Body (scrollable, scrollbar hidden) */}
            <div
              className="flex-1 p-5 space-y-4 overflow-y-auto"
              style={{
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none", // IE
              }}
            >
              {/* Hide scrollbar for Webkit */}
              <style>
                {`
                  .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                  }
                `}
              </style>

              <div className="hide-scrollbar space-y-4">
                {/* Trip Name */}
                <div>
                  <label className="text-sm text-gray-600">Trip Name</label>
                  <input
                    type="text"
                    placeholder="Goa Escape, Himalayan Ride..."
                    className="mt-1 w-full px-4 py-2.5 rounded-lg border
                      border-gray-200 focus:outline-none
                      focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                {/* Destination */}
                <div>
                  <label className="text-sm text-gray-600">Destination</label>
                  <input
                    type="text"
                    placeholder="Search destination"
                    className="mt-1 w-full px-4 py-2.5 rounded-lg border
                      border-gray-200 focus:outline-none
                      focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-gray-600">Start Date</label>
                    <input
                      type="date"
                      className="mt-1 w-full px-3 py-2.5 rounded-lg border
                        border-gray-200 focus:outline-none
                        focus:ring-2 focus:ring-teal-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">End Date</label>
                    <input
                      type="date"
                      className="mt-1 w-full px-3 py-2.5 rounded-lg border
                        border-gray-200 focus:outline-none
                        focus:ring-2 focus:ring-teal-600"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm text-gray-600">Description</label>
                  <textarea
                    rows="3"
                    placeholder="What is this trip about?"
                    className="mt-1 w-full px-4 py-2.5 rounded-lg border
                      border-gray-200 resize-none focus:outline-none
                      focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                {/* Members */}
                <div>
                  <label className="text-sm text-gray-600">
                    Number of Members
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={members}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setMembers(value);
                      if (value === 1) setGroupType("");
                    }}
                    className="mt-1 w-full px-4 py-2.5 rounded-lg border
                      border-gray-200 focus:outline-none
                      focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                {/* Group Type */}
                {members === 1 ? (
                  <div className="text-sm text-teal-700 font-medium">
                    Trip Type: Solo
                  </div>
                ) : (
                  <div>
                    <label className="text-sm text-gray-600">
                      Travelling With
                    </label>
                    <div className="flex gap-3 mt-2">
                      {["Family", "Friends"].map((type) => (
                        <button
                          key={type}
                          onClick={() => setGroupType(type)}
                          className={`flex-1 py-2 rounded-lg border text-sm
                            ${
                              groupType === type
                                ? "bg-teal-600 text-white border-teal-600"
                                : "border-gray-300 text-gray-700"
                            }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Submit */}
                <button
                  className="w-full mt-3 py-3 rounded-xl text-white font-medium shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #0f766e, #065f46)",
                  }}
                >
                  Create Trip
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CreateTripToggle;