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