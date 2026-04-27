import '../styles/OrderTracking.css';

const steps = ['Order Placed', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered'];

const OrderTracking = ({ status = 'Confirmed' }) => {
    const currentStep = steps.indexOf(status) === -1 ? 1 : steps.indexOf(status);

    return (
        <div className="order-tracking">
            <h4>Order Tracking</h4>
            <div className="tracking-steps">
                {steps.map((step, idx) => (
                    <div key={step} className={`step ${idx <= currentStep ? 'completed' : ''} ${idx === currentStep ? 'active' : ''}`}>
                        <div className="step-circle">{idx < currentStep ? '✓' : idx + 1}</div>
                        <p>{step}</p>
                        {idx < steps.length - 1 && <div className={`step-line ${idx < currentStep ? 'completed' : ''}`}></div>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderTracking;
