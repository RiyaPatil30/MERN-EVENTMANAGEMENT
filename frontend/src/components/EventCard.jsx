import { Link, useLocation } from "react-router";
import { Calendar, UserCircle, MapPin, Tag, FileText, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../lib/axios";
import { formatData } from "../lib/utils";

const EventCard = ({ event, setEvents }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const location = useLocation();
  const isActive = location.pathname === `/event/${event._id}`;

  const handleDelete = async () => {
    try {
      await api.delete(`/events/${event._id}`);
      setEvents((prev) => prev.filter((e) => e._id !== event._id));
      toast.success("Event deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete event");
    } finally {
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      <Link
        to={`/event/${event._id}`}
        className={`relative block rounded-xl bg-gray-900 text-yellow-100 p-4 border transition-all duration-200 cursor-pointer
          ${isActive ? "border-red-500 shadow-lg" : "border-red-700"} 
          hover:border-yellow-500 hover:shadow-xl min-h-[180px]`}
      >
        <div className="text-gray-400 text-xs break-all mb-2">{event._id}</div>

        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <FileText className="size-4 text-yellow-400" />
            <h3 className="text-lg font-semibold">{event.title}</h3>
          </div>

          <span
            className={`px-2 py-0.5 rounded-full text-sm font-semibold ${
              event.status === "Upcoming"
                ? "bg-green-600 text-green-100"
                : "bg-red-600 text-red-100"
            }`}
          >
            {event.status}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-yellow-200 mb-1">
          <UserCircle className="size-4" /> {event.organizer}
        </div>

        <div className="flex items-center gap-2 text-sm text-yellow-200 mb-1">
          <Calendar className="size-4" /> {formatData(event.date)}
        </div>

        <div className="flex items-center gap-2 text-sm text-yellow-200 mb-1">
          <Tag className="size-4" /> {event.category}
        </div>

        <div className="flex items-center gap-2 text-sm text-yellow-200 mb-1">
          <MapPin className="size-4" /> {event.location}
        </div>

        <div className="flex items-center gap-2 text-sm text-yellow-200 mb-1 truncate">
          <FileText className="size-4" /> {event.description}
        </div>

        <div className="flex justify-end gap-4 mt-2">

          <div className="relative text-2xl hover:text-yellow-400 transition cursor-pointer group">
            <Edit2 />
            <span
              className="absolute -top-10 left-1/2 transform -translate-x-1/2
                         bg-yellow-400 text-gray-900 text-sm px-3 py-1 rounded-lg
                         opacity-0 group-hover:opacity-100 transition-opacity
                         pointer-events-none whitespace-nowrap z-50"> Edit Event
            </span>
          </div>

          <div className="relative text-2xl hover:text-red-400 transition cursor-pointer group">
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowDeleteModal(true);
              }}
              className="relative"
            >
              <Trash2 />
            </button>

            <span
              className="absolute -top-10 left-1/2 transform -translate-x-1/2
                         bg-red-500 text-white text-sm px-3 py-1 rounded-lg
                         opacity-0 group-hover:opacity-100 transition-opacity
                         pointer-events-none whitespace-nowrap z-50">
              Delete Event
            </span>
          </div>

        </div>

        <div className="text-gray-400 text-xs mt-2">
          {formatData(event.updatedAt || event.createdAt)}
        </div>
      </Link>

      {showDeleteModal && (
        <dialog className="modal modal-open">
          <div className="modal-box text-center max-w-md p-6">
            <Trash2 className="mx-auto text-red-500 size-12 mb-4" />
            <h3 className="font-bold text-lg text-yellow-400 mb-2">
              Are you sure you want to delete this event?
            </h3>
            <p className="text-gray-300 mb-4">{event.title}</p>
            <div className="flex justify-center gap-4">
              <button
                className="btn btn-ghost"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-error flex items-center gap-2"
                onClick={handleDelete}
              >
                <Trash2 className="size-4" /> Delete
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default EventCard;