import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-logo">
                <span className="footer-tt">TT</span>
                <span className="footer-brand">TrendyTreasure</span>
            </div>
            <p className="footer-tagline">Luxury fashion & lifestyle</p>
            <div className="footer-links">
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
                <a href="/terms">Terms</a>
                <a href="/rate">Rate Us</a>
            </div>
            <div className="footer-contact">
                <p>📧 trendytreasure0813@gmail.com</p>
                <p>📞 +91 9727013000 | +91 9512345988</p>
            </div>
            <p className="footer-copy">© 2025 TrendyTreasure. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
