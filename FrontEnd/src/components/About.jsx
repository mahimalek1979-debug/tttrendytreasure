import '../styles/About.css';

const About = () => {
    return (
        <div className="about-container section-padding">
            <div className="container">
                <h2 className="section-title">About TrendyTreasure</h2>
                <div className="about-content">
                    <p>TrendyTreasure is your premier destination for luxury fashion and accessories. Founded in 2024, we curate the finest collection of high-end products that embody elegance, sophistication, and timeless style.</p>
                    
                    <section className="mission">
                        <h3>Our Mission</h3>
                        <p>To provide discerning customers with exclusive access to the world's most coveted luxury brands and emerging designers, all in one elegant platform.</p>
                    </section>

                    <section className="values">
                        <h3>Our Values</h3>
                        <ul>
                            <li><strong>Quality:</strong> Every product meets our rigorous standards</li>
                            <li><strong>Authenticity:</strong> 100% genuine luxury items</li>
                            <li><strong>Service:</strong> Exceptional customer experience</li>
                            <li><strong>Trust:</strong> Secure shopping and reliable delivery</li>
                        </ul>
                    </section>

                    <div className="about-features">
                        <div className="feature-card">
                            <h3>Premium Quality</h3>
                            <p>Every product is carefully selected for its exceptional craftsmanship and quality.</p>
                        </div>
                        <div className="feature-card">
                            <h3>Exclusive Collection</h3>
                            <p>Discover unique pieces that define luxury and elevate your personal style.</p>
                        </div>
                        <div className="feature-card">
                            <h3>Trusted Service</h3>
                            <p>Experience seamless shopping with secure checkout and reliable delivery.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
