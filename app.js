import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
// All routes
import video from "./routes/video.route.js";

// App version
const version = "v1";

const app = express();

// Node server
const httpServer = createServer(app);

// Middle ware
app.use(cors());

// Socket io server
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Socket io connection
io.on("connection", (socket) => {});

// router middle ware
app.use(`/api/${version}`, video);

export default httpServer;
