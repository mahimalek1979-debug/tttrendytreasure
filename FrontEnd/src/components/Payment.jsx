import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Payment.css';

const Payment = () => {
    const { cart, cartTotal, formatPrice, clearCart } = useCart();
    const { token, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const shippingAddress = location.state?.shippingAddress || {};
    
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [cardDetails, setCardDetails] = useState({ cardNumber: '', cardName: '', expiry: '', cvv: '' });
    const [processing, setProcessing] = useState(false);

    const handlePayment = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        
        setProcessing(true);
        
        // Simulate payment processing
        setTimeout(async () => {
            try {
                const response = await fetch('http://localhost:5000/orders', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({ 
                        items: cart, 
                        shippingAddress, 
                        totalAmount: cartTotal,
                        paymentMethod,
                        paymentDetails: { last4: cardDetails.cardNumber.slice(-4) }
                    })
                });
                
                if (response.ok) {
                    const order = await response.json();
                    clearCart();
                    navigate('/order-confirmation', { 
                        state: { 
                            orderData: {
                                orderId: order.id,
                                totalAmount: cartTotal,
                                paymentMethod: paymentMethod === 'card' ? 'Credit/Debit Card' : paymentMethod === 'upi' ? 'UPI' : 'Cash on Delivery',
                                shippingAddress
                            }
                        }
                    });
                }
            } catch (err) {
                alert('Payment failed. Please try again.');
            } finally {
                setProcessing(false);
            }
        }, 2000);
    };

    if (!cart.length) {
        return <div className="container section-padding"><p>No items to pay for. <a href="/">Continue Shopping</a></p></div>;
    }

    return (
        <div className="payment-container section-padding">
            <div className="container">
                <h2 className="section-title">Payment</h2>
                <div className="payment-grid">
                    <form className="payment-form" onSubmit={handlePayment}>
                        <h3>Select Payment Method</h3>
                        <div className="payment-methods">
                            <div className={`payment-method ${paymentMethod === 'card' ? 'active' : ''}`} onClick={() => setPaymentMethod('card')}>
                                <h4>Credit/Debit Card</h4>
                            </div>
                            <div className={`payment-method ${paymentMethod === 'upi' ? 'active' : ''}`} onClick={() => setPaymentMethod('upi')}>
                                <h4>UPI</h4>
                            </div>
                            <div className={`payment-method ${paymentMethod === 'cod' ? 'active' : ''}`} onClick={() => setPaymentMethod('cod')}>
                                <h4>Cash on Delivery</h4>
                            </div>
                        </div>

                        {paymentMethod === 'card' && (
                            <div className="card-details">
                                <input type="text" placeholder="Card Number" value={cardDetails.cardNumber} onChange={(e) => setCardDetails({...cardDetails, cardNumber: e.target.value})} maxLength="16" required />
                                <input type="text" placeholder="Cardholder Name" value={cardDetails.cardName} onChange={(e) => setCardDetails({...cardDetails, cardName: e.target.value})} required />
                                <div className="card-row">
                                    <input type="text" placeholder="MM/YY" value={cardDetails.expiry} onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})} maxLength="5" required />
                                    <input type="text" placeholder="CVV" value={cardDetails.cvv} onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})} maxLength="3" required />
                                </div>
                            </div>
                        )}

                        {paymentMethod === 'upi' && (
                            <input type="text" placeholder="UPI ID (e.g., user@paytm)" required />
                        )}

                        {paymentMethod === 'cod' && (
                            <p style={{color: 'var(--color-text-secondary)', padding: '20px'}}>Pay with cash when your order is delivered.</p>
                        )}

                        <button type="submit" className="btn-primary" disabled={processing} style={{marginTop: '30px'}}>
                            {processing ? 'Processing...' : `Pay ${formatPrice(cartTotal)}`}
                        </button>
                    </form>

                    <div className="payment-summary">
                        <h3>Order Summary</h3>
                        {cart.map((item) => (
                            <div key={item.id} className="summary-row">
                                <span>{item.name} x {item.quantity}</span>
                                <span>{formatPrice(item.price * item.quantity)}</span>
                            </div>
                        ))}
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>{formatPrice(cartTotal)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="summary-total">
                            <span>Total</span>
                            <span>{formatPrice(cartTotal)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
