import express from "express";
import cors from "cors";
import { teamRouter, eventRouter, homeRouter, adminRouter } from "./routers.js";

const app = express();

const corsOptions = {
    origin: function (origin, callback) {
        if (process.env.CORS_ORIGIN.split(",").includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};

app.options("*", cors(corsOptions));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use("/api/v1/teams", teamRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/home", homeRouter);
app.use("/api/v1/admin", adminRouter);

export default app;
