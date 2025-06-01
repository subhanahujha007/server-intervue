import { handleNewPoll, handleSubmitAnswer, handleDisconnect } from '../controllers/index.js';

let ioInstance;
const messages = []; 


const initializeSocket = (io) => {
  ioInstance = io;

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
            socket.on('get-chat-history', () => {
      socket.emit('chat-history', messages);
    });
    socket.on('new-poll', (poll) => handleNewPoll(io, poll));
    socket.on('submit-answer', (data) => handleSubmitAnswer(io, data));
    socket.on('disconnect', () => handleDisconnect(socket));
    socket.on('send-message', ({ sender, message }) => {
      const newMessage = { sender, message, timestamp: Date.now() };
      messages.push(newMessage);
      io.emit('receive-message', newMessage);
    });

  });
};

export default  initializeSocket; 