import { motion } from "framer-motion";
import { MapPin, Clock, Star, Calendar } from "lucide-react";
import { FaEdit, FaTrash, FaEye, FaSave } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TripCard({ trip, index, onDelete, onUpdate }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTrip, setEditedTrip] = useState({ ...trip });

  const handleView = () => {
    if (!isEditing) navigate(`/trips/${trip.id}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete?.(trip.id);
  };

  const handleSave = (e) => {
    e.stopPropagation();
    onUpdate?.(editedTrip);
    setIsEditing(false);
  };

  const togglePinned = (e) => {
    e.stopPropagation();
    const updated = { ...editedTrip, pinned: !editedTrip.pinned };
    setEditedTrip(updated);
    if (!isEditing) onUpdate?.(updated);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="h-full"
    >
      <div
        onClick={handleView}
        className="relative h-full bg-[#042f2e] rounded-2xl
        border border-[#0f766e]
        hover:border-[#f5d07e]
        shadow-lg hover:shadow-2xl
        transition-all duration-300
        group cursor-pointer overflow-hidden"
      >
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={editedTrip.image || "https://via.placeholder.com/600x400?text=Trip+Image"}
            alt={editedTrip.name}
            className="w-full h-64 object-cover
            group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Pin */}
          <button
            onClick={togglePinned}
            className="absolute top-4 right-4 z-10"
          >
            <Star
              className={`w-5 h-5 transition ${
                editedTrip.pinned
                  ? "text-[#f5d07e] fill-[#f5d07e]"
                  : "text-gray-300 hover:text-[#f5d07e]"
              }`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 text-white">
          {/* Created */}
          <div className="flex items-center text-[11px] text-gray-300 mb-1">
            <Clock className="w-3.5 h-3.5 mr-1 text-[#f5d07e]" />
            Created on {trip.createdOn}
          </div>

          {/* Title */}
          {isEditing ? (
            <input
              value={editedTrip.name}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) =>
                setEditedTrip({ ...editedTrip, name: e.target.value })
              }
              className="w-full bg-[#022c22] text-white border border-[#0f766e]
              rounded-md px-3 py-1.5 mb-1 outline-none
              focus:border-[#f5d07e]"
            />
          ) : (
            <h3 className="text-lg font-semibold text-[#f5d07e] mb-0.5">
              {editedTrip.name}
            </h3>
          )}

          {/* Dates */}
          <div className="flex items-center text-xs text-gray-200 gap-3 mb-2">
            <Calendar className="w-3.5 h-3.5 text-[#f5d07e]" />
            {isEditing ? (
              <>
                <input
                  type="date"
                  value={editedTrip.startDate}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) =>
                    setEditedTrip({ ...editedTrip, startDate: e.target.value })
                  }
                  className="bg-[#022c22] text-white border border-[#0f766e]
                  rounded px-2 py-0.5 text-[11px]"
                />
                <span>→</span>
                <input
                  type="date"
                  value={editedTrip.endDate}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) =>
                    setEditedTrip({ ...editedTrip, endDate: e.target.value })
                  }
                  className="bg-[#022c22] text-white border border-[#0f766e]
                  rounded px-2 py-0.5 text-[11px]"
                />
              </>
            ) : (
              <span>
                {editedTrip.startDate} → {editedTrip.endDate}
              </span>
            )}
          </div>

          {/* Destinations */}
          <div className="flex items-center text-xs text-gray-200 mb-2">
            <MapPin className="w-3.5 h-3.5 text-[#f5d07e] mr-1" />
            {editedTrip.destinations.join(" → ")}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {[editedTrip.status, editedTrip.effort, editedTrip.type].map(
              (tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 text-[11px] rounded-full
                  bg-[#022c22] border border-[#0f766e]
                  text-gray-200"
                >
                  {tag}
                </span>
              )
            )}
          </div>

          {/* Notes */}
          <p className="text-xs text-gray-300 italic mb-3 line-clamp-2">
            {editedTrip.notes}
          </p>

          {/* Progress */}
          <div className="mb-3">
            <div className="flex justify-between text-[11px] text-gray-300 mb-1">
              <span>Trip completeness</span>
              <span>{editedTrip.progress}%</span>
            </div>
            <div className="h-1.5 bg-[#022c22] rounded-full">
              <div
                className="h-1.5 rounded-full bg-gradient-to-r
                from-[#166534] to-[#f5d07e]"
                style={{ width: `${editedTrip.progress}%` }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 text-base opacity-80 group-hover:opacity-100 transition">
            {isEditing ? (
              <FaSave
                onClick={handleSave}
                className="cursor-pointer text-[#f5d07e]"
              />
            ) : (
              <FaEdit
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
                className="cursor-pointer hover:text-[#f5d07e]"
              />
            )}
            <FaTrash
              onClick={handleDelete}
              className="cursor-pointer hover:text-red-400"
            />
            <FaEye
              onClick={(e) => {
                e.stopPropagation();
                handleView();
              }}
              className="cursor-pointer hover:text-[#f5d07e]"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default TripCard;