import '../styles/LoyaltyPoints.css';

const LoyaltyPoints = ({ user }) => {
    const points = parseInt(localStorage.getItem(`points_${user?.id}`) || '0');

    return (
        <div className="loyalty-card">
            <div className="loyalty-header">
                <h3>⭐ Loyalty Points</h3>
                <span className="points-badge">{points} pts</span>
            </div>
            <p>Earn 1 point for every ₹10 spent. Redeem 100 points for ₹50 off!</p>
            <div className="loyalty-tiers">
                <div className={`tier ${points >= 0 ? 'active' : ''}`}>🥉 Bronze<br/><small>0+ pts</small></div>
                <div className={`tier ${points >= 500 ? 'active' : ''}`}>🥈 Silver<br/><small>500+ pts</small></div>
                <div className={`tier ${points >= 1000 ? 'active' : ''}`}>🥇 Gold<br/><small>1000+ pts</small></div>
                <div className={`tier ${points >= 5000 ? 'active' : ''}`}>💎 Platinum<br/><small>5000+ pts</small></div>
            </div>
        </div>
    );
};

export default LoyaltyPoints;
