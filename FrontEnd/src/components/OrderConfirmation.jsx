import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/OrderConfirmation.css';

const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { formatPrice } = useCart();
    const orderData = location.state?.orderData;
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        if (!orderData) {
            navigate('/');
            return;
        }
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate('/profile');
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [orderData, navigate]);

    if (!orderData) return null;

    return (
        <div className="order-confirmation-container section-padding">
            <div className="container">
                <div className="confirmation-card">
                    <div className="success-icon">✓</div>
                    <h1>Order Confirmed!</h1>
                    <p className="order-id">Order ID: <span>{orderData.orderId}</span></p>
                    <p className="thank-you">Thank you for your purchase!</p>
                    
                    <div className="order-details">
                        <h3>Order Summary</h3>
                        <div className="detail-row">
                            <span>Total Amount:</span>
                            <span className="amount">{formatPrice(orderData.totalAmount)}</span>
                        </div>
                        <div className="detail-row">
                            <span>Payment Method:</span>
                            <span>{orderData.paymentMethod}</span>
                        </div>
                        <div className="detail-row">
                            <span>Status:</span>
                            <span className="status">Confirmed</span>
                        </div>
                    </div>

                    <div className="shipping-info">
                        <h3>Shipping Address</h3>
                        <p>{orderData.shippingAddress.address}</p>
                        <p>{orderData.shippingAddress.city}, {orderData.shippingAddress.postalCode}</p>
                        <p>Phone: {orderData.shippingAddress.phone}</p>
                    </div>

                    <div className="actions">
                        <Link to="/profile" className="btn-primary">View Orders</Link>
                        <Link to="/" className="btn-outline">Continue Shopping</Link>
                    </div>

                    <p className="redirect-msg">Redirecting to your profile in {countdown} seconds...</p>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
