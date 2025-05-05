import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { Server as IOServer } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  const io = new IOServer(server, {
    path: '/api/socketio',
    cors: {
      origin: '*', // Set appropriate origin in production
    },
  });

  // ✅ Attach to global object
  (global as any).io = io;

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join', (roomId: string) => {
      socket.join(roomId);
    });

    socket.on('sendMessage', (message) => {
      const room = [message.senderId, message.recipientId].sort().join('-');
      socket.to(room).emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  const port = parseInt(process.env.PORT || '3000');
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
