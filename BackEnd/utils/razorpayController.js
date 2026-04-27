const Razorpay = require('razorpay');
const crypto = require('crypto');
const { sendJSON, sendError, getRequestBody } = require('./responseHelper');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
    try {
        const { amount, currency = 'INR', receipt } = await getRequestBody(req);

        if (!amount || amount < 100) {
            return sendError(res, 400, 'Amount must be at least 100 paise (₹1)');
        }

        const order = await razorpay.orders.create({
            amount,
            currency,
            receipt: receipt || `receipt_${Date.now()}`,
        });

        sendJSON(res, 200, {
            success: true,
            order_id: order.id,
            amount: order.amount,
            currency: order.currency,
            key_id: process.env.RAZORPAY_KEY_ID
        });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        sendError(res, 500, 'Failed to create order');
    }
};

const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await getRequestBody(req);

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return sendError(res, 400, 'Missing required payment verification fields');
        }

        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        if (expectedSignature === razorpay_signature) {
            sendJSON(res, 200, {
                success: true,
                message: 'Payment verified successfully',
                payment_id: razorpay_payment_id,
                order_id: razorpay_order_id
            });
        } else {
            sendError(res, 400, 'Payment verification failed - Invalid signature');
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        sendError(res, 500, 'Payment verification failed');
    }
};

module.exports = { createOrder, verifyPayment };
