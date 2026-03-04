import React from "react";
import react, { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon } from "lucide-react";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Upcoming");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/events", {
        title,
        organizer,
        date,
        category,
        status,
        description,
        location,
      });
      toast.success("Event created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating event", error);
      toast.error("Failed to create event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-red-800 to-orange-600 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <Link
          to="/"
          className="btn btn-ghost mb-6 flex items-center gap-2 text-yellow-300"
        >
          <ArrowLeftIcon className="size-5" /> Back to Events
        </Link>

        <div className="bg-gray-900 shadow-2xl rounded-3xl p-8 space-y-6 border border-red-700">
          <h2 className="text-3xl font-bold text-yellow-400 mb-6">
            Create New Event
          </h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-yellow-300 font-semibold">Title</span>
              </label>
              <input
                type="text"
                placeholder="Enter event title"
                className="input input-bordered "
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-yellow-300 font-semibold">Organizer</span>
              </label>
              <input
                type="text"
                placeholder="Enter organizer name"
                className="input input-bordered "
                value={organizer}
                onChange={(e) => setOrganizer(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-yellow-300 font-semibold">Date</span>
              </label>
              <input
                type="date"
                className="input input-bordered"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-yellow-300 font-semibold">Category</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Conference, Meetup"
                className="input input-bordered"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text text-yellow-300 font-semibold">Status</span>
              </label>
              <select
                className="select select-bordered "
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text text-yellow-300 font-semibold">Description</span>
              </label>
              <textarea
                placeholder="Describe the event..."
                className="textarea textarea-bordered "
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text text-yellow-300 font-semibold">Location</span>
              </label>
              <input
                type="text"
                placeholder="Event location"
                className="input input-bordered "
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="btn bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-xl"
                disabled={loading}
              >
                {loading ? "Creating ..." : "Create Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
