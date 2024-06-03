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
                        <td className={order.status === "В обработке" ? "status-processing" : "status-completed"}>
                            {order.status}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
};

export default Manager;