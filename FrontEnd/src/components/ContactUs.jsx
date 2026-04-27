import '../styles/ContactUs.css';

const ContactUs = () => {
    const handleEmailClick = () => {
        window.location.href = 'mailto:trendytreasure0813@gmail.com?subject=Customer Inquiry&body=Hello TrendyTreasure Team,';
    };

    return (
        <div className="contact-container section-padding">
            <div className="container">
                <h2 className="section-title">Contact Us</h2>
                <div className="contact-content">
                    <p>We'd love to hear from you! Click the button below to send us an email.</p>
                    <button onClick={handleEmailClick} className="btn-primary email-btn">
                        📧 Send Email
                    </button>
                    <div className="contact-info">
                        <p><strong>Email:</strong> trendytreasure0813@gmail.com</p>
                        <p><strong>Phone:</strong> +91 9727013000</p>
                        <p><strong>Alternative:</strong> +91 9512345988</p>
                        <p><strong>Address:</strong> 123 Luxury Street, Mumbai, India</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
