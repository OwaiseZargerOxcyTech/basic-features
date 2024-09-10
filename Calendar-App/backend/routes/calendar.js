const express = require("express");
const router = express.Router();
const calendarController = require("../controllers/calendarController");

router.post("/create-event", calendarController.createEvent);
router.get("/events/:id", calendarController.getEvents);
router.get("/event/:id", calendarController.getEvent);
router.patch("/event/:id", calendarController.editEvent);
router.delete("/event/:id", calendarController.deleteEvent);

module.exports = router;
