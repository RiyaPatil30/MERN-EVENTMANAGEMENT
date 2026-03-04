import React from "react";
import react, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { LoaderIcon, Trash2, ArrowLeftIcon } from "lucide-react";

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch event");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await api.delete(`/events/${id}`);
      toast.success("Event deleted successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete event");
    }
  };

  const handleSave = async () => {
    if (!event.title || !event.organizer || !event.date) {
      toast.error("Title, organizer, and date are required");
      return;
    }
    setSaving(true);
    try {
      await api.put(`/events/${id}`, { ...event });
      toast.success("Event updated successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update event");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-red-800 to-orange-600">
        <LoaderIcon className="animate-spin size-10 text-yellow-300" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-red-800 to-orange-600 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="btn btn-ghost text-yellow-300 flex items-center gap-2">
            <ArrowLeftIcon className="size-5" /> Back to Events
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-error btn-outline flex items-center gap-2"
          >
            <Trash2 className="size-5" /> Delete Event
          </button>
        </div>

        <div className="card bg-gray-900 p-6 rounded-3xl shadow-xl text-yellow-100 border border-red-700">
          <div className="space-y-4">
            <div className="form-control">
              <label className="label"><span className="label-text">Title</span></label>
              <input
                type="text"
                className="input input-bordered bg-gray-800 text-yellow-100 border-gray-700"
                value={event.title}
                onChange={(e) => setEvent({ ...event, title: e.target.value })}
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Organizer</span></label>
              <input
                type="text"
                className="input input-bordered bg-gray-800 text-yellow-100 border-gray-700"
                value={event.organizer}
                onChange={(e) => setEvent({ ...event, organizer: e.target.value })}
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Date</span></label>
              <input
                type="date"
                className="input input-bordered bg-gray-800 text-yellow-100 border-gray-700"
                value={event.date.slice(0, 10)}
                onChange={(e) => setEvent({ ...event, date: e.target.value })}
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Category</span></label>
              <input
                type="text"
                className="input input-bordered bg-gray-800 text-yellow-100 border-gray-700"
                value={event.category}
                onChange={(e) => setEvent({ ...event, category: e.target.value })}
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Status</span></label>
              <select
                className="select select-bordered bg-gray-800 text-yellow-100 border-gray-700"
                value={event.status}
                onChange={(e) => setEvent({ ...event, status: e.target.value })}
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Location</span></label>
              <input
                type="text"
                className="input input-bordered bg-gray-800 text-yellow-100 border-gray-700"
                value={event.location}
                onChange={(e) => setEvent({ ...event, location: e.target.value })}
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Description</span></label>
              <textarea
                className="textarea textarea-bordered bg-gray-800 text-yellow-100 border-gray-700"
                value={event.description}
                onChange={(e) => setEvent({ ...event, description: e.target.value })}
              />
            </div>

            <div className="form-control mt-4 flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
                className="btn btn-primary bg-red-600 hover:bg-red-500 text-yellow-100 flex items-center gap-2"
              >
                {saving ? "Saving ..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
