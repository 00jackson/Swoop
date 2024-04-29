const express = require('express')
const dotenv = require('dotenv')
const { chats } = require("./data/data.js");
const connectDB = require('./config/db.js');
const colors = require('colors');
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { errorHandler, notFound } = require('./middleware/errorMiddleware.js');
const path = require("path");

dotenv.config();
connectDB();
const app = express()



app.use(express.json()); // to accept json request


app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);


const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname1, "/frontend/build")));

    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
    );
} else {
    app.get("/", (req, res) => {
        res.send("API is running..");
    });
}




// handling middlewares
app.use(notFound);
app.use(errorHandler);

// app.get('/api/chat/:id', (req, res) => {
//     // console.log(req);
//     const singleChat = chats.find((c) => c._id === req.params.id);
//     res.send(singleChat);
// });

// app.get('/api/chat', (req, res) => {
//     res.send(chats);
// });

const PORT = process.env.PORT || 4000

const server = app.listen(`${PORT}`, console.log(`listening on port ${PORT}`.yellow.bold));


const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
        // credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io");

    socket.on("setup", (userData) => {
        socket.join(userData._id);
        // console.log(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageReceived) => {
        var chat = newMessageReceived.chat;

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
            if (user._id == newMessageReceived.sender._id) return;

            socket.in(chat._id).emit("message recieved", newMessageReceived);
        });
    });

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
});