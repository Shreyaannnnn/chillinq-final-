// Importing required modules
const express = require('express');
const cors = require('cors');
const http = require('http');
const cron = require('node-cron');
const { Server } = require("socket.io");

// Importing custom modules
const { connectDatabase, mongooseInstance } = require('./db.config');

const authRouter = require('./src/routes/Auth/auth');
const otpRouter = require('./src/routes/OTP/index');
const userRouter = require('./src/routes/UserData/user');
const communityRouter = require('./src/routes/Community/index');
const chatRouter = require('./src/routes/Chat/index');



const { checkInactiveUsers } = require('./src/middlewares/inactiveUser');
const User = require('./src/modules/User/user');

// Constants
const port = 8080;

// Creating express app
const app = express();

// Enabling CORS
app.use(cors());

// Serving static files
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Creating HTTP server
const server = http.createServer(app);

// Setting up sockets


// Schedule cron job to run at 3am everyday
cron.schedule('0 3 * * *', () => {
  checkInactiveUsers();
}, {
  timezone: 'Asia/Kolkata' // India timezone
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Middleware
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/otp", otpRouter);
app.use("/api/chat", chatRouter);
app.use("/api/community", communityRouter);
// Starting the server after connecting to the database
connectDatabase()
  .then(async () => {

    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });



  // SOCKETS
const io = new Server(server, {
  pingTimeout: 300000 //Ping timeout of 5 minutes to diconnect a user from the socket
});
io.on('connection', (socket) => {
  console.log("Socket activated", socket.id);

  // Set up the user's socket and join the specified room
  socket.on("setup", (userData) => {
    socket.join(userData); // Assuming userData has a userIdproperty
    socket.emit("connected"); // Emit a connected event to the client
    socket.emit('userStatusChanged', { userData, status: 'online' }); // Emit user status change to the client
    console.log("Setup established for user", userData);
  });

  // Join a room using the provided room ID
  socket.on("join room", (room) => {
    socket.join(room); // Join the room
    console.log("User has joined room", room);
    const currentRoom = io.sockets.adapter.rooms.get(room);
    if (currentRoom) {
      console.log("Number of users in room:", currentRoom.size);
    }
  });

  // Message event handler
  socket.on('message', async (data) => {
    console.log("Chat message received", data);
    io.in(data.chatId).emit('message', data); // Emit the message to all users in the chat room
  });

  // Typing event handler
  socket.on('typing', data => {
    socket.to(data.room).emit("typing", data.sender); // Emit typing event to other users in the room
  });

  // Disconnect event handler
  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
    // You might want to handle user disconnection logic here, such as updating user status or leaving rooms
  });
});
