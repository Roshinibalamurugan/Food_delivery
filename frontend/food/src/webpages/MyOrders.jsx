import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please login to view your orders');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:5002/api/orders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(response.data);
      } catch (err) {
        setError('Failed to fetch orders');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="container mx-auto p-4">Loading orders...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border rounded-lg p-4 shadow-md">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold">Order #{order._id}</h2>
                <span className={`px-2 py-1 rounded text-sm ${
                  order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {order.status}
                </span>
              </div>
              <p className="text-gray-600 mb-2">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <div className="mb-2">
                <h3 className="font-medium">Items:</h3>
                <ul className="list-disc list-inside">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.name} - Quantity: {item.quantity} - Price: ${item.price}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="font-bold">Total: ${order.total}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
