import React from "react";
import { Search, Filter } from "lucide-react";

const statusFilters = ["All", "Draft", "Planned", "Completed", "Pinned"];

function TripFilterBar({
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
}) {
  return (
    <div
      className="bg-gradient-to-r from-[#0F3D3A] via-[#0B1F1C] to-[#020617]
                 rounded-2xl p-6 mb-8
                 border border-[#134E4A]
                 shadow-[0_0_25px_rgba(42,242,208,0.08)]"
    >
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2
                       w-5 h-5 text-[#7DDDD3] pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search your trips..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full h-12
                       bg-[#020617] text-gray-200
                       border border-[#134E4A] rounded-xl
                       outline-none
                       placeholder-gray-500
                       transition-all duration-300
                       focus:border-[#2AF2D0]
                       focus:ring-2 focus:ring-[#2AF2D0]/30
                       hover:border-[#2AF2D0]"
          />
        </div>

        {/* Status Dropdown */}
        <div className="relative w-full md:w-56">
          <Filter
            className="absolute left-3 top-1/2 -translate-y-1/2
                       w-5 h-5 text-[#7DDDD3] pointer-events-none"
          />
          <select
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
            className="pl-10 w-full h-12
                       bg-[#020617] text-gray-200
                       border border-[#134E4A] rounded-xl font-medium
                       outline-none
                       transition-all duration-300
                       focus:border-[#2AF2D0]
                       focus:ring-2 focus:ring-[#2AF2D0]/30
                       hover:border-[#2AF2D0]"
          >
            {statusFilters.map((filter) => (
              <option
                key={filter}
                value={filter}
                className="bg-[#020617] text-gray-200"
              >
                {filter}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default TripFilterBar;
