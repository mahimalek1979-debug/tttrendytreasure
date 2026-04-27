import { useNavigate } from 'react-router-dom';
import './Categories.css';

const categories = [
    { name: 'All', icon: '✦', color: '#D4AF37' },
    { name: 'Foundation', icon: '💄', color: '#c9956c' },
    { name: 'Fashion', icon: '👗', color: '#9b59b6' },
    { name: 'Accessories', icon: '💍', color: '#D4AF37' },
    { name: 'Skincare', icon: '✨', color: '#e8a0bf' },
    { name: 'Bags', icon: '👜', color: '#8b5e3c' },
    { name: 'Beauty Machines', icon: '⚡', image: '/beauty-machines-logo.png', color: '#D4AF37' },
];

const Categories = () => {
    const navigate = useNavigate();

    return (
        <section className="categories-section" id="categories">
            <div className="categories-header">
                <h2>Shop by Category</h2>
            </div>
            <div className="categories-scroll">
                {categories.map((cat) => (
                    <div
                        key={cat.name}
                        className="category-chip"
                        onClick={() => cat.name === 'All' ? navigate('/') : navigate(`/?category=${cat.name}`)}
                    >
                        <div className="chip-icon" style={{ background: `${cat.color}22`, border: `1.5px solid ${cat.color}55`, overflow: 'hidden' }}>
                            {cat.image ? (
                                <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <span>{cat.icon}</span>
                            )}
                        </div>
                        <span className="chip-name">{cat.name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Categories;
