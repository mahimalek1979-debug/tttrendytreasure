import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/FeaturedProducts.css';

const addToWishlist = (productId) => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
};

const FeaturedProducts = () => {
    const { addToCart, formatPrice } = useCart();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('default');
    const [filterCategory, setFilterCategory] = useState('all');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await fetch('/products.json');
                const data = await res.json();
                
                // Apply search and category filters locally
                const params = new URLSearchParams(location.search);
                const search = params.get('search') || '';
                const category = params.get('category') || '';
                
                let filteredData = data;
                
                if (search) {
                    filteredData = filteredData.filter(product => 
                        product.name.toLowerCase().includes(search.toLowerCase()) ||
                        product.description.toLowerCase().includes(search.toLowerCase())
                    );
                }
                
                if (category) {
                    filteredData = filteredData.filter(product => 
                        product.category.toLowerCase() === category.toLowerCase()
                    );
                }
                
                setProducts(filteredData);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [location.search]);

    const params = new URLSearchParams(location.search);
    const activeSearch = params.get('search');
    const activeCategory = params.get('category');
    const isFiltered = activeSearch || activeCategory;

    const categories = ['all', ...new Set(products.map(p => p.category))];

    const sorted = [...products].sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
    });

    const filtered = filterCategory === 'all' ? sorted : sorted.filter(p => p.category === filterCategory);

    return (
        <section className="products-section" id="shop">
            <div className="products-header">
                <h2>{activeSearch ? `"${activeSearch}"` : activeCategory ? activeCategory : 'New Arrivals'}</h2>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ background: '#1a1a1a', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.3)', padding: '5px 8px', borderRadius: '5px', fontSize: '0.75rem' }}>
                        <option value="default">Sort</option>
                        <option value="price-low">Price ↑</option>
                        <option value="price-high">Price ↓</option>
                        <option value="name">A-Z</option>
                    </select>
                    {isFiltered && <button className="clear-btn" onClick={() => navigate('/')}>✕ Clear</button>}
                </div>
            </div>

            <div className="filter-row">
                {categories.map(cat => (
                    <button key={cat} className={`filter-chip ${filterCategory === cat ? 'active' : ''}`} onClick={() => setFilterCategory(cat)}>
                        {cat === 'all' ? 'All' : cat}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="loader"></div>
            ) : filtered.length === 0 ? (
                <p className="no-products">No products found.</p>
            ) : (
                <div className="products-list">
                    {filtered.map(product => (
                        <div key={product.id} className="product-card" onClick={() => navigate(`/product/${product.id}`)}>                            
                            <div className="product-img-wrap">
                                <img src={product.imageUrl} alt={product.name} />
                            </div>
                            <div className="product-body">
                                <p className="product-name">{product.name}</p>
                                <div className="product-price-row">
                                    <span className="product-price">{formatPrice(product.price)}</span>
                                    {product.originalPrice && product.originalPrice > product.price && (
                                        <>
                                            <span className="product-original-price">{formatPrice(product.originalPrice)}</span>
                                            <span className="product-discount">{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off</span>
                                        </>
                                    )}
                                </div>
                                <button className="btn-add-cart" onClick={(e) => { e.stopPropagation(); addToCart({ ...product, image: product.imageUrl }); }}>+ Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default FeaturedProducts;
