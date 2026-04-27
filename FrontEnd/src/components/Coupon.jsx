import { useState } from 'react';
import '../styles/Coupon.css';

const COUPONS = {
    'TRENDY10': 10,
    'SAVE20': 20,
    'FIRST50': 50,
    'GOLD15': 15,
};

const Coupon = ({ cartTotal, formatPrice, onDiscount }) => {
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const [applied, setApplied] = useState(false);

    const applyCoupon = () => {
        const discount = COUPONS[code.toUpperCase()];
        if (discount) {
            const discountAmount = (cartTotal * discount) / 100;
            onDiscount(discountAmount);
            setMessage(`✅ ${discount}% discount applied! You save ${formatPrice(discountAmount)}`);
            setApplied(true);
        } else {
            setMessage('❌ Invalid coupon code');
        }
    };

    return (
        <div className="coupon-section">
            <h4>Apply Coupon</h4>
            <div className="coupon-input">
                <input type="text" placeholder="Enter coupon code" value={code} onChange={(e) => setCode(e.target.value)} disabled={applied} />
                <button onClick={applyCoupon} disabled={applied} className="btn-primary">Apply</button>
            </div>
            {message && <p className={`coupon-msg ${applied ? 'success' : 'error'}`}>{message}</p>}
            <div className="available-coupons">
                <p>Available: <span>TRENDY10</span> <span>SAVE20</span> <span>FIRST50</span> <span>GOLD15</span></p>
            </div>
        </div>
    );
};

export default Coupon;
