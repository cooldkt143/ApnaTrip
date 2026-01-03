import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Mountain, Waves, TreePalm, Tent, Heart } from "lucide-react";

// Data
import destinationsData from "../../data/destinations.json";
import scrollCardData from "../../data/scrollcard.json";

// Category configuration
const categoryData = {
  all: { icon: Filter, color: "from-gray-500 to-gray-600", label: "All Destinations" },
  mountains: { icon: Mountain, color: "from-indigo-500 to-blue-500", label: "Mountains" },
  lakes: { icon: Waves, color: "from-cyan-500 to-sky-500", label: "Lakes" },
  beaches: { icon: TreePalm, color: "from-yellow-500 to-orange-500", label: "Beaches" },
  picnic: { icon: Tent, color: "from-green-500 to-emerald-500", label: "Picnic Spots" }, // ✅ Fixed here
};

function Body({ activePage, setActivePage }) {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [likedDestinations, setLikedDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollInterval = useRef(null);

  // Load destinations
  useEffect(() => {
    setDestinations(destinationsData);
    setIsLoading(false);
  }, []);

  // Auto-scroll top banner
  useEffect(() => {
    scrollInterval.current = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === scrollCardData.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(scrollInterval.current);
  }, []);

  // Filter logic
  const applyFilters = useCallback(() => {
    let filtered = [...destinations];

    if (activeCategory !== "all") {
      const label = categoryData[activeCategory]?.label;
      filtered = filtered.filter((d) =>
        d.category?.toLowerCase().includes(label?.toLowerCase())
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (d) =>
          d.title.toLowerCase().includes(query) ||
          d.subtitle?.toLowerCase().includes(query) ||
          d.category?.toLowerCase().includes(query)
      );
    }

    setFilteredDestinations(filtered);
  }, [destinations, activeCategory, searchQuery]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const toggleDestinationLike = (index) => {
    setLikedDestinations((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="w-full min-h-screen bg-gray-300">

      {/* Page Content */}
      <div className="pt-20 px-4 sm:px-8 lg:px-12 bg-gray-400">
        {/* Auto-Scrolling Banner */}
        <div className="relative w-full h-[250px] sm:h-[350px] lg:h-[400px] rounded-2xl overflow-hidden mb-12">
          <img
            src={scrollCardData[currentIndex]?.img}
            alt={scrollCardData[currentIndex]?.alt || "banner"}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <motion.h2
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl lg:text-5xl text-white font-bold text-center"
            >
              {scrollCardData[currentIndex]?.title || "Explore the World"}
            </motion.h2>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Discover Destinations</h1>
          <p className="text-lg text-gray-600 mt-2">
            Explore beautiful places across India with ease
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {Object.entries(categoryData).map(([category, data]) => {
            const Icon = data.icon;
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl shadow
                bg-gradient-to-br ${data.color} text-white transition transform hover:scale-105
                ${isActive ? "ring-4 ring-offset-2 ring-orange-400" : ""}`}
              >
                <Icon className="w-8 h-8 mb-2" />
                <span className="text-sm font-semibold text-center">
                  {data.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-10">
          <div className="relative w-full"> {/* Removed sm:w-1/2 */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destinations..."
              className="w-full border border-gray-300 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <Search className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Results Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {activeCategory === "all"
                ? "All Destinations"
                : categoryData[activeCategory]?.label}
            </h2>
            <p className="text-gray-500">{filteredDestinations.length} results</p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-xl" />
                ))}
            </div>
          ) : filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              <AnimatePresence>
                {filteredDestinations.map((place, index) => (
                  <motion.div
                    key={place.id || index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.4 }}
                    className="relative bg-white rounded-xl shadow hover:shadow-lg overflow-hidden"
                  >
                    <img
                      src={place.img}
                      alt={place.alt}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                    <button
                      onClick={() => toggleDestinationLike(index)}
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow hover:bg-red-100"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          likedDestinations.includes(index)
                            ? "text-red-500"
                            : "text-gray-400"
                        }`}
                      />
                    </button>
                    <div className="p-4">
                      <p className="text-sm text-gray-500">{place.subtitle}</p>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {place.title}
                      </h3>
                      <a
                        href={`/destination/${place.id || index}`}
                        className="mt-2 inline-block text-orange-500 hover:underline"
                      >
                        Read more →
                      </a>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                No Results Found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or categories
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Body;
