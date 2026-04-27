import { useState } from 'react';
import '../styles/RateUs.css';

const RateUs = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [review, setReview] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div className="rate-container section-padding">
            <div className="container">
                <h2 className="section-title">Rate Us</h2>
                <div className="rate-content">
                    {submitted ? (
                        <div className="success-msg">Thank you for your feedback! ⭐</div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="stars">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className={star <= (hover || rating) ? 'star active' : 'star'}
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHover(star)}
                                        onMouseLeave={() => setHover(0)}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            <textarea
                                placeholder="Share your experience..."
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                required
                            />
                            <button type="submit" className="btn-primary" disabled={!rating}>Submit Review</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RateUs;
