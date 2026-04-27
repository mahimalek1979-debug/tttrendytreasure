import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
    const { cartCount, toggleCart } = useCart();
    const { user, logout, isAuthenticated } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/?search=${encodeURIComponent(searchQuery)}`);
            setMenuOpen(false);
        }
    };

    return (
        <>
            <header className="header">
                <div className="header-top">
                    <div className="header-left">
                        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                            <span className={menuOpen ? 'bar open' : 'bar'}></span>
                            <span className={menuOpen ? 'bar open' : 'bar'}></span>
                            <span className={menuOpen ? 'bar open' : 'bar'}></span>
                        </button>
                    </div>
                    <Link to="/" className="header-logo">
                        <span className="logo-tt">TT</span>
                        <span className="logo-name">TrendyTreasure</span>
                    </Link>
                    <div className="header-right">
                        <Link to="/wishlist" className="header-icon">♡</Link>
                        <button className="header-icon cart-btn" onClick={toggleCart}>
                            🛒
                            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                        </button>
                    </div>
                </div>
                <form className="header-search" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit">🔍</button>
                </form>
            </header>

            {/* Slide Menu */}
            <div className={`slide-menu ${menuOpen ? 'open' : ''}`}>
                <div className="slide-menu-header">
                    {isAuthenticated ? (
                        <div className="menu-user">
                            <div className="menu-avatar">{user?.name?.[0]?.toUpperCase()}</div>
                            <div>
                                <p className="menu-name">{user?.name}</p>
                                <p className="menu-email">{user?.email}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="menu-auth">
                            <Link to="/login" onClick={() => setMenuOpen(false)} className="btn-primary">Login</Link>
                            <Link to="/signup" onClick={() => setMenuOpen(false)} className="btn-outline-gold">Sign Up</Link>
                        </div>
                    )}
                </div>
                <nav className="slide-nav">
                    <Link to="/" onClick={() => setMenuOpen(false)}>🏠 Home</Link>
                    <Link to="/#shop" onClick={() => setMenuOpen(false)}>🛍️ Shop</Link>
                    <Link to="/wishlist" onClick={() => setMenuOpen(false)}>♡ Wishlist</Link>
                    {isAuthenticated && <Link to="/profile" onClick={() => setMenuOpen(false)}>👤 My Account</Link>}
                    <Link to="/about" onClick={() => setMenuOpen(false)}>ℹ️ About Us</Link>
                    <Link to="/contact" onClick={() => setMenuOpen(false)}>📞 Contact</Link>
                    <Link to="/rate" onClick={() => setMenuOpen(false)}>⭐ Rate Us</Link>
                    <Link to="/terms" onClick={() => setMenuOpen(false)}>📄 Terms & Privacy</Link>
                    <Link to="/admin" onClick={() => setMenuOpen(false)}>⚙️ Admin</Link>
                    {isAuthenticated && (
                        <button onClick={() => { logout(); setMenuOpen(false); }} className="menu-logout">🚪 Logout</button>
                    )}
                </nav>
            </div>
            {menuOpen && <div className="menu-overlay" onClick={() => setMenuOpen(false)}></div>}
        </>
    );
};

export default Header;
