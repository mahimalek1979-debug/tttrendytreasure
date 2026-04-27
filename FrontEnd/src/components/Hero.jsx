import '../styles/Hero.css';

const Hero = () => (
    <section className="hero" id="home">
        <div className="hero-glow"></div>
        <div className="hero-content">
            <span className="hero-badge">✦ New Collection 2025</span>
            <h1 className="hero-title">
                Discover Your<br />
                <span className="gold">Trendy Treasure</span>
            </h1>
            <p className="hero-sub">
                Luxury fashion & lifestyle. Exclusive collections crafted for the modern you.
            </p>
            <div className="hero-btns">
                <a href="#shop" className="btn-gold">Shop Now</a>
                <a href="#categories" className="btn-outline">View Collections</a>
            </div>
            <div className="hero-stats">
                <div className="stat">
                    <span className="stat-num">500+</span>
                    <span className="stat-lbl">Products</span>
                </div>
                <div className="stat">
                    <span className="stat-num">10K+</span>
                    <span className="stat-lbl">Customers</span>
                </div>
                <div className="stat">
                    <span className="stat-num">4.9★</span>
                    <span className="stat-lbl">Rating</span>
                </div>
            </div>
        </div>
    </section>
);

export default Hero;
