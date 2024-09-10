import express from "express";
import homeController from "../controllers/home.controller.js";
import eventsController from "../controllers/events.controller.js";

const { getAllGuides, contactUs } = homeController;
const { getUpcomingEvents, getMostRecentEvent } = eventsController;

const router = express.Router();

router.get("/guides", (req, res) => {
    console.log("GET request received for /home/guides");
    getAllGuides(req, res);
});

router.post("/contact", (req, res) => {
    console.log("POST request received for /home/contact");
    contactUs(req, res);
});

router.get("/upcoming", (req, res) => {
    console.log("GET request received for /events/upcoming");
    getUpcomingEvents(req, res);
});
router.get("/most-recent", (req, res) => {
    console.log("GET request received for /events/most-recent");
    getMostRecentEvent(req, res);
});

export default router;
