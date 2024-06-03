const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./db');

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get('/api/orders', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('users');
        const users = await collection.find({}).toArray();
        res.json(users);
    } catch (error) {
        console.error('Ошибка при получении заказов:', error);
        res.status(500).send('Ошибка при получении заказов');
    }
});

app.post('/api/orders/update-status', async (req, res) => {
    const { telegramId, orderId, newStatus } = req.body;
    try {
        const db = await connectToDatabase();
        const collection = db.collection('users');
        await collection.updateOne(
            { telegramId: telegramId, 'orders.orderId': orderId },
            { $set: { 'orders.$.status': newStatus } }
        );
        res.status(200).send('Статус заказа обновлен');
    } catch (error) {
        console.error('Ошибка при обновлении статуса заказа:', error);
        res.status(500).send('Ошибка при обновлении статуса заказа');
    }
});

app.listen(port,  () => {
    console.log(`Сервер запущен на порту ${port}`);
});