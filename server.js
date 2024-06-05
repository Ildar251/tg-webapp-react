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

bot.post('/api/orders/update-status', async (ctx) => {
    const { telegramId, orderId, newStatus } = ctx.body;
    try {
        const db = await connectToDatabase();
        const collection = db.collection('users');

        const user = await collection.findOne({
            telegramId: parseInt(telegramId, 10),
            'orders.orderId': orderId
        });

        if (!user) {
            return ctx.status(404).send('Order not found');
        }

        await collection.updateOne(
            { telegramId: parseInt(telegramId, 10), 'orders.orderId': orderId },
            { $set: { 'orders.$.status': newStatus } }
        );

        if (newStatus === "Выполнен" && user.referrerId) {
            const referrer = await collection.findOne({ telegramId: user.referrerId });
            if (referrer && !referrer.friends.includes(user.telegramId)) {
                await collection.updateOne(
                    { telegramId: user.referrerId },
                    { $push: { friends: user.telegramId } }
                );
            }
        }

        ctx.status(200).send('Order status updated');
    } catch (error) {
        console.error('Error updating order status:', error);
        ctx.status(500).send('Error updating order status');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});