import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import initializeSocket from './socket/socket.js';
import routes from './routes/index.js'
const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

initializeSocket(io);

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
