// db에 event칸 에 쌓임
const express = require("express");
const multer = require("multer");
const fs = require("fs");

// multer 세팅
const dir = "./images";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
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
router.post("/add", upload.single("eventImage"), createEvent);
// DELETE a event
router.delete("/delete/:id", deleteEvent);
// UPDATE a event
router.put("/update/:id", upload.single("title"), updateEvent);

module.exports = router;
