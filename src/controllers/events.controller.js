import { Event } from "../models/event.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const getEventsByType = async (req, res) => {
    const { eventType } = req.params;
    console.log(`Received request for eventType: ${eventType}`);

    try {
        if (!eventType) {
            return res
                .status(400)
                .json(new ApiError(400, "Invalid event type"));
        }

        const eventInfo = await Event.find({ eventType, eventStatus: "past" });
        console.log(`Fetched eventInfo: ${JSON.stringify(eventInfo, null, 2)}`);

        if (eventInfo.length === 0) {
            return res
                .status(404)
                .json(new ApiResponse(404, [], "No Events Found"));
        }

        res.status(200).json(
            new ApiResponse(200, eventInfo, "Data Fetch Successful")
        );
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json(
            new ApiError(500, "Error in Fetching Events Info", [error.message])
        );
    }
};

const getUpcomingEvents = async (req, res) => {
    try {
        const upcomingEvents = await Event.find({ eventStatus: "upcoming" });

        console.log(
            `Fetched upcoming events: ${JSON.stringify(upcomingEvents, null, 2)}`
        );

        if (!upcomingEvents || upcomingEvents.length === 0) {
            console.log("No upcoming events found");
            return res
                .status(404)
                .json(new ApiError(404, "No upcoming events found"));
        }

        res.status(200).json(
            new ApiResponse(
                200,
                upcomingEvents,
                "Upcoming events fetched successfully"
            )
        );
    } catch (error) {
        console.error("Error fetching upcoming events:", error);
        res.status(500).json(
            new ApiError(500, "Error fetching upcoming events", [error])
        );
    }
};

const getMostRecentEvent = async (req, res) => {
    try {
        const mostRecentEvent = await Event.findOne({})
            .sort({ createdAt: -1 })
            .lean();

        if (!mostRecentEvent) {
            console.log("No recent event found");
            return res.status(404).json({
                success: false,
                message: "No recent event found",
            });
        }

        console.log(
            `Fetched most recent event: ${JSON.stringify(mostRecentEvent, null, 2)}`
        );
        res.status(200).json(
            new ApiResponse(
                200,
                mostRecentEvent,
                "Most Recent Event Fetch Successful"
            )
        );
    } catch (error) {
        console.error("Error fetching most recent event:", error);
        res.status(500).json(
            new ApiError(500, "Error in Fetching Most Recent Event Info", [
                error,
            ])
        );
    }
};

export default {
    getEventsByType,
    getUpcomingEvents,
    getMostRecentEvent,
};
