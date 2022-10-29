const Event = require("../models/eventModel");
const { mongoose } = require("mongoose");

// get all events
const getEvents = async (req, res) => {
  const events = await Event.find({}).sort({ createdAt: -1 });
  res.status(200).json(events);
};

// get a single event
const getEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValeid(id)) {
    return res.status(404).json({ error: "No such event" });
  }
  const event = await Event.findById(id);

  if (!event) {
    return res.status(404).json({ error: "No such event" });
  }

  res.status(200).json(event);
};

// create a new event
const createEvent = async (req, res) => {
  const { brandname, title, content, postDate } = req.body;

  // add doc to db
  try {
    const event = await Event.create({
      brandname,
      title,
      content,
      postDate,
      eventImage: req.file.eventImage,
    });
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a event
const deleteEvent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such event" });
  }

  const event = await Event.findOneAndDelete({ _id: id });

  if (!event) {
    return res.status(404).json({ error: "No such event" });
  }
  res.status(200).json(event);
};

// update a event
const updateEvent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such event" });
  }
  const event = await Event.findOneAndUpdate(
    {
      _id: id,
    },
    { ...req.body }
  );
  if (!event) {
    return res.status(404).json({ error: "No such board" });
  }
  res.status(200).json(event);
};

module.exports = {
  createEvent,
  getEvent,
  getEvents,
  deleteEvent,
  updateEvent,
};
