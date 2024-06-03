import React, { useEffect, useState } from 'react';
import "./Manager.css";
const Manager = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/orders');
                const data = await response.json();
                console.log('Полученные заказы:', data); // Вывод данных в консоль

                // Извлечение всех заказов из структуры данных
                const allOrders = data.flatMap(user =>
                    user.orders.map(order => ({
                        ...order,
                        phone: user.phone,
                        address: user.address
                    }))
                );
                setOrders(allOrders);
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
                    prevOrders.map((order) =>
                        order.orderId === orderId && order.telegramId === telegramId
                            ? { ...order, status: newStatus }
                            : order
                    )
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
            <table className="orders-table">
                <thead>
                    <tr>
                        <th>ID Заказа</th>
                        <th>Телефон</th>
                        <th>Адрес</th>
                        <th>Статус</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.orderId}>
                            <td>{order.orderId}</td>
                            <td>{order.phone}</td>
                            <td>{order.address}</td>
                            <td>
                                <select value={order.status} onChange={(e) => updateOrderStatus(order.telegramId, order.orderId, e.target.value)}>
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
    );
};

export default Manager;