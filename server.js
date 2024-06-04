const express = require('express');
const connectToDatabase = require('./db');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get('/api/orders', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('users');
        const orders = await collection.find({}).toArray();
        res.json(orders);
    } catch (error) {
        console.error('Error retrieving orders:', error);
        res.status(500).json({ error: 'Failed to retrieve orders' });
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});