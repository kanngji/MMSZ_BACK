// db에 event칸 에 쌓임
const express = require("express");
const {
  createEvent,
  getEvent,
  getEvents,
  deleteEvent,
  updateEvent,
} = require("../controllers/eventController");
const router = express.Router();

// GET all events
router.get("/", getEvents);

// GET a single event
router.get("/:id", getEvent);
// POST a new event
router.post("/", createEvent);
// DELETE a event
router.delete("/:id", deleteEvent);
// UPDATE a event
router.patch("/:id", updateEvent);

module.exports = router;
