import Event from "../models/eventModel.js";

export async function getAllEvents(req, res) {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (error) {
    console.error("Error in getAllEvents", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getEventById(req, res) {
  try {
    const event = await Event.findById(req.params.id);
    if (!event)
    return res.status(404).json({ message: "Event not found" });
    res.status(200).json(event);
  } catch (error) {
    console.error("Error in getEventById", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createEvent(req, res) {
  try {
    const {title, description, date, location, category, organizer, status } = req.body;
    if (!title || !description || !date || !location || !category || !organizer || !status
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const event = new Event({title, description, date, location, category, organizer, status });
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error("Error in createEvent", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateEvent(req, res) {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEvent)
      return res.status(404).json({ message: "Event not found" });

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("Error in updateEvent", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function deleteEvent(req, res) {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent)
      return res.status(404).json({ message: "Event not found" });

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error in deleteEvent", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
