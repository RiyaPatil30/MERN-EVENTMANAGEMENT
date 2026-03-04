import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import api from "../lib/axios";
import toast from "react-hot-toast";
import EventCard from "../components/EventCard.jsx";
import EventNotFound from "../components/EventNotFound.jsx";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const getEventStatus = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const eventDate = new Date(date);
    eventDate.setHours(0, 0, 0, 0);

    return eventDate >= today ? "Upcoming" : "Completed";
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        const updatedEvents = res.data.map((event) => ({
          ...event,
          status: getEventStatus(event.date),
        }));

        setEvents(updatedEvents);
      } catch (error) {
        console.error("Error fetching events", error);
        toast.error("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events
    .filter((e) => {
      const matchesSearch = e.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory = filterCategory
        ? e.category === filterCategory
        : true;

      const matchesStatus = filterStatus
        ? e.status === filterStatus
        : true;

      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date)
    );

  const categories = [...new Set(events.map((e) => e.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-red-800 to-orange-600">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-900 p-4 rounded-3xl shadow-lg border border-red-700">

          <input
            type="text"
            placeholder="Search by title..."
            className="input input-bordered bg-gray-800 text-yellow-100 border-gray-700 w-full md:w-1/3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="select select-bordered bg-gray-800 text-yellow-100 border-gray-700 w-full md:w-1/4"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            className="select select-bordered bg-gray-800 text-yellow-100 border-gray-700 w-full md:w-1/4"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            className="select select-bordered bg-gray-800 text-yellow-100 border-gray-700 w-full md:w-1/4"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Sort by Date ↑</option>
            <option value="desc">Sort by Date ↓</option>
          </select>

        </div>

  
        {!loading && events.length > 0 && (
          <div className="text-yellow-300 font-semibold text-lg">
            Total Events: {filteredEvents.length}
          </div>
        )}

        {loading && (
          <div className="text-center text-yellow-300 py-10">
            Loading events...
          </div>
        )}

        {!loading && events.length === 0 && <EventNotFound />}

        {!loading && events.length > 0 && filteredEvents.length === 0 && (
          <div className="text-center text-yellow-300 py-10 text-lg font-semibold">
            No matching events found.
          </div>
        )}

        {!loading && filteredEvents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                setEvents={setEvents}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default HomePage;