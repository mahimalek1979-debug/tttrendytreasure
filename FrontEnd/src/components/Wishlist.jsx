import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Wishlist.css';

const Wishlist = () => {
    const { isAuthenticated } = useAuth();
    const { addToCart, formatPrice } = useCart();
    const navigate = useNavigate();
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        const saved = JSON.parse(localStorage.getItem('wishlist') || '[]');
        fetch('/products.json')
            .then(r => r.json())
            .then(allProducts => {
                const wishlistProducts = saved.map(id => allProducts.find(p => p.id === id)).filter(p => p);
                setWishlist(wishlistProducts);
            });
    }, [isAuthenticated, navigate]);

    const removeFromWishlist = (id) => {
        const updated = wishlist.filter(p => p.id !== id);
        setWishlist(updated);
        localStorage.setItem('wishlist', JSON.stringify(updated.map(p => p.id)));
    };

    return (
        <div className="wishlist-container section-padding">
            <div className="container">
                <h2 className="section-title">My Wishlist</h2>
                {wishlist.length === 0 ? (
                    <p className="empty-wishlist">Your wishlist is empty</p>
                ) : (
                    <div className="wishlist-grid">
                        {wishlist.map(product => (
                            <div key={product.id} className="wishlist-item">
                                <img src={product.imageUrl} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p className="price">{formatPrice(product.price)}</p>
                                <div className="wishlist-actions">
                                    <button className="btn-primary" onClick={() => { addToCart(product); removeFromWishlist(product.id); }}>Add to Cart</button>
                                    <button className="btn-remove" onClick={() => removeFromWishlist(product.id)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
