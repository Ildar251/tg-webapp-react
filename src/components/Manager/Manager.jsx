import React, { useEffect, useState } from 'react';

const Manager = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/orders');
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    return (
        <div>
            <h1>Управление заказами</h1>
            {orders.length === 0 ? (
                <p>Нет заказов для отображения</p>
            ) : (
                <ul>
                    {orders.map((order, index) => (
                        <li key={index}>
                            <p>ID заказа: {order.orderId}</p>
                            <p>Статус: {order.status}</p>
                            <p>Телефон: {order.phone}</p>
                            <p>Адрес: {order.address}</p>
                            <p>Приведенные друзья: {order.friends.length}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Manager;