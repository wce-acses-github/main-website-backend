import express from "express";
import eventController from "../controllers/events.controller.js";

const { getEventsByType } = eventController;

const router = express.Router();

router.get("/:eventType", (req, res) => {
    const eventType = req.params.eventType;
    console.log(`GET request received for /events/${eventType}`);
    getEventsByType(req, res);
});

export default router;
