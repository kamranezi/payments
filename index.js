const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: ['http://localhost:5173', 'https://sneakers-5c581.firebaseapp.com'],
        methods: ['GET', 'POST'],
    },
});

app.use(cors());

app.use(express.json());

app.post('/your_notification_endpoint', (req, res) => {
    const notificationData = req.body;
    console.log('Received payment success notification:', notificationData);

    // Отправка уведомления на клиент через сокет
    io.emit('paymentSuccess', notificationData);

    res.status(200).send('Notification received successfully');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
