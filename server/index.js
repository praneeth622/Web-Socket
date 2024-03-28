import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';

const PORT = 3000;

const app = express();
const server = createServer(app); 
const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials:true 
    }
}); 

app.use(
    cors({
    origin:"http://localhost:5173",
    methods:["GET","POST"],
    credentials:true
    })
)

io.on("connection", (socket) => {
  console.log("User Connected");
  console.log("User id", socket.id);

  socket.on('message', (msg) => {
    console.log('Received message:', msg);
    io.emit('message', msg); // Broadcast the message to all connected clients
  });
  socket.on('message', (msg) => {
    console.log(`React on ${msg}`);
    io.emit('receive-massage',msg)
  });
});

app.get("/", (req, res) => {
  res.send("You are connected");
});

server.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
