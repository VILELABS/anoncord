const io = require('socket.io')(3000)
const express = require('express')
const app = express()
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
const count = io.engine.clientsCount;

const uuid = require("uuid");

io.engine.generateId = () => {
  return uuid.v4(); // session id
}

io.on("connection", (socket) => {
    socket.data.username = "Anon " + io.engine.generateId();
    socket.broadcast.emit("message", "Welcome to the chat, " + socket.data.username);
}); // just a simple greeting

io.engine.on("connection_error", (err) => {
    console.log(err.req);      // the request object
    console.log(err.code);     // the error code, for example 1
    console.log(err.message);  // the error message, for example "Session ID unknown"
    console.log(err.context);  // some additional error context
});

app.listen(5000,() => {
  console.log('Server is running on port 5000')
})
