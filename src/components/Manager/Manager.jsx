import React, { useEffect, useState } from 'react';
import '../../App.css';
import "./Manager.css";
const Manager = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/orders');
                const data = await response.json();
                console.log('Полученные заказы:', data); // Вывод данных в консоль

                // Упорядочиваем заказы по telegramId
                const orderedOrders = data.reduce((acc, user) => {
                    acc.push({ telegramId: user.telegramId, orders: user.orders });
                    return acc;
                }, []);

                setOrders(orderedOrders);
            } catch (error) {
                console.error('Ошибка при получении заказов:', error);
            }
        };

        fetchOrders();
    }, []);

    const updateOrderStatus = async (telegramId, orderId, newStatus) => {
        try {
            const response = await fetch('http://localhost:5000/api/orders/update-status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ telegramId, orderId, newStatus }),
            });
       
    
            if (response.ok) {
                // Обновляем статус заказа в локальном состоянии
                setOrders((prevOrders) =>
                    prevOrders.map((user) => ({
                        ...user,
                        orders: user.orders.map((o) =>
                            o.orderId === orderId && user.telegramId === telegramId
                                ? { ...o, status: newStatus }
                                : o
                        )
                    }))
                );
    
                console.log('Отправка запроса на сервер:', telegramId, orderId, newStatus);      
            } else {
                console.error('Ошибка при обновлении статуса заказа');
            }
        } catch (error) {
            console.error('Ошибка при обновлении статуса заказа:', error);
        }
    };

    return (
        <div className="manager-container">
            <h1>Управление заказами</h1>
            {orders.map((user) => (
                <div key={user.telegramId}>
                    <h2>Telegram ID: {user.telegramId}</h2>
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>ID Заказа</th>
                                <th>Статус</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.orders && user.orders.map((order) => (
                                <tr key={order.orderId}>
                                    <td>{order.orderId}</td>
                                    <td>
                                        <select value={order.status} onChange={(e) => updateOrderStatus(user.telegramId, order.orderId, e.target.value)}>
                                            <option value="В обработке">В обработке</option>
                                            <option value="Отменен">Отменен</option>
                                            <option value="Выполнен">Выполнен</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default Manager;