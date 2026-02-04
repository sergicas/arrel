const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
    };

    try {
        const { userId, userEmail } = JSON.parse(event.body);

        if (!userId || !userEmail) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Missing userId or userEmail' }),
            };
        }

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            client_reference_id: userId, // Better place for userId than metadata sometimes, but metadata is also good
            customer_email: userEmail,
            line_items: [
                {
                    price: process.env.STRIPE_PRICE_ID,
                    quantity: 1,
                },
            ],
            metadata: {
                userId: userId,
            },
            // Use environment variable URL or default to localhost for dev, but for production it should be the site URL
            // Netlify provides process.env.URL
            success_url: `${process.env.URL || 'https://arrel.eu'}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.URL || 'https://arrel.eu'}/payment/cancel`,
            allow_promotion_codes: true,
        });

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ url: session.url, sessionId: session.id }),
        };
    } catch (error) {
        console.error('Stripe checkout error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
