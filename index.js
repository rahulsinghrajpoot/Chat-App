const http = require("http");
const path = require("path");
const express = require("express");

const {Server} = require("socket.io");
const { Socket } = require("dgram");

const app = express();
const PORT = 9000;
const server = http.createServer(app);

const io = new Server(server);


// socket.io

io.on("connection", (socket) => {
    socket.on("user-message", (message) =>{
        console.log("A new User Message", message);
        io.emit("message", message);
    })
})


app.use(express.static(path.resolve("./public")));
app.get("/", (req, res) => {
    return res.sendFile("./public/index.html");
})


server.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));