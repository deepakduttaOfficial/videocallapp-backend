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
io.on("connection", (socket) => {
  socket.emit("me", socket.id);
  socket.on("disconnect", () => {
    socket.broadcast.emit("callended");
  });

  socket.on("calluser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall.emit("calluser", { signal: signalData, from, name }));
  });
  socket.on("answercall", (data) => {
    io.to(data.to).emit("callaccepted", data.signal);
  });
});

export default httpServer;
