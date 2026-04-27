import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './BottomNav.css';

const BottomNav = () => {
    const location = useLocation();
    const { cartCount, toggleCart } = useCart();
    const path = location.pathname;

    return (
        <nav className="bottom-nav">
            <Link to="/" className={`bottom-nav-item ${path === '/' ? 'active' : ''}`}>
                <span className="bnav-icon">🏠</span>
                <span>Home</span>
            </Link>
            <Link to="/#shop" className={`bottom-nav-item ${path === '/shop' ? 'active' : ''}`}>
                <span className="bnav-icon">🛍️</span>
                <span>Shop</span>
            </Link>
            <button className="bottom-nav-item cart-nav" onClick={toggleCart}>
                <span className="bnav-icon">
                    🛒
                    {cartCount > 0 && <span className="bnav-badge">{cartCount}</span>}
                </span>
                <span>Cart</span>
            </button>
            <Link to="/wishlist" className={`bottom-nav-item ${path === '/wishlist' ? 'active' : ''}`}>
                <span className="bnav-icon">♡</span>
                <span>Wishlist</span>
            </Link>
            <Link to="/profile" className={`bottom-nav-item ${path === '/profile' ? 'active' : ''}`}>
                <span className="bnav-icon">👤</span>
                <span>Profile</span>
            </Link>
        </nav>
    );
};

export default BottomNav;
