import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import LoyaltyPoints from './LoyaltyPoints';
import OrderTracking from './OrderTracking';
import '../styles/Profile.css';

const Profile = () => {
    const { user, token } = useAuth();
    const { formatPrice } = useCart();
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('orders');

    useEffect(() => {
        fetch('http://localhost:5000/orders', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(r => r.json())
            .then(setOrders)
            .catch(() => {});
    }, [token]);

    return (
        <div className="profile-container section-padding">
            <div className="container">
                <h2 className="section-title">My Account</h2>
                <LoyaltyPoints user={user} />
                <div className="profile-tabs">
                    <button className={activeTab === 'orders' ? 'tab active' : 'tab'} onClick={() => setActiveTab('orders')}>Orders</button>
                    <button className={activeTab === 'profile' ? 'tab active' : 'tab'} onClick={() => setActiveTab('profile')}>Profile</button>
                </div>
                {activeTab === 'profile' && (
                    <div className="profile-info">
                        <h3>Profile Information</h3>
                        <p><strong>Name:</strong> {user?.name}</p>
                        <p><strong>Email:</strong> {user?.email}</p>
                    </div>
                )}
                {activeTab === 'orders' && (
                    <div className="orders-section">
                        <h3>Order History ({orders.length})</h3>
                        {orders.length === 0 ? (
                            <p style={{ color: 'var(--color-text-secondary)', padding: '20px 0' }}>No orders yet.</p>
                        ) : (
                            orders.map((order) => (
                                <div key={order.id} className="order-card">
                                    <div className="order-card-header">
                                        <p><strong>Order ID:</strong> #{order.id.slice(0, 8)}</p>
                                        <span className="order-status">{order.status}</span>
                                    </div>
                                    <p><strong>Total:</strong> {formatPrice(order.totalAmount)}</p>
                                    <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                                    <OrderTracking status={order.status} />
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
