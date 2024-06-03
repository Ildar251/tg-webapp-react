const express = require('express');
const connectToDatabase = require('./db');
const cors = require('cors'); 

const app = express();
app.use(cors()); 

const PORT = process.env.PORT || 5000;

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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});