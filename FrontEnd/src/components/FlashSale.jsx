import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/FlashSale.css';

const FlashSale = () => {
    const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 59, seconds: 59 });
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                clearInterval(timer);
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const pad = (n) => String(n).padStart(2, '0');

    return (
        <div className="flash-sale">
            <div className="container flash-content">
                <div className="flash-left">
                    <span className="flash-badge">⚡ FLASH SALE</span>
                    <p>Up to <strong>50% OFF</strong> on selected items!</p>
                </div>
                <div className="flash-timer">
                    <div className="time-block"><span>{pad(timeLeft.hours)}</span><small>HRS</small></div>
                    <span className="colon">:</span>
                    <div className="time-block"><span>{pad(timeLeft.minutes)}</span><small>MIN</small></div>
                    <span className="colon">:</span>
                    <div className="time-block"><span>{pad(timeLeft.seconds)}</span><small>SEC</small></div>
                </div>
                <button className="btn-primary flash-btn" onClick={() => navigate('/#shop')}>Shop Now</button>
            </div>
        </div>
    );
};

export default FlashSale;
