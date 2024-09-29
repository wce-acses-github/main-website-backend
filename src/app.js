import express from "express";
import cors from "cors";
import { teamRouter, eventRouter, homeRouter, adminRouter } from "./routers.js";

const app = express();

// CORS options for a single origin
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigin = process.env.CORS_ORIGIN;  // Single origin

        if (origin === allowedOrigin || !origin) {  // Allow requests from the specified origin or server-to-server requests
            callback(null, true);  // Allow the request
        } else {
            console.error(`Blocked by CORS: ${origin}`);  // Log the blocked origin
            callback(new Error("Not allowed by CORS"));  // Block the request
        }
    },
    credentials: true,  // Allow cookies to be sent and received
};

// Apply CORS middleware globally
app.use(cors(corsOptions));

// Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));

// Routes
app.use("/api/v1/teams", teamRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/home", homeRouter);
app.use("/api/v1/admin", adminRouter);

export default app;
