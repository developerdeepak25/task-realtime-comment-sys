require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");

const loginRoutes = require("./routes/login");
const commentsRoutes = require("./routes/comments");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(bodyParser.json());

app.use("/api", loginRoutes);
app.use("/api", commentsRoutes);

io.on("connection", (socket) => {
  // console.log("Client connected");
  socket.on("new_comment", (comment) => {
    io.emit("new_comment", comment);
  });
});

const PORT = 5000;
server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
