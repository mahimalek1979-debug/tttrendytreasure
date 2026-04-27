import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Coupon from './Coupon';
import '../styles/Checkout.css';

const Checkout = () => {
    const { cart, cartTotal, formatPrice, clearCart } = useCart();
    const { token, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ address: '', city: '', postalCode: '', phone: '' });
    const [discount, setDiscount] = useState(0);
    const [success, setSuccess] = useState(false);

    const finalTotal = cartTotal - discount;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isAuthenticated) { navigate('/login'); return; }
        navigate('/payment', { state: { shippingAddress: formData, discount, finalTotal } });
    };

    if (cart.length === 0 && !success) {
        return (
            <div className="container section-padding" style={{ paddingTop: '120px' }}>
                <p>Your cart is empty. <a href="/" style={{ color: 'var(--color-gold)' }}>Continue Shopping</a></p>
            </div>
        );
    }

    return (
        <div className="checkout-container section-padding">
            <div className="container">
                <h2 className="section-title">Checkout</h2>
                <div className="checkout-grid">
                    <form className="checkout-form" onSubmit={handleSubmit}>
                        <h3>Shipping Information</h3>
                        <input type="text" placeholder="Full Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} required />
                        <input type="text" placeholder="City" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} required />
                        <input type="text" placeholder="Postal Code" value={formData.postalCode} onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })} required />
                        <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                        <button type="submit" className="btn-primary">Proceed to Payment</button>
                    </form>
                    <div className="order-summary">
                        <h3>Order Summary</h3>
                        {cart.map((item) => (
                            <div key={item.id} className="summary-item">
                                <span>{item.name} x {item.quantity}</span>
                                <span>{formatPrice(item.price * item.quantity)}</span>
                            </div>
                        ))}
                        <Coupon cartTotal={cartTotal} formatPrice={formatPrice} onDiscount={setDiscount} />
                        {discount > 0 && (
                            <div className="summary-item" style={{ color: '#4caf50' }}>
                                <span>Discount</span>
                                <span>- {formatPrice(discount)}</span>
                            </div>
                        )}
                        <div className="summary-item">
                            <span>Shipping</span>
                            <span style={{ color: '#4caf50' }}>FREE</span>
                        </div>
                        <div className="summary-total">
                            <span>Total:</span>
                            <span>{formatPrice(finalTotal)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
