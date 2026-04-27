import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/ProductReview.css';

const ProductReview = ({ productId }) => {
    const { user, isAuthenticated } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [images, setImages] = useState([]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const imageUrls = files.map(file => URL.createObjectURL(file));
        setImages([...images, ...imageUrls]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isAuthenticated) return alert('Please login to review');
        const newReview = {
            id: Date.now(),
            user: user.name,
            rating,
            comment,
            images,
            date: new Date().toLocaleDateString()
        };
        setReviews([newReview, ...reviews]);
        setRating(0);
        setComment('');
        setImages([]);
    };

    return (
        <div className="reviews-section">
            <h3>Customer Reviews</h3>
            <form onSubmit={handleSubmit} className="review-form">
                <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className={star <= rating ? 'star active' : 'star'} onClick={() => setRating(star)}>★</span>
                    ))}
                </div>
                <textarea placeholder="Write your review..." value={comment} onChange={(e) => setComment(e.target.value)} required />
                <input type="file" accept="image/*,video/*" multiple onChange={handleImageUpload} />
                {images.length > 0 && (
                    <div className="preview-images">
                        {images.map((img, idx) => <img key={idx} src={img} alt="preview" />)}
                    </div>
                )}
                <button type="submit" className="btn-primary">Submit Review</button>
            </form>
            <div className="reviews-list">
                {reviews.map(review => (
                    <div key={review.id} className="review-card">
                        <div className="review-header">
                            <strong>{review.user}</strong>
                            <span className="review-stars">{'★'.repeat(review.rating)}</span>
                        </div>
                        <p>{review.comment}</p>
                        {review.images.length > 0 && (
                            <div className="review-images">
                                {review.images.map((img, idx) => <img key={idx} src={img} alt="review" />)}
                            </div>
                        )}
                        <span className="review-date">{review.date}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductReview;
